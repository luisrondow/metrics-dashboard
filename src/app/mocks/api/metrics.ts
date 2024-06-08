import { http, HttpResponse } from 'msw'

import metrics from './data/metrics.json'

import { type Metric, type MetricCategory, type MetricType } from '@/app/types/metrics'

export const metricsHandlers = [
  http.get('/metrics', () => {
    const convertedMetrics = metrics.data.map((metric) => ({
      ...metric,
      category: metric.category as MetricCategory,
      type: metric.type as MetricType,
    }))

    return HttpResponse.json<Metric[]>(convertedMetrics, { status: 200 })
  }),
]