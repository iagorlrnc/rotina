import { useState, useEffect, useMemo } from 'react';
import { schedule } from './data';
import { WeekGrid } from './components/WeekGrid';
import { DayCard } from './components/DayCard';
import { StatsBar } from './components/StatsBar';
import { Legend } from './components/Legend';

const DAY_NAMES = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export default function App() {
  const todayName = useMemo(() => DAY_NAMES[new Date().getDay()], []);

  return (
    <div className="min-h-screen bg-[#ffd1b3]" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header className="border-b border-rose-100/50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Rotina - Izzy
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">Segunda a Sexta · 8h às 22h</p>
          </div>
          <div className="flex items-center gap-2 bg-pink-50 text-pink-600 border border-pink-100 rounded-full px-3 py-1.5 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            {todayName}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Stats */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Resumo semanal
          </h2>
          <StatsBar />
        </section>

        {/* Desktop: Tabela semanal */}
        <section className="hidden md:block">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
              Grade da semana
            </h2>
            <Legend />
          </div>
          <WeekGrid />  
        </section>

        {/* Mobile: Acordeão por dia */}
        <section className="md:hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Dia a dia
            </h2>
          </div>
          <Legend />
          <div className="mt-4 flex flex-col gap-3">
            {schedule.map((day) => (
              <DayCard
                key={day.short}
                day={day}
                isToday={day.name === todayName}
              />
            ))}
          </div>
        </section>

        {/* Timeline visual */}
        <section>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            Linha do tempo diária (dias úteis)
          </h2>
          <DailyTimeline />
        </section>

      </main>

      <footer className="text-center py-6 text-xs text-gray-300 border-t border-gray-100">
      </footer>
    </div>
  );
}

function DailyTimeline() {
  const isEstudoFirst = useMemo(() => {
    const day = new Date().getDay();
    // Terça (2) e Quinta (4) têm Estudo primeiro
    return day === 2 || day === 4;
  }, []);

  const events = useMemo(() => [
    { label: 'Faculdade', icon: '🎓', start: 8, end: 12, color: 'bg-blue-100 border-blue-200 text-blue-700' },
    { label: 'Intervalo', icon: '☕', start: 12, end: 13, color: 'bg-gray-50 border-gray-200 text-gray-400' },
    { label: 'Estágio', icon: '💼', start: 13, end: 18, color: 'bg-emerald-100 border-emerald-200 text-emerald-700' },
    { label: 'Deslocamento', icon: '🚶', start: 18, end: 19, color: 'bg-gray-50 border-gray-200 text-gray-400' },
    ...(isEstudoFirst
      ? [
          { label: 'Estudo', icon: '📚', start: 19, end: 20.5, color: 'bg-pink-100 border-pink-200 text-pink-700' },
          { label: 'Academia', icon: '🏋️', start: 20.5, end: 22, color: 'bg-amber-100 border-amber-200 text-amber-700' },
        ]
      : [
          { label: 'Academia', icon: '🏋️', start: 19, end: 20.5, color: 'bg-amber-100 border-amber-200 text-amber-700' },
          { label: 'Estudo', icon: '📚', start: 20.5, end: 22, color: 'bg-pink-100 border-pink-200 text-pink-700' },
        ]
    ),
  ], [isEstudoFirst]);

  const TOTAL_HOURS = 14; // 8h to 22h
  const START_HOUR = 8;
  const END_HOUR = 22;

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // Atualiza a cada 10 segundos
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const timeAsDecimal = currentHour + currentMinute / 60;

  const showIndicator = timeAsDecimal >= START_HOUR && timeAsDecimal <= END_HOUR;
  const indicatorPosition = ((timeAsDecimal - START_HOUR) / TOTAL_HOURS) * 100;

  const formatHour = (hour: number) => {
    const h = Math.floor(hour);
    const m = Math.round((hour - h) * 60);
    return m === 0 ? `${h}h` : `${h}h${m.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-rose-100/50 shadow-sm p-6">
      {/* Hour markers */}
      <div className="relative">
        <div className="flex mb-2">
          {Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => i + START_HOUR).map((h) => (
            <div
              key={h}
              className="text-[10px] text-gray-500 font-medium"
              style={{ position: 'absolute', left: `${((h - START_HOUR) / TOTAL_HOURS) * 100}%`, transform: 'translateX(-50%)' }}
            >
              {h}h
            </div>
          ))}
          <div style={{ height: '16px' }} />
        </div>

        {/* Track wrapper to isolate absolute height positioning */}
        <div className="relative">
          {/* Track */}
          <div className="relative h-10 flex rounded-xl overflow-hidden border border-gray-100">
            {events.map((ev, i) => {
              const left = ((ev.start - START_HOUR) / TOTAL_HOURS) * 100;
              const width = ((ev.end - ev.start) / TOTAL_HOURS) * 100;
              return (
                <div
                  key={i}
                  className={`absolute h-full flex items-center justify-center border-r last:border-r-0 ${ev.color} transition-all hover:brightness-95`}
                  style={{ left: `${left}%`, width: `${width}%` }}
                  title={`${ev.label}: ${formatHour(ev.start)} – ${formatHour(ev.end)}`}
                >
                  <span className="text-sm hidden sm:block">{ev.icon}</span>
                  <span className="text-[10px] font-semibold ml-1 hidden lg:block truncate">{ev.label}</span>
                </div>
              );
            })}
          </div>

          {/* Real-time Indicator */}
          {showIndicator && (
            <div
              className="absolute top-0 bottom-0 pointer-events-none z-20"
              style={{
                left: `${indicatorPosition}%`,
                transform: 'translateX(-50%)',
                transition: 'left 0.5s ease-in-out',
              }}
            >
              {/* Time Badge above the track */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap flex items-center gap-1"
                style={{ top: '-26px' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </div>
              
              {/* Line */}
              <div className="h-full w-0.5 bg-rose-500/80">
                {/* Pulsing Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-rose-500 rounded-full ring-4 ring-rose-500/30 animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {/* Legend below timeline */}
        <div className="flex flex-wrap gap-3 mt-4">
          {events.map((ev) => (
            <div key={ev.label} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span>{ev.icon}</span>
              <span>{ev.label}</span>
              <span className="text-gray-400">{formatHour(ev.start)}–{formatHour(ev.end)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
