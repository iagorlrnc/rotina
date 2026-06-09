import type { DaySchedule, TimeBlock } from './types';

const FACUL: TimeBlock = {
  type: 'faculdade',
  label: 'Faculdade',
  start: '08:00',
  end: '12:00',
  icon: '🎓',
};

const ESTAGIO: TimeBlock = {
  type: 'estagio',
  label: 'Estágio',
  start: '13:00',
  end: '18:00',
  icon: '💼',
};

const ACADEMIA_FIRST: TimeBlock = {
  type: 'academia',
  label: 'Academia',
  start: '19:00',
  end: '20:30',
  icon: '🏋️',
};

const ESTUDO_AFTER: TimeBlock = {
  type: 'estudo',
  label: 'Estudo',
  start: '20:30',
  end: '22:00',
  icon: '📚',
};

const ESTUDO_FIRST: TimeBlock = {
  type: 'estudo',
  label: 'Estudo',
  start: '19:00',
  end: '20:30',
  icon: '📚',
};

const ACADEMIA_AFTER: TimeBlock = {
  type: 'academia',
  label: 'Academia',
  start: '20:30',
  end: '22:00',
  icon: '🏋️',
};

export const schedule: DaySchedule[] = [
  { name: 'Segunda-feira', short: 'Seg', isWeekend: false, blocks: [FACUL, ESTAGIO, ACADEMIA_FIRST, ESTUDO_AFTER] },
  { name: 'Terça-feira',   short: 'Ter', isWeekend: false, blocks: [FACUL, ESTAGIO, ESTUDO_FIRST, ACADEMIA_AFTER] },
  { name: 'Quarta-feira',  short: 'Qua', isWeekend: false, blocks: [FACUL, ESTAGIO, ACADEMIA_FIRST, ESTUDO_AFTER] },
  { name: 'Quinta-feira',  short: 'Qui', isWeekend: false, blocks: [FACUL, ESTAGIO, ESTUDO_FIRST, ACADEMIA_AFTER] },
  { name: 'Sexta-feira',   short: 'Sex', isWeekend: false, blocks: [FACUL, ESTAGIO, ACADEMIA_FIRST, ESTUDO_AFTER] },
  { name: 'Sábado',        short: 'Sáb', isWeekend: true,  blocks: [] },
  { name: 'Domingo',       short: 'Dom', isWeekend: true,  blocks: [] },
];

export const blockColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  faculdade: {
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
  },
  estagio: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  academia: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  estudo: {
    bg: 'bg-violet-50',
    text: 'text-violet-800',
    border: 'border-violet-200',
    dot: 'bg-violet-500',
  },
  livre: {
    bg: 'bg-gray-50',
    text: 'text-gray-400',
    border: 'border-gray-200',
    dot: 'bg-gray-300',
  },
};

export const stats = [
  { label: 'Horas de estudo/sem', value: '7h 30min', icon: '📚', color: 'violet' },
  { label: 'Horas de academia/sem', value: '7h 30min', icon: '🏋️', color: 'amber' },
  { label: 'Horas de estágio/sem', value: '25h', icon: '💼', color: 'emerald' },
  { label: 'Horas de faculdade/sem', value: '20h', icon: '🎓', color: 'blue' },
];
