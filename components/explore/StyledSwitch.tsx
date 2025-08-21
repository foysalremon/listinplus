'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, type ElementType } from "react";

type SwitchProps = {
    name: string;
    label: string;
    icon?: ElementType;
};

const StyledSwitch: FC<SwitchProps> = ({ name, label, icon: Icon }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const isChecked = searchParams.get(name) === '1';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const params = new URLSearchParams(searchParams.toString());

        if (checked) {
            params.set(name, '1');
        } else {
            params.delete(name);
        }

        router.push(`/explore?${params.toString()}`, { scroll: false });
    };

    return (
        <label className="relative w-full cursor-pointer">
            <input
                id={`opt-${name}`}
                name={name}
                type="checkbox"
                className="sr-only peer"
                checked={isChecked}
                onChange={handleChange}
            />
            <div className="flex items-center cursor-pointer px-3 py-2 w-full h-full text-sm text-left text-gray-500 text-nowrap truncate rounded-md bg-gray-100 border-1 border-gray-300 transition peer-checked:border-primary-500 peer-checked:bg-primary-50">
                {Icon && <Icon className="w-4 h-4 me-3" />}
                <span className="font-medium text-gray-500 dark:text-gray-300">{label}</span>
            </div>
        </label>
    )
}

export default StyledSwitch