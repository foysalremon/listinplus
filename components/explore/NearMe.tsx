'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";

const NearMe = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State to manage user location
    const [isLocating, setIsLocating] = useState(false);
    const [locationError, setLocationError] = useState('');
    const [radius, setRadius] = useState(searchParams.get('radius') || '5');

    // Determine if the filter is active based on URL params
    const isChecked = searchParams.has('lat') && searchParams.has('lon');

    const handleNearMeToggle = () => {
        const params = new URLSearchParams(searchParams.toString());

        if (isChecked) {
            params.delete('lat');
            params.delete('lon');
            params.delete('radius');
            const queryString = params.toString();
            const url = queryString ? `/explore?${queryString}` : '/explore';
            router.push(url, { scroll: false });
        } else {
            setIsLocating(true);
            setLocationError('');
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    params.set('lat', position.coords.latitude.toString());
                    params.set('lon', position.coords.longitude.toString());
                    params.set('radius', radius);
                    params.delete('region');
                    router.push(`/explore?${params.toString()}`, { scroll: false });
                    setIsLocating(false);
                },
                (error) => {
                    setLocationError(error.message.replaceAll('User', 'You'));
                    setIsLocating(false);
                }
            );
        }
    };

    const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRadius = e.target.value;
        setRadius(newRadius);
        // If the filter is already active, update the radius in the URL
        if (isChecked) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('radius', newRadius);
            router.push(`/explore?${params.toString()}`, { scroll: false });
        }
    };

    // Sync radius input with URL on page load/navigation
    useEffect(() => {
        setRadius(searchParams.get('radius') || '5');
    }, [searchParams]);

    return (
        <div className="relative flex-1 min-w-0">
            <label className="relative w-full cursor-pointer">
                <input
                    id={`opt-near-me`}
                    name='near_me'
                    type="checkbox"
                    className="sr-only peer"
                    checked={isChecked}
                    onChange={handleNearMeToggle}
                    disabled={isLocating}
                />
                <div className="flex items-center cursor-pointer px-3 py-2 w-full h-full text-sm text-left text-gray-500 text-nowrap truncate rounded-md bg-gray-100 border-1 border-gray-300 transition peer-checked:border-primary-500 peer-checked:bg-primary-50">
                    <FiMapPin className="w-4 h-4 me-3" />
                    <span className="font-medium text-gray-500 dark:text-gray-300">Near Me</span>
                </div>
                {isChecked && (
                    <div className="absolute pt-2 top-full left-0 min-w-80 opacity-0 invisible transition peer-hover:opacity-100 peer-hover:visible">
                        <div className="relative p-4 bg-white shadow-lg shadow-gray-400/50 rounded-md border-1 border-gray-200">
                            <label htmlFor="radius-range" className="block text-sm font-semibold font-cabin text-gray-700 dark:text-white">Radius: {radius}km</label>
                            <input id="radius-range" type="range" min="0" max="100" value={radius} step="5" className="w-full h-2 bg-gray-300 text-primary-500 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 range-primary" onChange={handleRadiusChange} />
                        </div>
                    </div>
                )}
            </label>
            {locationError && <p className="absolute text-red-500 text-xs">{locationError}</p>}
        </div>
    )
}

export default NearMe