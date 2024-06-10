import { Metric } from "./metrics";

export type ChartData = Pick<Metric, "id" | "label" | "value"> & { type: string };

export type BarChartData = {
  [key: string]: string | number;
};

export type LineChartData = {
  id: string;
  data: {
      x: string;
      y: number;
  }[];
}