import { percentageFormatter, timeFormatter, tableValueFormatter } from '../formatters';
import { MetricType } from '../../types/metrics';

describe('percentageFormatter', () => {
  test('formats number as percentage', () => {
    expect(percentageFormatter(42)).toBe('42%');
    expect(percentageFormatter(100)).toBe('100%');
    expect(percentageFormatter(0)).toBe('0%');
  });
});

describe('timeFormatter', () => {
  test('formats time in seconds', () => {
    expect(timeFormatter(30, 'secs')).toBe('30s');
    expect(timeFormatter(90, 'secs')).toBe('90s');
  });

  test('formats time in hours and minutes', () => {
    expect(timeFormatter(1.5, 'hours')).toBe('1h 30m');
    expect(timeFormatter(2.75, 'hours')).toBe('2h 45m');
    expect(timeFormatter(0.5, 'hours')).toBe('0h 30m');
  });
});

describe('tableValueFormatter', () => {
  test('formats value as percentage', () => {
    expect(tableValueFormatter(42, 'percentage')).toBe('42%');
  });

  test('formats value as seconds', () => {
    expect(tableValueFormatter(42, 'secs')).toBe('42s');
  });

  test('formats value as hours', () => {
    expect(tableValueFormatter(2, 'hours')).toBe('2h');
  });

  test('returns value as string for default case', () => {
    expect(tableValueFormatter(42, 'unknown' as MetricType)).toBe('42');
  });
});
