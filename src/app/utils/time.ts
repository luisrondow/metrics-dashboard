import { TimeMeasurement } from "../types/time-utils";

export const convertTime = (time: number, initial: TimeMeasurement, final: TimeMeasurement ) => {
  const conversions = {
    secs: 1,
    minutes: 60,
    hours: 3600,
  };

  const timeInSeconds = time * conversions[initial];
  const convertedTime = timeInSeconds / conversions[final];

  return convertedTime;
}