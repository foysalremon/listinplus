import clsx from 'clsx';
import { type FC } from 'react';
import { FiMapPin } from 'react-icons/fi';

type SkeletonProps = {
    className?: string;
};

export const TextLineSkeleton: FC<SkeletonProps> = ({ className }) => {
    return (
        <li className={clsx('px-5 py-2', className)}>
            <div className="animate-pulse h-4 bg-gray-200 rounded-md w-full"></div>
        </li>
    );
};

type ListingCardSkeletonProps = {
    className?: string;
    view?: string;
};
export const ListingCardSkeleton: FC<ListingCardSkeletonProps> = ({ className, view }) => {
    return (
        <div className={clsx('animate-pulse', className, { 'flex items-stretch': view == 'list' })}>
            <div className={clsx('relative', { 'min-w-87': view == 'list' })}>
                <div className={clsx('relative aspect-[300/170] bg-gray-200', { 'block rounded-t-xl': view != 'list', 'rounded-s-xl': view == 'list' })}></div>
                <div className="rounded-full absolute bottom-4 left-4 bg-gray-300 w-12 h-12"></div>
                <div className="absolute bottom-4 right-4 flex items-end h-5 w-20 bg-gray-300 rounded-md"></div>
            </div>
            <div className={clsx('w-full px-5 pt-4 border-1 border-gray-200 bg-white', {
                'border-t-0 rounded-b-xl': view != 'list',
                'border-s-0 rounded-e-xl flex flex-col': view == 'list'
            })}>
                <div className="mt-1 mb-2 bg-gray-300 h-5 w-2/3 rounded-md"></div>
                <div className="bg-gray-200 w-full h-4 rounded-sm"></div>
                <div className="flex gap-5 mt-5.5">
                    <span className="w-24 h-4 bg-gray-200 rounded-sm"></span>
                    <span className="w-24 h-4 bg-gray-200 rounded-sm"></span>
                </div>
                <div className={clsx('flex justify-between border-t-1 border-gray-200 mt-5 py-2 items-center', { 'justify-self-end mt-auto': view == 'list' })}>
                    <div className="flex items-center gap-2">
                        <div className="text-white text-sm p-2.5 rounded-full bg-gray-300"><FiMapPin /></div>
                        <span className="bg-gray-200 h-4 w-20 rounded-sm"></span>
                    </div>
                    <span className="bg-gray-200 h-4 w-13 rounded-sm"></span>
                </div>
            </div>
        </div>
    )
}


export const ListingListSkeleton: FC<ListingCardSkeletonProps> = ({ className, view }) => {
    return (
        <div
            className={clsx("flex flex-wrap items-stretch -mx-3", className, {
                "flex-row": view == "grid",
                "flex-col": view == "list",
            })}
        >
            <div className={clsx('px-3 pb-6', { 'basis-1/2': view == 'grid', 'w-full': view == 'list' })}>
                <ListingCardSkeleton view={view} />
            </div>
            <div className={clsx('px-3 pb-6', { 'basis-1/2': view == 'grid', 'w-full': view == 'list' })}>
                <ListingCardSkeleton view={view} />
            </div>
            <div className={clsx('px-3 pb-6', { 'basis-1/2': view == 'grid', 'w-full': view == 'list' })}>
                <ListingCardSkeleton view={view} />
            </div>
            <div className={clsx('px-3 pb-6', { 'basis-1/2': view == 'grid', 'w-full': view == 'list' })}>
                <ListingCardSkeleton view={view} />
            </div>
        </div>
    )
}