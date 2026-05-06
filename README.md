## Live Demo

https://weather-app-eight-sandy-53.vercel.app/

# Weather App

Aplicación meteorológica construida con Next.js, TypeScript, Tailwind CSS y React Query. Permite consultar el clima actual de una ubicación, ver el pronóstico de las próximas 24 horas y usar la geolocalización del navegador como vista inicial.

## Project URL

https://roadmap.sh/projects/weather-app

## Repository URL

https://github.com/BrahianStiven/weather-app

## Features

- Búsqueda de clima por ciudad o ubicación
- Clima actual con temperatura, viento, probabilidad de lluvia y condición general
- Pronóstico de las próximas 24 horas
- Actualización manual de la información
- Ubicación actual del usuario como vista por defecto

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- TanStack Query
- Visual Crossing Weather API

## Getting Started

Instala las dependencias:

```bash
npm install
```

Crea un archivo `.env.local` en la raíz del proyecto con esta variable:

```env
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Notes

- La API key se obtiene desde Visual Crossing Weather API.
- La API key se almacena en el `.env.local` 