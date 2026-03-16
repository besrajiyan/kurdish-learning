interface Props {
  value: number;   // 0-100
  color?: string;
  label?: string;
}

export default function ProgressBar({ value, color = 'bg-primary', label }: Props) {
  return (
    <div className="space-y-1">
      {label && <p className="text-xs text-ink-secondary font-medium">{label}</p>}
      <div className="h-3 bg-surface-secondary rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}
