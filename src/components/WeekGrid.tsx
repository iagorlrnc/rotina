import { schedule } from '../data';
import { BlockCard } from './BlockCard';

export function WeekGrid() {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-rose-100/50 overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr className="bg-white/80 backdrop-blur-sm border-b border-rose-100/50">
            <th className="w-20 py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Horário
            </th>
            {schedule.map((day) => (
              <th
                key={day.short}
                className={`py-3 px-2 text-center text-xs font-semibold uppercase tracking-wider ${
                  day.isWeekend ? 'text-gray-500' : 'text-gray-500'
                }`}
              >
                <span className="hidden sm:inline">{day.name.split('-')[0]}</span>
                <span className="sm:hidden">{day.short}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Manhã */}
          <TimeRow
            label="Manhã"
            time="08–12h"
            blockType="faculdade"
          />
          {/* Almoço separador */}
          <tr className="border-t border-dashed border-gray-100">
            <td colSpan={8} className="py-1 px-4 text-[10px] text-gray-500 font-medium tracking-widest uppercase">
               Intervalo - Almoço
            </td>
          </tr>
          {/* Tarde */}
          <TimeRow
            label="Tarde"
            time="13–18h"
            blockType="estagio"
          />
          {/* Noite separador */}
          <tr className="border-t border-dashed border-gray-100">
            <td colSpan={8} className="py-1 px-4 text-[10px] text-gray-500 font-medium tracking-widest uppercase">
              Intervalo
            </td>
          </tr>
          {/* Noite split */}
          <NightRow />
        </tbody>
      </table>
    </div>
  );
}

function TimeRow({ label, time, blockType }: { label: string; time: string; blockType: 'faculdade' | 'estagio' }) {
  return (
    <tr className="border-t border-gray-100 group">
      <td className="py-3 px-4 align-top">
        <p className="text-xs font-semibold text-gray-500">{label}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </td>
      {schedule.map((day) => (
        <td key={day.short} className="py-3 px-1.5 align-top">
          {!day.isWeekend ? (
            <BlockCard
              block={day.blocks.find((b) => b.type === blockType)!}
            />
          ) : (
            <div className="rounded-xl bg-pink-50/50 border border-dashed border-pink-200 py-4 text-center text-[11px] text-pink-600 font-bold px-1.5 leading-normal flex flex-col items-center justify-center gap-1 shadow-sm shadow-pink-100/30">
              <span className="text-base">💖</span>
              <span className="max-w-[100px] break-words">Tempo livre com meu amor</span>
            </div>
          )}
        </td>
      ))}
    </tr>
  );
}

function NightRow() {
  return (
    <tr className="border-t border-gray-100">
      <td className="py-3 px-4 align-top">
        <p className="text-xs font-semibold text-gray-500">Noite</p>
        <p className="text-xs text-gray-500">19–22h</p>
      </td>
      {schedule.map((day) => (
        <td key={day.short} className="py-3 px-1.5 align-top">
          {!day.isWeekend ? (
            <div className="flex flex-col gap-1.5">
              {day.blocks.filter((b) => b.type === 'academia' || b.type === 'estudo').map((b, i) => (
                <BlockCard key={i} block={b} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-pink-50/50 border border-dashed border-pink-200 py-4 text-center text-[11px] text-pink-600 font-bold px-1.5 leading-normal flex flex-col items-center justify-center gap-1 shadow-sm shadow-pink-100/30">
              <span className="text-base">💖</span>
              <span className="max-w-[100px] break-words">Tempo livre com meu amor</span>
            </div>
          )}
        </td>
      ))}
    </tr>
  );
}
