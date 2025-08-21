import clsx from 'clsx';
import type { FC } from 'react';

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