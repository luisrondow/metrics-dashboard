import { convertTime } from '../time';

describe('convertTime', () => {
  test('converts time from seconds to hours', () => {
    expect(convertTime(7200, 'secs', 'hours')).toBe(2);
    expect(convertTime(3600, 'secs', 'hours')).toBe(1);
  });

  test('converts time from hours to seconds', () => {
    expect(convertTime(2, 'hours', 'secs')).toBe(7200);
    expect(convertTime(1, 'hours', 'secs')).toBe(3600);
  });


  test('returns the same value when initial and final measurements are the same', () => {
    expect(convertTime(1, 'secs', 'secs')).toBe(1);
    expect(convertTime(1, 'hours', 'hours')).toBe(1);
  });
});
