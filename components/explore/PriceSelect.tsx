'use client';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiDollarSign } from 'react-icons/fi';

const prices = ['Any Price', 'inexpensive', 'moderate', 'expensive'];

const PriceSelect = () => {
    const [price, setPrice] = useState('Any Price');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const price_status = searchParams.get('price_status');

        if (price_status) {
            setPrice(price_status);
        } else {
            setPrice('Any Price');
        }
    }, [price, searchParams]);

    const handleSelect = (price: string) => {
        setPrice(price);
        setIsDropdownOpen(false);

        const params = new URLSearchParams(window.location.search);
        if (price && price != 'Any Price') {
            params.set('price_status', price.toString());
        } else {
            params.delete('price_status');
        }

        const queryString = params.toString();
        const url = queryString ? `/explore?${queryString}` : '/explore';
        router.push(url, { scroll: false });
    };

    return (
        <div className="relative group flex-1 min-w-0">
            <div className="text-gray-500 group-focus-within:text-primary-500 absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none transition">
                <FiDollarSign />
            </div>
            <button
                type="button"
                className="cursor-pointer ps-9 pe-5 py-2 w-full text-sm text-left text-gray-500 rounded-md bg-gray-100 border-1 border-gray-300 transition focus:border-primary-500 focus:outline-none focus:bg-primary-50"
                onClick={() => setIsDropdownOpen(true)}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => {
                    setTimeout(() => {
                        setIsDropdownOpen(false);
                    }, 150);
                }}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
            >
                <span className="text-nowrap truncate capitalize block">{price}</span>
                <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
                    <FiChevronDown className={clsx("w-4 h-4 text-gray-500 transition-transform", { "rotate-180": isDropdownOpen })} />
                </span>
            </button>
            <div className={clsx('absolute top-full left-0 right-0 z-20 pt-1 transition-all duration-300 ease-in-out', {
                'opacity-100 visible': isDropdownOpen,
                'opacity-0 invisible': !isDropdownOpen
            })}>
                <ul className="top-full left-0 right-0 bg-white shadow-xs inset-shadow-2xs shadow-gray-400/50 rounded-md z-20">
                    {prices.map((price, index) => (
                        <li
                            key={`price-${index}`}
                            onClick={() => handleSelect(price)}
                            className={clsx(
                                'px-5 text-sm/8 text-gray-500 hover:text-primary-500 cursor-pointer whitespace-nowrap truncate capitalize',
                                {
                                    'border-b border-gray-100': index < prices.length - 1
                                }
                            )}
                            dangerouslySetInnerHTML={{ __html: price }}
                        ></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PriceSelect