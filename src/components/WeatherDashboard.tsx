'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { WeatherData } from '@/types/weather';
import { getWeatherData } from '@/app/actions';
import { AQIDisplay } from './AQIDisplay';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { WeatherHeader } from './WeatherHeader';
import { CurrentWeather } from './CurrentWeather';
import { CurrentDetails } from './CurrentDetails';
import { HourlyForecast } from './HourlyForecast';
import { DailyForecast } from './DailyForecast';
import { AstroDetails } from './AstroDetails';

export function WeatherDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [loading, setLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(true);
  const { toast } = useToast();

  const fetchWeather = useCallback(
    async (loc: string) => {
      setLoading(true);
      const { data, error } = await getWeatherData(loc);
      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
        setWeatherData(null);
      } else {
        setWeatherData(data);
      }
      setLoading(false);
    },
    [toast]
  );
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude},${longitude}`);
        setSearchQuery('Current Location');
        setIsLocating(false);
      },
      (error) => {
        console.warn(`Geolocation error: ${error.message}`);
        setLocation('London');
        setSearchQuery('London');
        setIsLocating(false);
      }
    );
  }, []);

  useEffect(() => {
    if (location && !isLocating) {
      fetchWeather(location);
    }
  }, [location, isLocating, fetchWeather]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      setLocation(searchQuery);
    }
  };

  const hourlyForecast = useMemo(() => {
    if (!weatherData) return [];
    const now = new Date();
    const allHours = weatherData.forecast.forecastday.flatMap(day => day.hour);
    return allHours.filter(hour => new Date(hour.time) >= now).slice(0, 24);
  }, [weatherData]);


  if (isLocating) {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <div className="flex items-center gap-4 text-xl font-semibold text-primary">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>SkyView</p>
            </div>
            <p className="text-muted-foreground mt-2">Fetching your location...</p>
        </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <WeatherHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        unit={unit}
        setUnit={setUnit}
      />

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
            <div className="lg:col-span-2">
                 <Skeleton className="h-[440px] w-full" />
            </div>
        </div>
      ) : weatherData ? (
        <>
        {weatherData.alerts.alert.length > 0 && (
             <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{weatherData.alerts.alert[0].event}</AlertTitle>
                <AlertDescription>{weatherData.alerts.alert[0].desc}</AlertDescription>
            </Alert>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <CurrentWeather weatherData={weatherData} unit={unit} />
            <CurrentDetails current={weatherData.current} />
            <AQIDisplay airQuality={weatherData.current.air_quality} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <HourlyForecast hourlyForecast={hourlyForecast} unit={unit} />
            <DailyForecast forecastDays={weatherData.forecast.forecastday} unit={unit} />
            <AstroDetails astro={weatherData.forecast.forecastday[0]?.astro} />
          </div>
        </div>
        </>
      ) : (
        <Card className="w-full text-center py-12">
            <CardHeader>
                <CardTitle>No Weather Data</CardTitle>
                <CardDescription>Could not fetch weather data for the specified location. Please try another search.</CardDescription>
            </CardHeader>
        </Card>
      )}
    </div>
  );
}
