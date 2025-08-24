import useSWR from 'swr';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

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

const haversineDistance = (
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const fetcher = (url: string) => axios.get<Listing[]>(url).then(res => res.data);

export function useListings() {
  const searchParams = useSearchParams();

  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const radius = searchParams.get('radius');
  const isNearMeActive = lat && lon && radius;

  const apiParams = new URLSearchParams(searchParams.toString());

  if (isNearMeActive) {
    apiParams.delete('region');
  }

  apiParams.delete('lat');
  apiParams.delete('lon');
  apiParams.delete('radius');
  
  apiParams.append('_embed', 'true');
  apiParams.append('per_page', '100');

  const apiKey = `${process.env.NEXT_PUBLIC_BACKEND_API_ROOT}listing?${apiParams.toString()}`;
  const { data: allListings, error, isLoading } = useSWR(apiKey, fetcher);

  const filteredListings = useMemo(() => {
    if (!isNearMeActive || !allListings) {
      return allListings;
    }
    
    const userLat = parseFloat(lat);
    const userLon = parseFloat(lon);
    const searchRadius = parseFloat(radius);

    return allListings.filter(listing => {
      const listingLat = listing.cmb2.listinger_listing_metabox.__listinger__location_Latitude;
      const listingLon = listing.cmb2.listinger_listing_metabox.__listinger__location_Longitude;

      if (listingLat && listingLon) {
        const distance = haversineDistance(userLat, userLon, listingLat, listingLon);
        return distance < searchRadius;
      }
      return false;
    });
  }, [allListings, searchParams, isNearMeActive]);
  
  return {
    listings: filteredListings,
    isLoading,
    isError: error,
  };
}