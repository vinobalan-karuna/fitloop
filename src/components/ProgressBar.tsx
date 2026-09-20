export function ProgressBar({
  value,
  max,
  label,
  right,
  protein,
}: {
  value: number;
  max: number;
  label: string;
  right?: string;
  protein?: boolean;
}) {
  const pct = Math.min(100, max > 0 ? (value / max) * 100 : 0);
  return (
    <div className="bar-wrap">
      <div className="bar-meta">
        <span>{label}</span>
        <span>{right ?? `${Math.round(value)} / ${max}`}</span>
      </div>
      <div className={`bar ${protein ? 'protein' : ''}`}>
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
