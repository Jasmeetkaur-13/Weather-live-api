import { WeatherDashboard } from '@/components/WeatherDashboard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-8 lg:p-12">
      <WeatherDashboard />
    </main>
  );
}
