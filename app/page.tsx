import { Search, RefreshCw, CloudRain, Wind, Sun } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Cabecera y Buscador */}
        <header className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white p-4 rounded-2xl shadow-sm">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight">WeatherApp</h1>
          
          <div className="flex w-full sm:w-auto items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar ubicación (ej. Bogotá)..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <button className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors" title="Actualizar clima">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Tarjeta Principal de Clima Actual */}
        <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-8 rounded-3xl shadow-lg flex flex-col items-center justify-center relative overflow-hidden">
          <div className="text-center z-10">
            <h2 className="text-3xl font-semibold mb-2">Bogotá, CO</h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sun className="w-20 h-20 text-yellow-300 drop-shadow-md" />
              <span className="text-7xl font-bold tracking-tighter">22°</span>
            </div>
            <p className="text-2xl text-blue-100 mb-8 font-medium">Soleado</p>
            
            <div className="flex gap-6 text-sm font-medium bg-white/20 px-6 py-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-blue-100" />
                <span>15 km/h</span>
              </div>
              <div className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-blue-100" />
                <span>10% Lluvia</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Pronóstico */}
        <section className="bg-white p-6 rounded-3xl shadow-sm">
          <h3 className="text-lg font-bold mb-4 text-slate-800">Pronóstico de 24 horas</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {/* Ciclo provisional para mostrar tarjetas de horas */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="min-w-[85px] flex flex-col items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-slate-500 text-sm mb-3 font-medium">10:00</span>
                <Sun className="w-8 h-8 text-yellow-500 mb-3" />
                <span className="font-bold text-lg text-slate-800">20°</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}