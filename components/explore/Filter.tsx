import { type FC } from "react";
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

const SWITCH_OPTIONS = [
    {
        label: "Accept Credit Cards",
        name: "credit_card",
    },
    {
        label: "Parking",
        name: "parking",
    },
    {
        label: "Reservation",
        name: "reservation",
    },
    { name: "wifi", label: "Free WiFi" },
    {
        label: "Pen Friendly",
        name: "pet_friendly",
    },
    {
        label: "Music",
        name: "music",
    },
    {
        label: "Home Delivery",
        name: "home_delivery",
    },
];

const Filter: FC<FilterProps> = ({ className }) => {
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
                {SWITCH_OPTIONS.map((opt, index) => (
                    <Switch key={`opt-${index}`} name={opt.name} label={opt.label} />
                ))}
            </div>
        </div>
    );
};

export default Filter;
