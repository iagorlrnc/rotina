import { stats } from '../data';

const colorMap: Record<string, string> = {
  violet: 'bg-violet-50 text-violet-700 border-violet-100',
  amber: 'bg-amber-50 text-amber-700 border-amber-100',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
};

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`rounded-2xl border px-4 py-3 ${colorMap[s.color]}`}
        >
          <p className="text-xs font-medium opacity-60 leading-tight mb-1">{s.label}</p>
          <div className="flex items-center gap-2">
            <span className="text-xl">{s.icon}</span>
            <span className="text-xl font-bold tracking-tight">{s.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
