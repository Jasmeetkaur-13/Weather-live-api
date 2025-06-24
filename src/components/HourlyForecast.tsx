import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherIcon } from './WeatherIcon';
import type { Hour } from '@/types/weather';
import { Clock } from 'lucide-react';

interface HourlyForecastProps {
  hourlyForecast: Hour[];
  unit: 'C' | 'F';
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyForecast, unit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2"><Clock/> Hourly Forecast</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-4 overflow-x-auto pb-4">
        {hourlyForecast.map(hour => (
          <div key={hour.time_epoch} className="flex flex-col items-center gap-2 p-2 rounded-lg bg-secondary/50 min-w-[70px]">
            <p className="text-sm font-medium">{format(new Date(hour.time), 'ha')}</p>
            <WeatherIcon conditionCode={hour.condition.code} isDay={hour.is_day} className="w-8 h-8"/>
            <p className="text-lg font-bold">{unit === 'C' ? hour.temp_c : hour.temp_f}°</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
