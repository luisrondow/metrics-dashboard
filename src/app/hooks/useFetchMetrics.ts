import { useQuery } from '@tanstack/react-query';
import { Metric } from '../types/metrics';

export default function useFetchMetrics() {
  const { data, isFetching, isError } = useQuery<Metric[]>({
    queryKey: ['fetch-wish-list-items'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error('API_URL is not defined');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/metrics`);

      return await response.json();
    },
  });

  return { metrics: data, isFetching, isError };
}