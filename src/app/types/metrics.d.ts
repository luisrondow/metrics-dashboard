export type MetricCategory = 'efficiency' | 'shift' | 'downtime';
export type MetricType = 'hours' | 'secs' | 'percentage' | 'number';

export type Metric = {
  id: string;
  label: string;
  value: number;
  type: MetricType;
  description: string;
  category: MetricCategory;
};