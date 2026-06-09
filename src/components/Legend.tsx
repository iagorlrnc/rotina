import { blockColors } from '../data';

const items = [
  { type: 'faculdade', label: 'Faculdade' },
  { type: 'estagio', label: 'Estágio' },
  { type: 'academia', label: 'Academia' },
  { type: 'estudo', label: 'Estudo' },
];

export function Legend() {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => {
        const c = blockColors[item.type];
        return (
          <div key={item.type} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
