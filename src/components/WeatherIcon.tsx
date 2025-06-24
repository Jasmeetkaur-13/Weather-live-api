import React from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudLightning,
  Wind,
  Snowflake,
  Cloudy,
  Tornado,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  conditionCode: number;
  isDay: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  conditionCode,
  isDay,
  ...props
}) => {
  const iconMap: { [key: number]: React.ReactNode } = {
    1000: isDay ? <Sun {...props} /> : <Moon {...props} />, // Sunny / Clear
    1003: isDay ? <CloudSun {...props} /> : <CloudMoon {...props} />, // Partly cloudy
    1006: <Cloud {...props} />, // Cloudy
    1009: <Cloudy {...props} />, // Overcast
    1030: <CloudFog {...props} />, // Mist
    1063: <CloudDrizzle {...props} />, // Patchy rain possible
    1066: <CloudSnow {...props} />, // Patchy snow possible
    1069: <CloudDrizzle {...props} />, // Patchy sleet possible
    1072: <CloudDrizzle {...props} />, // Patchy freezing drizzle possible
    1087: <CloudLightning {...props} />, // Thundery outbreaks possible
    1114: <Wind {...props} />, // Blowing snow
    1117: <Snowflake {...props} />, // Blizzard
    1135: <CloudFog {...props} />, // Fog
    1147: <CloudFog {...props} />, // Freezing fog
    1150: <CloudDrizzle {...props} />, // Patchy light drizzle
    1153: <CloudDrizzle {...props} />, // Light drizzle
    1168: <CloudDrizzle {...props} />, // Freezing drizzle
    1171: <CloudDrizzle {...props} />, // Heavy freezing drizzle
    1180: <CloudRain {...props} />, // Patchy light rain
    1183: <CloudRain {...props} />, // Light rain
    1186: <CloudRain {...props} />, // Moderate rain at times
    1189: <CloudRain {...props} />, // Moderate rain
    1192: <CloudRainWind {...props} />, // Heavy rain at times
    1195: <CloudRainWind {...props} />, // Heavy rain
    1198: <CloudRain {...props} />, // Light freezing rain
    1201: <CloudRainWind {...props} />, // Moderate or heavy freezing rain
    1204: <CloudSnow {...props} />, // Light sleet
    1207: <CloudSnow {...props} />, // Moderate or heavy sleet
    1210: <CloudSnow {...props} />, // Patchy light snow
    1213: <CloudSnow {...props} />, // Light snow
    1216: <CloudSnow {...props} />, // Patchy moderate snow
    1219: <CloudSnow {...props} />, // Moderate snow
    1222: <Snowflake {...props} />, // Patchy heavy snow
    1225: <Snowflake {...props} />, // Heavy snow
    1237: <Snowflake {...props} />, // Ice pellets
    1240: <CloudRain {...props} />, // Light rain shower
    1243: <CloudRainWind {...props} />, // Moderate or heavy rain shower
    1246: <CloudRainWind {...props} />, // Torrential rain shower
    1249: <CloudSnow {...props} />, // Light sleet showers
    1252: <CloudSnow {...props} />, // Moderate or heavy sleet showers
    1255: <CloudSnow {...props} />, // Light snow showers
    1258: <CloudSnow {...props} />, // Moderate or heavy snow showers
    1261: <Snowflake {...props} />, // Light showers of ice pellets
    1264: <Snowflake {...props} />, // Moderate or heavy showers of ice pellets
    1273: <CloudLightning {...props} />, // Patchy light rain with thunder
    1276: <CloudLightning {...props} />, // Moderate or heavy rain with thunder
    1279: <CloudLightning {...props} />, // Patchy light snow with thunder
    1282: <CloudLightning {...props} />, // Moderate or heavy snow with thunder
  };

  return iconMap[conditionCode] || <Cloud {...props} />;
};
