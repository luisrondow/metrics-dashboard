import { useCallback, useMemo, useState } from "react";
import useFetchMetrics from "./useFetchMetrics";
import { convertTime } from "../utils/time";
import { TimeMeasurement } from "../types/time-utils";

const FULLY_UNPRODUCTIVE_METRIC_IDS = ["mech_problems", "unexplained", "cln_shift"];
const DEFAULT_TIME_MEASUREMENT = "secs";

type Metric = {
  id: string;
  type: string;
  value: number;
  category?: string;
};

export default function useMetricsChartData() {
  const { metrics: fetchedMetrics, isFetching, isError } = useFetchMetrics();

  const [timeMeasurement, setTimeMeasurement] = useState<TimeMeasurement>(DEFAULT_TIME_MEASUREMENT);

  const metrics = useMemo(() => {
    if (!fetchedMetrics) {
      return [];
    }

    return fetchedMetrics.map((metric) => {
      if ((metric.type === "secs" || metric.type === "hours") && metric.type !== timeMeasurement) {
        return {
          ...metric,
          value: Number(convertTime(metric.value, metric.type, timeMeasurement)),
          type: timeMeasurement,
        };
      }

      return metric;
    });
  }, [fetchedMetrics, timeMeasurement]);

  const extractMetrics = useCallback(() => {
    let shiftDurationMetric: Metric | null = null;
    let overallEfficiency: Metric | null = null;
    const fullyUnproductive = [];
    const downtime = [];

    for (const metric of metrics) {
      if (FULLY_UNPRODUCTIVE_METRIC_IDS.includes(metric.id)) {
        fullyUnproductive.push(metric);
      }
      if (metric.category === "downtime") {
        downtime.push(metric);
      }
      if (metric.id === "shift_duration") {
        shiftDurationMetric = metric;
      }
      if (metric.id === "oee") {
        overallEfficiency = metric;
      }
    }

    return {
      fullyUnproductive,
      downtime,
      overallEfficiency,
      shiftDuration: shiftDurationMetric?.value ?? 0,
    };
  }, [metrics]);

  const { fullyUnproductive, downtime, overallEfficiency, shiftDuration } = useMemo(extractMetrics, [extractMetrics]);

  const calculateEfficiencyDrop = useCallback(() => {
    const initialEfficiency = 100;
    const efficiencyData = fullyUnproductive.reduce(
      (acc, element) => {
        const percentageLoss = (element.value / shiftDuration) * 100;
        const newY = Number((acc[acc.length - 1].y - percentageLoss).toFixed(1));
        acc.push({ x: element.id, y: newY });
        return acc;
      },
      [{ x: 'start', y: initialEfficiency }]
    );

    return [{ id: 'efficiency', data: efficiencyData }];
  }, [fullyUnproductive, shiftDuration]);

  const efficiencyDrop = useMemo(calculateEfficiencyDrop, [calculateEfficiencyDrop]);

  const lastAndAverageEfficiency = useMemo(() => {
    const averageEfficiency = (overallEfficiency?.value ?? 0) * 100;
    const lastEfficiency = efficiencyDrop[0].data[efficiencyDrop[0].data.length - 1].y;

    return [
      { metric: 'last shift', efficiency: lastEfficiency },
      { metric: 'average shift', efficiency: averageEfficiency },
    ];
  }, [overallEfficiency, efficiencyDrop]);

  const calculateLoss = useCallback((id: string, metricName: string) => {
    const metricValue = metrics.find((metric) => metric.id === id)?.value ?? 0;
    const efficiencyLoss = 1 - (overallEfficiency?.value ?? 0);
    const gain = Number((metricValue / efficiencyLoss).toFixed(2)) * -1;

    return [{ metric: metricName, loss: metricValue, gain }];
  }, [metrics, overallEfficiency?.value]);

  const speedBalanceLoss = useMemo(() => calculateLoss('sl', 'Speed balance'), [calculateLoss]);
  const goodsBeforePalletizingLoss = useMemo(() => calculateLoss('lbp', 'Goods before pallets'), [calculateLoss]);

  return {
    fetchedMetrics,
    isFetching,
    isError,
    timeMeasurement,
    setTimeMeasurement,
    fullyUnproductive,
    downtime,
    lastAndAverageEfficiency,
    efficiencyDrop,
    speedBalanceLoss,
    goodsBeforePalletizingLoss,
  };
}
