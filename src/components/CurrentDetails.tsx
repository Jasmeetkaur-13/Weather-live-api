import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Wind, Droplets, Gauge, Eye, Cloud, Umbrella } from 'lucide-react';
import type { Current } from '@/types/weather';

interface CurrentDetailsProps {
  current: Current;
}

export const CurrentDetails: React.FC<CurrentDetailsProps> = ({ current }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2"><Thermometer className="text-primary"/> Current Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2"><Wind className="text-muted-foreground"/> <span>{current.wind_kph} km/h</span></div>
        <div className="flex items-center gap-2"><Droplets className="text-muted-foreground"/> <span>{current.humidity}%</span></div>
        <div className="flex items-center gap-2"><Gauge className="text-muted-foreground"/> <span>{current.pressure_mb} mb</span></div>
        <div className="flex items-center gap-2"><Eye className="text-muted-foreground"/> <span>{current.vis_km} km</span></div>
        <div className="flex items-center gap-2"><Cloud className="text-muted-foreground"/> <span>{current.cloud}%</span></div>
        <div className="flex items-center gap-2"><Umbrella className="text-muted-foreground"/> <span>{current.precip_mm} mm</span></div>
      </CardContent>
    </Card>
  );
};
