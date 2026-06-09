import { useState } from 'react';
import type { DaySchedule } from '../types';
import { BlockCard } from './BlockCard';

interface Props {
  day: DaySchedule;
  isToday: boolean;
}

export function DayCard({ day, isToday }: Props) {
  const [open, setOpen] = useState(isToday);

  const totalMinutes = day.blocks.reduce((acc, b) => {
    const [sh, sm] = b.start.split(':').map(Number);
    const [eh, em] = b.end.split(':').map(Number);
    return acc + (eh * 60 + em) - (sh * 60 + sm);
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const totalLabel = totalMinutes > 0 ? `${hours}h${mins > 0 ? mins + 'min' : ''}` : null;

  return (
    <div
      className={`
        rounded-2xl border transition-all duration-200
        ${isToday
          ? 'border-violet-200 bg-violet-50/40 shadow-md shadow-violet-100'
          : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
        }
      `}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          {isToday && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500 text-white uppercase tracking-wide">
              hoje
            </span>
          )}
          <span className={`font-semibold text-sm ${isToday ? 'text-violet-700' : 'text-gray-700'}`}>
            {day.name}
          </span>
          {totalLabel && (
            <span className="text-xs text-gray-400">{totalLabel} de atividades</span>
          )}
          {day.isWeekend && (
            <span className="text-xs text-gray-300">Dia livre</span>
          )}
        </div>
        <span className={`text-gray-400 text-xs transition-transform ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 flex flex-col gap-2">
          {day.isWeekend ? (
            <div className="rounded-xl bg-gray-50 border border-dashed border-gray-200 py-6 text-center text-sm text-gray-300">
              🌿 Descanso e tempo livre
            </div>
          ) : (
            day.blocks.map((block, i) => (
              <BlockCard key={i} block={block} />
            ))
          )}
        </div>
      )}
    </div>
  );
}
