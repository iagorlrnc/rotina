export type BlockType = 'faculdade' | 'estagio' | 'academia' | 'estudo' | 'livre';

export interface TimeBlock {
  type: BlockType;
  label: string;
  start: string;
  end: string;
  icon: string;
}

export interface DaySchedule {
  name: string;
  short: string;
  isWeekend: boolean;
  blocks: TimeBlock[];
}
