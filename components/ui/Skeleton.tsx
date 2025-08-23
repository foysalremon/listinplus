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

export const ListingCardSkeleton: FC<SkeletonProps> = ({ className }) => {
    return (
        <div className={clsx('animate-pulse', className)}>
            <div className="relative">
                <div className="block relative aspect-[300/170] bg-gray-200 rounded-t-xl"></div>
                <div className="rounded-full absolute bottom-4 left-4 bg-gray-300 w-12 h-12"></div>
                <div className="absolute bottom-4 right-4 flex items-end h-5 w-20 bg-gray-300 rounded-md"></div>
            </div>
            <div className="px-5 pt-4 border-1 border-t-0  border-gray-200 rounded-b-xl bg-white">
                <div className="mt-1 mb-2 bg-gray-300 h-5 w-2/3 rounded-md"></div>
                <div className="bg-gray-200 w-full h-4 rounded-sm"></div>
                <div className="flex gap-5 mt-5.5">
                    <span className="w-24 h-4 bg-gray-200 rounded-sm"></span>
                    <span className="w-24 h-4 bg-gray-200 rounded-sm"></span>
                </div>
                <div className="flex justify-between border-t-1 border-gray-200 mt-5 py-2 items-center">
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