import useSWR from 'swr';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export type WpTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
};

export type Listing = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  categorie: [number];
  content: {
    rendered: string;
  };
  short_content: string;
  average_rating: number;
  total_review: number;
  open_status: boolean;
  _embedded?: {
    'wp:featuredmedia': [{
      source_url: string
    }];
    'wp:term'?: WpTerm[][]; 
  }
  cmb2: {
    listinger_listing_metabox: {
      __listinger__location_Latitude: number;
      __listinger__location_Longitude: number;
      __listinger__company_logo: string;
      __listinger__price_status: string,
      __listinger__region: string;
      __listinger__contact_phone: string;
    }
  };
};

const fetcher = (url: string) => axios.get<Listing[]>(url).then(res => res.data);

export function useListings() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams();
  params.append('_embed', 'true');
  
  const searchTerm = searchParams.get('q');
  const regionSlug = searchParams.get('region');
  const category = searchParams.get('category');
  
  if (searchTerm) {
    params.append('search', searchTerm);
  }
  
  if (regionSlug) {
    params.append('regions', regionSlug);
  }

  if(category) {
    params.append('category', category);
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