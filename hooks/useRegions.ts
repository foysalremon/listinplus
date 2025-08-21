import useSWR from 'swr';
import axios from 'axios';

export type Region = {
  id: number;
  name: string;
  slug: string;
};

const fetcher = (url: string) => axios.get<Region[]>(url).then(res => res.data);

export function useRegions() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT}region?per_page=100`, 
    fetcher
  );

  return {
    regions: data,
    isLoading,
    isError: error
  };
}