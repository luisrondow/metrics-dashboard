import { Metric } from "./metrics";

export type ChartData = Pick<Metric, "id" | "label" | "value"> & { type: string };