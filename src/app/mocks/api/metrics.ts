import { http, delay, HttpResponse } from 'msw'

import metrics from './data/metrics.json'

import { type Metric, type MetricCategory, type MetricType } from '@/app/types/metrics'

export const metricsHandlers = [
  http.get('http://localhost:3000/metrics', async () => {
    await delay()

    const convertedMetrics = metrics.data.map((metric) => ({
      ...metric,
      category: metric.category as MetricCategory,
      type: metric.type as MetricType,
    }))

    return HttpResponse.json<Metric[]>(convertedMetrics, { status: 200 })
  }),
]