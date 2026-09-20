import type { Confidence } from '../types';

const map: Record<Confidence, string> = {
  'platform estimate': 'platform',
  'user adjusted': 'adjusted',
  'user weighed': 'weighed',
  'user entry': 'entry',
  demo: 'demo',
};

export function ConfidenceTag({ value }: { value: Confidence }) {
  return <span className={`tag ${map[value]}`}>{value}</span>;
}
