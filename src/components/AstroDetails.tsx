import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sunrise, Sunset, Moon, Navigation } from 'lucide-react';
import type { Astro } from '@/types/weather';

interface AstroDetailsProps {
  astro: Astro | undefined;
}

export const AstroDetails: React.FC<AstroDetailsProps> = ({ astro }) => {
  if (!astro) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2"><Moon className="text-primary"/> Astro</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2"><Sunrise className="text-muted-foreground"/> <span>Sunrise: {astro.sunrise}</span></div>
        <div className="flex items-center gap-2"><Sunset className="text-muted-foreground"/> <span>Sunset: {astro.sunset}</span></div>
        <div className="flex items-center gap-2"><Moon className="text-muted-foreground"/> <span>{astro.moon_phase}</span></div>
        <div className="flex items-center gap-2"><Navigation className="text-muted-foreground"/> <span>{astro.moon_illumination}% illuminated</span></div>
      </CardContent>
    </Card>
  );
};
