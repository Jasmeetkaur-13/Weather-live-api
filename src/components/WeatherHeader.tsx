'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Search } from 'lucide-react';

interface WeatherHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  unit: 'C' | 'F';
  setUnit: (unit: 'C' | 'F') => void;
}

export const WeatherHeader: React.FC<WeatherHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  unit,
  setUnit,
}) => {
  return (
    <header className="flex flex-col md:flex-row gap-4 justify-between items-center">
      <h1 className="text-4xl font-bold text-primary font-headline">SkyView</h1>
      <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search city..."
          className="w-full md:w-64"
        />
        <Button type="submit" size="icon" aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
      </form>
      <div className="flex items-center gap-2">
        <Label htmlFor="unit-switch">°F</Label>
        <Switch
          id="unit-switch"
          checked={unit === 'C'}
          onCheckedChange={(checked) => setUnit(checked ? 'C' : 'F')}
          aria-label="Toggle temperature unit"
        />
        <Label htmlFor="unit-switch">°C</Label>
      </div>
    </header>
  );
};
