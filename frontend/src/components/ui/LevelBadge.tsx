const LABELS: Record<number, { label: string; color: string }> = {
  1: { label: 'A1', color: 'bg-success-50 text-success-600' },
  2: { label: 'A2', color: 'bg-success-100/30 text-success-800' },
  3: { label: 'B1', color: 'bg-accent-50 text-accent-600' },
  4: { label: 'B2', color: 'bg-accent-100/40 text-accent-800' },
  5: { label: 'C1', color: 'bg-danger-50 text-danger-600' },
  6: { label: 'C2', color: 'bg-magic-50 text-magic-600' },
};

interface Props {
  level: number;
  lang?: 'de' | 'en';
}

export default function LevelBadge({ level }: Props) {
  const info = LABELS[level] ?? LABELS[1];
  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${info.color}`}>
      {info.label}
    </span>
  );
}
