'use client';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
// import qs from 'qs';

export function useFetch<T>(
  url: string,
  options?: { [key: string]: any },

  shouldFetch: boolean = true
): {
  data: T | undefined;
  error: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
  isFetching: boolean;
} {
  const fetchData = async (): Promise<T> => {
    const response: AxiosResponse<T> = await axios.get<T>(url, {
      ...options,
      // paramsSerializer: (params) => {
      //   return qs.stringify(params);
      // },
    });

    return response.data;
  };

  const { data, error, isError, isLoading, isSuccess, refetch, isFetching } = useQuery<T>({
    queryKey: [url],
    queryFn: fetchData,
    refetchInterval: 60000,
    // refetchOnWindowFocus: false,
    enabled: shouldFetch, // Use the `shouldFetch` prop to control whether the request should be made
    retry: 2,
  });

  return { data, error, isLoading, isError, isSuccess, refetch, isFetching };
}
