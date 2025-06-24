// src/app/actions.ts
'use server';

import type { WeatherData } from '@/types/weather';

const API_KEY = '893ea5c27f3f4249bc0131344252406';
const BASE_URL = 'https://api.weatherapi.com/v1/forecast.json';

export async function getWeatherData(
  location: string
): Promise<{ data: WeatherData | null; error: string | null }> {
  if (!location) {
    return { data: null, error: 'Location is required.' };
  }

  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || 'Failed to fetch weather data.');
    }
    const data: WeatherData = await response.json();
    return { data, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, error: error.message };
    }
    return { data: null, error: 'An unknown error occurred.' };
  }
}
