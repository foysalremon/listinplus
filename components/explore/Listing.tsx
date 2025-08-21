import { type FC, Suspense, useState } from "react";
import { useListings } from '@/hooks/useListings';
import { FiGrid, FiList } from "react-icons/fi";
import clsx from "clsx";

type ListingProps = {
    className: string;
};

const Listing: FC<ListingProps> = ({ className }) => {
    const { listings, isLoading, isError } = useListings();
    const [view, setView] = useState('grid');

    return (
        <div className={className}>
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl text-gray-500">
                    {isLoading ? 'Listing loading for given query' : isError ? 'Failed to load listings' : !listings || listings.length === 0 ? 'No listings found for given query' : `${listings.length} listing for given query`}
                </h3>
                <div className={clsx('flex gap-1 invisible', { 'visible': isLoading || (listings && listings.length) })}>
                    <button
                        type="button"
                        className={clsx('cursor-pointer p-2 bg-gray-300 text-gray-700 rounded transition', {
                            'text-primary-500 bg-primary-100': view == 'grid'
                        })}
                        onClick={() => setView('grid')}
                    ><FiGrid className="text-xl" /></button>
                    <button
                        type="button"
                        className={clsx('cursor-pointer p-2 bg-gray-300 text-gray-700 rounded transition', {
                            'text-primary-500 bg-primary-100': view == 'list'
                        })}
                        onClick={() => setView('list')}
                    ><FiList className="text-xl" /></button>
                </div>
            </div>
            {listings && listings.length > 0 &&
                listings.map(listing => (
                    <Suspense key={listing.id} fallback={<div>Loading...</div>}>
                        <div className="border rounded-lg p-4">
                            <h3
                                className="font-bold"
                                dangerouslySetInnerHTML={{ __html: listing.title.rendered }}
                            />
                            {/* ... display other listing info ... */}
                        </div>
                    </Suspense>
                ))
            }
        </div>
    );
}

export default Listing;