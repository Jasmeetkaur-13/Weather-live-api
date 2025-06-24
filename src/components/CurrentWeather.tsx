import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { WeatherIcon } from './WeatherIcon';
import type { WeatherData } from '@/types/weather';

interface CurrentWeatherProps {
  weatherData: WeatherData;
  unit: 'C' | 'F';
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData, unit }) => {
  const today = weatherData?.forecast.forecastday[0];

  return (
    <Card className="w-full text-center shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {weatherData.location.name}, {weatherData.location.country}
        </CardTitle>
        <CardDescription>
          {format(new Date(weatherData.location.localtime), 'eeee, MMMM d')}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <WeatherIcon
          conditionCode={weatherData.current.condition.code}
          isDay={weatherData.current.is_day}
          className="w-24 h-24 text-accent"
        />
        <p className="text-7xl font-bold">
          {unit === 'C' ? weatherData.current.temp_c : weatherData.current.temp_f}°
        </p>
        <p className="text-lg text-muted-foreground">{weatherData.current.condition.text}</p>
        <p className="text-sm">
          Feels like {unit === 'C' ? weatherData.current.feelslike_c : weatherData.current.feelslike_f}°
        </p>
        {today && (
          <p className="text-sm text-muted-foreground">
            H: {unit === 'C' ? today.day.maxtemp_c : today.day.maxtemp_f}° / L: {unit === 'C' ? today.day.mintemp_c : today.day.mintemp_f}°
          </p>
        )}
      </CardContent>
    </Card>
  );
};
