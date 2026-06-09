import { useMemo } from 'react';
import { schedule } from './data';
import { WeekGrid } from './components/WeekGrid';
import { DayCard } from './components/DayCard';
import { StatsBar } from './components/StatsBar';
import { Legend } from './components/Legend';

const DAY_NAMES = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export default function App() {
  const todayName = useMemo(() => DAY_NAMES[new Date().getDay()], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Minha Rotina
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">Segunda a Sexta · 8h às 22h</p>
          </div>
          <div className="flex items-center gap-2 bg-violet-50 text-violet-600 border border-violet-100 rounded-full px-3 py-1.5 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            {todayName}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Stats */}
        <section>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
            Resumo semanal
          </h2>
          <StatsBar />
        </section>

        {/* Desktop: Tabela semanal */}
        <section className="hidden md:block">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
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
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Linha do tempo diária (dias úteis)
          </h2>
          <DailyTimeline />
        </section>

      </main>

      <footer className="text-center py-6 text-xs text-gray-300 border-t border-gray-100">
        Rotina atualizada · {new Date().getFullYear()}
      </footer>
    </div>
  );
}

function DailyTimeline() {
  const events = [
    { label: 'Faculdade', icon: '🎓', start: 8, end: 12, color: 'bg-blue-100 border-blue-200 text-blue-700' },
    { label: 'Intervalo', icon: '☕', start: 12, end: 13, color: 'bg-gray-50 border-gray-200 text-gray-400' },
    { label: 'Estágio', icon: '💼', start: 13, end: 18, color: 'bg-emerald-100 border-emerald-200 text-emerald-700' },
    { label: 'Deslocamento', icon: '🚶', start: 18, end: 19, color: 'bg-gray-50 border-gray-200 text-gray-400' },
    { label: 'Academia / Estudo', icon: '🌙', start: 19, end: 22, color: 'bg-violet-100 border-violet-200 text-violet-700' },
  ];

  const TOTAL_HOURS = 14; // 8h to 22h
  const START_HOUR = 8;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Hour markers */}
      <div className="relative">
        <div className="flex mb-2">
          {Array.from({ length: TOTAL_HOURS + 1 }, (_, i) => i + START_HOUR).map((h) => (
            <div
              key={h}
              className="text-[10px] text-gray-300 font-medium"
              style={{ position: 'absolute', left: `${((h - START_HOUR) / TOTAL_HOURS) * 100}%`, transform: 'translateX(-50%)' }}
            >
              {h}h
            </div>
          ))}
          <div style={{ height: '16px' }} />
        </div>

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
                title={`${ev.label}: ${ev.start}h – ${ev.end}h`}
              >
                <span className="text-sm hidden sm:block">{ev.icon}</span>
                <span className="text-[10px] font-semibold ml-1 hidden lg:block truncate">{ev.label}</span>
              </div>
            );
          })}
        </div>

        {/* Legend below timeline */}
        <div className="flex flex-wrap gap-3 mt-4">
          {events.map((ev) => (
            <div key={ev.label} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span>{ev.icon}</span>
              <span>{ev.label}</span>
              <span className="text-gray-300">{ev.start}h–{ev.end}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
