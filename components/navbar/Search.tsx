'use client';
import { useRegions, type Region } from '@/hooks/useRegions';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, FormEvent, useEffect, useMemo, useRef } from 'react';
import { FiSearch } from "react-icons/fi";
import { TextLineSkeleton } from '../ui/Skeleton';
import { RiCrosshair2Line } from 'react-icons/ri';

const Search = () => {
    const { regions, isLoading, isError } = useRegions();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState<Region>({ name: 'Any location', slug: '', id: 0 });
    const [locationInput, setLocationInput] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const regionInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!regions) return;

        const qParam = searchParams.get('q');
        const regionSlugParam = searchParams.get('region');

        if (qParam) {
            setSearchTerm(qParam);
        }

        if (regionSlugParam) {
            const foundRegion = regions.find(r => r.slug === regionSlugParam);
            if (foundRegion) {
                setSelectedRegion(foundRegion);
            }
        }
    }, [regions, searchParams]);

    useEffect(() => {
        if (isDropdownOpen && regionInputRef.current) {
            regionInputRef.current.focus();
        }
    }, [isDropdownOpen]);

    const filteredRegions = useMemo(() => {
        if (!regions) return [];
        if (!locationInput) return regions;

        return regions.filter(region =>
            region.name.toLowerCase().includes(locationInput.toLowerCase())
        );
    }, [regions, locationInput]);

    const handleRegionSelect = (region: Region) => {
        setSelectedRegion(region);
        setLocationInput('');
        setIsDropdownOpen(false);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchTerm) {
            params.set('q', searchTerm);
        }

        if (selectedRegion && selectedRegion.slug) {
            params.append('region', selectedRegion.slug);
        }

        const queryString = params.toString();
        const url = queryString ? `/explore?${queryString}` : '/explore';
        router.push(url);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-1 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex relative items-center w-full max-w-xl rounded-lg border-2 border-gray-300 transition focus-within:border-primary">
                <input
                    type="search"
                    name="keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-s-md autofill:bg-white block px-5 py-2.5 w-full max-w-[55%] text-sm text-gray-900 focus:ring-none border-none outline-none dark:placeholder-gray-400 dark:text-white"
                    placeholder="What are you looking for ?"
                />
                <span className="block w-[2px] h-[60%] bg-gray-300"></span>
                <div className="relative w-[calc(45%-1px)] max-w-[45%]">
                    <div className="text-gray-400 group-focus-within:text-primary-500 absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none transition">
                        <RiCrosshair2Line />
                    </div>
                    {isDropdownOpen ? (
                        <input
                            ref={regionInputRef}
                            type="text"
                            name="locationInput"
                            className="ps-9 pe-12 py-2.5 w-full text-sm text-gray-900 focus:ring-none border-none outline-none dark:placeholder-gray-400 dark:text-white"
                            placeholder=""
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            autoComplete="off"
                            onBlur={() => {
                                setTimeout(() => {
                                    setIsDropdownOpen(false);
                                }, 150);
                            }}
                        />
                    ) : (
                        <button
                            type="button"
                            className="cursor-pointer ps-9 pe-12 py-2.5 w-full text-sm text-left text-gray-500 rounded-md"
                            onClick={() => {
                                setIsDropdownOpen(true);
                                setLocationInput('');
                            }}
                            aria-haspopup="listbox"
                            aria-expanded={isDropdownOpen}
                        >
                            <span className="text-nowrap truncate" dangerouslySetInnerHTML={{ __html: selectedRegion.name }}></span>
                        </button>
                    )}
                    <div className={clsx('absolute top-full left-0 right-0 z-10 pt-4 transition-all duration-300 ease-in-out', {
                        'opacity-100 visible': isDropdownOpen,
                        'opacity-0 invisible': !isDropdownOpen
                    })}>
                        <ul className="top-full left-0 right-0 bg-white shadow-lg inset-shadow-2xs shadow-gray-400/50 rounded-md z-20 max-h-60 overflow-y-auto">
                            {isLoading ? (
                                <>
                                    <TextLineSkeleton className="border-b border-gray-100" />
                                    <TextLineSkeleton className="border-b border-gray-100" />
                                    <TextLineSkeleton className="border-b border-gray-100" />
                                    <TextLineSkeleton className="border-b border-gray-100" />
                                    <TextLineSkeleton />
                                </>
                            ) : isError ? (
                                <li className={clsx(
                                    'px-5 text-sm/8 text-gray-500 hover:text-primary-500 cursor-pointer whitespace-nowrap truncate'
                                )}
                                >
                                    Could not load regions.
                                </li>
                            ) : filteredRegions.length > 0 ? (
                                <>
                                    <li
                                        key={`region-0`}
                                        onClick={() => handleRegionSelect({ name: 'Any location', slug: '', id: 0 })}
                                        className="px-5 text-sm/8 text-gray-500 border-b border-gray-100 hover:text-primary-500 cursor-pointer whitespace-nowrap truncate"
                                    >Any location</li>
                                    {filteredRegions.map((region, index) => (
                                        <li
                                            key={`region-${region.id}`}
                                            onClick={() => handleRegionSelect(region)}
                                            className={clsx(
                                                'px-5 text-sm/8 text-gray-500 hover:text-primary-500 cursor-pointer whitespace-nowrap truncate',
                                                {
                                                    'border-b border-gray-100': index < filteredRegions.length - 1
                                                }
                                            )}
                                        >
                                            {region.name}
                                        </li>
                                    ))}
                                </>
                            ) : (
                                <li className={clsx(
                                    'px-5 text-sm/8 text-gray-500 hover:text-primary-500 cursor-pointer whitespace-nowrap truncate'
                                )}
                                >
                                    No regions found
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <button type="submit" className="absolute top-[1px] end-[1px] px-3 h-[38px] text-md text-white bg-primary-500 rounded-md hover:bg-primary-dark cursor-pointer">
                    <FiSearch />
                </button>
            </div>
        </form>

    )
}

export default Search;