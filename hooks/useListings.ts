import useSWR from 'swr';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export type Listing = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  cmb2: {
    __listinger__location_Latitude: number;
    __listinger__location_Longitude: number;
  };
  categorie: [number];
  _embedded?: object;
};

const fetcher = (url: string) => axios.get<Listing[]>(url).then(res => res.data);

export function useListings() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams();
  params.append('_embed', 'true');
  
  const searchTerm = searchParams.get('q');
  const regionSlug = searchParams.get('region');
  
  if (searchTerm) {
    params.append('search', searchTerm);
  }
  
  if (regionSlug) {
    params.append('regions', regionSlug);
  }
  
  params.append('per_page', '12');

  const apiKey = `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT}listing?${params.toString()}`;

  const { data, error, isLoading } = useSWR(apiKey, fetcher);

  return {
    listings: data,
    isLoading,
    isError: error,
  };
}