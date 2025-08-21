import { type FC } from "react";
import CategorySelect from "./CategorySelect";
import PriceSelect from "./PriceSelect";
import Switch from "./Switch";
import StyledSwitch from "./StyledSwitch";
import { FiMapPin, FiShuffle } from "react-icons/fi";
import ResetButton from "./ResetButton";

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
            <div className="flex flex-row gap-2">
                <CategorySelect />
                <StyledSwitch name="best_match" label="Best Match" icon={FiShuffle} />
                <PriceSelect />
                <StyledSwitch name="near_me" label="Near Me" icon={FiMapPin} />
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
