'use client';
import { useEffect, useState, type FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CategorySelect from "./CategorySelect";
import PriceSelect from "./PriceSelect";
import Switch from "./Switch";
import StyledSwitch from "./StyledSwitch";
import { FiShuffle } from "react-icons/fi";
import ResetButton from "./ResetButton";
import NearMe from "./NearMe";

type FilterProps = {
    className: string;
};

const FEATURES = [
    "Accept Credit Cards",
    "Bike Parking",
    "Reservation",
    "Pet Friendly",
    "Fashion",
    "Music",
    "Accessories",
    "Home Delivery",
];

const Filter: FC<FilterProps> = ({ className }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);


    useEffect(() => {
        const featuresParam = searchParams.get('features');
        setSelectedFeatures(featuresParam ? featuresParam.split(',') : []);
    }, [searchParams]);

    const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const value = e.target.value;

        const newSelectedFeatures = checked
            ? [...selectedFeatures, value]
            : selectedFeatures.filter(slug => slug !== value);

        setSelectedFeatures(newSelectedFeatures);

        const params = new URLSearchParams(searchParams.toString());
        if (newSelectedFeatures.length > 0) {
            params.set('features', newSelectedFeatures.join(','));
        } else {
            params.delete('features');
        }

        const queryString = params.toString();
        const url = queryString ? `/explore?${queryString}` : '/explore';
        router.push(url, { scroll: false });
    };

    return (
        <div className={className}>
            <div className="flex flex-wrap gap-2">
                <CategorySelect />
                <StyledSwitch name="best_rated" label="Best Rated" icon={FiShuffle} />
                <PriceSelect />
                <NearMe />
                <ResetButton />
            </div>
            <div className="flex flex-wrap mt-6">
                {FEATURES.map((feature, index) => (
                    <Switch key={`opt-${index}`} feature={feature} checked={selectedFeatures.includes(feature)} onChange={handleFeaturesChange} />
                ))}
            </div>
        </div>
    );
};

export default Filter;
