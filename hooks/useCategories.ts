import useSWR from 'swr';
import axios from 'axios';

export type Category = {
    id: number;
    name: string;
    slug: string;
};

const fetcher = (url: string) => axios.get<Category[]>(url).then(res => res.data);

export function useCategories() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT}categorie?per_page=100`, 
    fetcher
  );

  return {
    categories: data,
    isLoading,
    isError: error
  };
}