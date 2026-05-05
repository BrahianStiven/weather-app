import { WeatherData } from "../types/weather";

export async function fetchWeather(location: string): Promise<WeatherData> {
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  
  if (!API_KEY) {
    throw new Error("La API Key no está configurada en .env.local");
  }

  // Se usa unitGroup=metric para que nos devuelva Grados Celsius y km/h
  // lang=es es para que la descripción ("conditions") venga en español si la API lo soporta
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&lang=es&key=${API_KEY}&contentType=json`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("No se pudo obtener el clima para esa ubicación");
  }

  return response.json();
}