import { TimeMeasurement } from "../types/time-utils";

export const percentageFormatter = (value: number) => {
  return `${value}%`;
}

export const timeFormatter = (value: number, timeMeasurement: TimeMeasurement) => {
  if (timeMeasurement === "secs") {
    return `${value}s`;
  }

  const hours = Math.floor(value);
  const minutes = Math.floor((value - hours) * 60);

  return `${hours}h ${minutes}m`;
}
