import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AirQuality } from '@/types/weather';
import { cn } from '@/lib/utils';
import { Wind } from 'lucide-react';

interface AQIDisplayProps {
  airQuality: AirQuality;
}

const aqiLevels = {
  1: { label: 'Good', color: 'bg-chart-1' },
  2: { label: 'Moderate', color: 'bg-chart-2' },
  3: { label: 'Unhealthy for sensitive groups', color: 'bg-chart-3' },
  4: { label: 'Unhealthy', color: 'bg-chart-4' },
  5: { label: 'Very Unhealthy', color: 'bg-chart-5' },
  6: { label: 'Hazardous', color: 'bg-destructive' },
};

export const AQIDisplay: React.FC<AQIDisplayProps> = ({ airQuality }) => {
  const aqiIndex = airQuality['us-epa-index'];
  const aqiInfo = aqiLevels[aqiIndex as keyof typeof aqiLevels] || {
    label: 'Unknown',
    color: 'bg-muted',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wind className="text-primary" />
          Air Quality Index
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{aqiInfo.label}</span>
          <span
            className={cn(
              'px-3 py-1 rounded-full text-sm font-semibold text-white',
              aqiInfo.color
            )}
          >
            {aqiIndex}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <p>PM2.5: {airQuality.pm2_5.toFixed(2)}</p>
          <p>PM10: {airQuality.pm10.toFixed(2)}</p>
          <p>O₃: {airQuality.o3.toFixed(2)}</p>
          <p>NO₂: {airQuality.no2.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
