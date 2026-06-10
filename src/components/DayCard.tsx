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
          ? 'border-pink-200 bg-pink-50/30 shadow-md shadow-pink-100/50'
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
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-pink-500 text-white uppercase tracking-wide">
              hoje
            </span>
          )}
          <span className={`font-semibold text-sm ${isToday ? 'text-pink-700' : 'text-gray-700'}`}>
            {day.name}
          </span>
          {totalLabel && (
            <span className="text-xs text-gray-400">{totalLabel} de atividades</span>
          )}
          {day.isWeekend && (
            <span className="text-xs text-pink-400 font-medium">Livre com meu amor ❤️</span>
          )}
        </div>
        <span className={`text-gray-400 text-xs transition-transform ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 flex flex-col gap-2">
          {day.isWeekend ? (
            <div className="rounded-xl bg-rose-50/50 border border-dashed border-rose-200 py-6 text-center text-sm text-rose-500 font-semibold flex items-center justify-center gap-1.5 shadow-sm shadow-rose-100/30">
              💖 tempo livre com meu amor
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
