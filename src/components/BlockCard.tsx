import type { TimeBlock } from '../types';
import { blockColors } from '../data';

interface Props {
  block: TimeBlock;
  compact?: boolean;
}

export function BlockCard({ block, compact = false }: Props) {
  const c = blockColors[block.type];
  return (
    <div
      className={`
        ${c.bg} ${c.text} border ${c.border}
        rounded-xl flex items-center gap-2
        ${compact ? 'px-2 py-1.5' : 'px-3 py-2.5'}
        transition-all hover:scale-[1.02] hover:shadow-sm
      `}
    >
      <span className={compact ? 'text-sm' : 'text-base'}>{block.icon}</span>
      <div className="min-w-0">
        <p className={`font-semibold leading-tight truncate ${compact ? 'text-xs' : 'text-sm'}`}>
          {block.label}
        </p>
        <p className={`opacity-60 leading-tight ${compact ? 'text-[10px]' : 'text-xs'}`}>
          {block.start} – {block.end}
        </p>
      </div>
    </div>
  );
}
