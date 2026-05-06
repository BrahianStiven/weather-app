"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, RefreshCw, CloudRain, Wind, Sun, Cloud, CloudSun, CloudLightning, LoaderCircle } from "lucide-react";
import { fetchWeather } from "./services/api";
import { WeatherHour } from "./types/weather";



function getWeatherIcon(icon: string) {
  const className = "w-8 h-8";

  switch (icon) {
    case "rain":
    case "showers-day":
    case "showers-night":
      return <CloudRain className={`${className} text-blue-200`} />;
    case "cloudy":
    case "fog":
      return <Cloud className={`${className} text-slate-200`} />;
    case "partly-cloudy-day":
    case "partly-cloudy-night":
      return <CloudSun className={`${className} text-yellow-200`} />;
    case "thunder-rain":
    case "thunder-showers-day":
    case "thunder-showers-night":
      return <CloudLightning className={`${className} text-yellow-200`} />;
    default:
      return <Sun className={`${className} text-yellow-200`} />;
  }
}

function formatHour(datetime: string) {
  return datetime.slice(0, 5);
}



export default function Home() {

  const [location, setLocation] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Medellín");
      setSearchValue("Medellín");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const currentLocation = `${coords.latitude},${coords.longitude}`;
        setLocation(currentLocation);
        setSearchValue(currentLocation);
      },
      () => {
        setLocation("Medellín");
        setSearchValue("Medellín");
      }
    );
  }, []);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["weather", location],
    queryFn: () => fetchWeather(location),
    enabled: Boolean(location),
  });

  const next24Hours = useMemo(() => {
    if (!data?.days) return [];

    const allHours = data.days.flatMap((day) => day.hours);
    return allHours.slice(0, 24);
  }, [data]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedLocation = searchValue.trim();
    if (!trimmedLocation) return;

    setLocation(trimmedLocation);
  };

  const current = data?.currentConditions;

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="flex flex-col gap-4 justify-between bg-white p-4 rounded-2xl shadow-sm md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600 tracking-tight">Weather App</h1>
            <p className="text-sm text-slate-500">Consulta el clima actual y el pronóstico de 24 horas.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full md:w-auto items-center gap-2">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Buscar ubicación..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Buscar
            </button>

            <button
              type="button"
              onClick={() => refetch()}
              className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
              title="Actualizar clima"
            >
              <RefreshCw className={`w-5 h-5 ${isFetching ? "animate-spin" : ""}`} />
            </button>
          </form>
        </header>

        {isLoading ? (
          <section className="bg-white rounded-3xl shadow-sm p-10 flex flex-col items-center justify-center gap-4 text-slate-500">
            <LoaderCircle className="w-10 h-10 animate-spin text-blue-500" />
            <p>Cargando clima...</p>
          </section>
        ) : isError ? (
          <section className="bg-red-50 border border-red-200 text-red-700 rounded-3xl shadow-sm p-6">
            <h2 className="font-semibold mb-2">No se pudo cargar el clima</h2>
            <p className="text-sm">
              {error instanceof Error ? error.message : "Ocurrió un error inesperado."}
            </p>
          </section>
        ) : data && current ? (
          <>
            <section className="bg-linear-to-br from-blue-500 to-blue-700 text-white p-8 rounded-3xl shadow-lg">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-2">Ubicación</p>
                  <h2 className="text-3xl md:text-4xl font-semibold">{data.resolvedAddress}</h2>
                  <p className="text-xl text-blue-100 mt-3">{current.conditions}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="scale-150">{getWeatherIcon(current.icon)}</div>
                  <span className="text-6xl md:text-7xl font-bold tracking-tighter">
                    {Math.round(current.temp)}°
                  </span>
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-blue-100 mb-2">
                    <Wind className="w-4 h-4" />
                    <span className="text-sm">Viento</span>
                  </div>
                  <p className="text-2xl font-semibold">{current.windspeed} km/h</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-blue-100 mb-2">
                    <CloudRain className="w-4 h-4" />
                    <span className="text-sm">Probabilidad de lluvia</span>
                  </div>
                  <p className="text-2xl font-semibold">{current.precipprob}%</p>
                </div>

                <div className="bg-white/15 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-blue-100 mb-2">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-sm">Estado</span>
                  </div>
                  <p className="text-2xl font-semibold">{current.conditions}</p>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-3xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">Próximas 24 horas</h3>
                <span className="text-sm text-slate-500">Actualizable manualmente</span>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {next24Hours.map((hour: WeatherHour, index: number) => (
                  <div
                    key={`${hour.datetime}-${index}`}
                    className="min-w-27.5 flex flex-col items-center bg-slate-50 p-4 rounded-2xl border border-slate-100"
                  >
                    <span className="text-slate-500 text-sm mb-3 font-medium">
                      {formatHour(hour.datetime)}
                    </span>
                    <div className="mb-3">{getWeatherIcon(hour.icon)}</div>
                    <span className="font-bold text-lg text-slate-800">{Math.round(hour.temp)}°</span>
                    <span className="text-xs text-slate-500 mt-1 text-center">{hour.precipprob}% lluvia</span>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}