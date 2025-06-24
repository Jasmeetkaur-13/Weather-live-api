import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherIcon } from './WeatherIcon';
import { Separator } from './ui/separator';
import type { ForecastDay } from '@/types/weather';
import { Calendar, Umbrella } from 'lucide-react';

interface DailyForecastProps {
  forecastDays: ForecastDay[];
  unit: 'C' | 'F';
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ forecastDays, unit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2"><Calendar/> 7-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {forecastDays.map((day) => (
          <div key={day.date_epoch}>
            <div className="grid grid-cols-3 md:grid-cols-5 items-center gap-4 p-2 rounded-lg hover:bg-secondary/50">
              <p className="font-medium md:col-span-1">{format(new Date(day.date), 'EEE')}</p>
              <div className="flex items-center gap-2 md:col-span-2">
                <WeatherIcon conditionCode={day.day.condition.code} isDay={1} className="w-8 h-8"/>
                <span className="hidden md:inline">{day.day.condition.text}</span>
              </div>
              <p className="text-muted-foreground md:col-span-1">
                <Umbrella className="inline w-4 h-4 mr-1"/>
                {day.day.daily_chance_of_rain}%
              </p>
              <p className="font-medium text-right md:col-span-1">
                {unit === 'C' ? Math.round(day.day.maxtemp_c) : Math.round(day.day.maxtemp_f)}° / {unit === 'C' ? Math.round(day.day.mintemp_c) : Math.round(day.day.mintemp_f)}°
              </p>
            </div>
            <Separator/>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
