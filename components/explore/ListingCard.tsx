import { Listing } from "@/hooks/useListings";
import { type FC, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import PriceStatus from "./PriceStatus";
import { FiMapPin, FiPhone } from "react-icons/fi";
import CategoryWIcon from "./CategoryWIcon";
import { ListingCardSkeleton } from "../ui/Skeleton";
import clsx from "clsx";

type ListingCardProps = {
    listing: Listing;
    view: string;
    index: number
};

const ListingCard: FC<ListingCardProps> = ({ listing, view, index }) => {
    const thumb = listing._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const logo = listing.cmb2?.listinger_listing_metabox?.__listinger__company_logo;
    const category = listing._embedded?.['wp:term']?.find(term => term[0].taxonomy == 'categorie')?.[0];

    return (
        <div className={clsx('px-3 pb-6', { 'basis-1/2': view == 'grid', 'w-full': view == 'list' })}>
            <Suspense fallback={<ListingCardSkeleton />}>
                <div className={clsx({ 'flex items-stretch': view == 'list' })}>
                    <div className={clsx('relative', { 'min-w-87': view == 'list' })}>
                        {thumb && (
                            <Link className="block relative aspect-[300/170]" href={`listing/${listing.slug}`}>
                                <Image
                                    className={clsx({ 'rounded-t-xl': view != 'list', 'rounded-s-xl': view == 'list' })}
                                    src={thumb}
                                    alt={listing.title.rendered}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    priority={index < 4}
                                    //TOTO: Responsive optimization, handle no image
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 348vw"
                                />
                                <span className={clsx('absolute inset-0 bg-gradient-to-t from-black/70 to-transparent', { 'rounded-s-xl': view == 'list' })}></span>
                            </Link>
                        )}
                        {logo && (
                            <Image
                                className="rounded-full absolute bottom-4 left-4 border-2 border-gray-800"
                                src={logo}
                                alt="Company Logo"
                                width={48}
                                height={48}
                                quality={100}
                            />
                        )}
                        <div className="absolute bottom-4 right-4 flex items-end">
                            <PriceStatus className="me-5" price={listing.cmb2?.listinger_listing_metabox?.__listinger__price_status} />
                            <span className="inline-block text-white leading-[14px]">{listing.average_rating}</span>
                            <span className="ms-0.5 inline-block text-white text-xs leading-[14px]">({listing.total_review})</span>
                        </div>
                    </div>
                    <div
                        className={clsx('w-full px-5 pt-4 border-1 border-gray-200 bg-white', {
                            'border-t-0 rounded-b-xl': view != 'list',
                            'border-s-0 rounded-e-xl flex flex-col': view == 'list'
                        })}
                    >
                        <h3 className="mb-0.5 font-cabin font-medium text-lg text-gray-800 transition hover:text-primary-500">
                            <Link
                                href={`listing/${listing.slug}`}
                                dangerouslySetInnerHTML={{ __html: listing.title.rendered }}
                            />
                        </h3>
                        {/* TODO: Short Content from WP end */}
                        <p className="text-gray-500 text-sm" dangerouslySetInnerHTML={{ __html: listing.short_content }} />
                        <div className="flex gap-5">
                            {listing.cmb2?.listinger_listing_metabox?.__listinger__region &&
                                <span className="flex items-center gap-1 text-sm text-gray-500 mt-4">
                                    <FiMapPin />
                                    <span>{listing.cmb2.listinger_listing_metabox.__listinger__region}</span>
                                </span>
                            }
                            {listing.cmb2?.listinger_listing_metabox?.__listinger__contact_phone &&
                                <span className="flex items-center gap-1 text-sm text-gray-500 mt-4">
                                    <FiPhone />
                                    <span>{listing.cmb2.listinger_listing_metabox.__listinger__contact_phone}</span>
                                </span>
                            }
                        </div>
                        <div className={clsx('flex justify-between border-t-1 border-gray-200 mt-5 py-2 items-center', { 'justify-self-end mt-auto': view == 'list' })}>
                            {category && <CategoryWIcon category={category} />}
                            {listing.open_status ? <span className="bg-green-100 text-sm text-gray-500 border-1 border-green-200 rounded-sm px-2">Open</span> : <span className="bg-red-100 text-sm text-gray-500 border-1 border-red-200 rounded-sm px-2">Close</span>}
                        </div>
                    </div>
                </div>
            </Suspense>
        </div>
    )
}

export default ListingCard;