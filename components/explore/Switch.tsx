'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { type FC } from "react";
import { FiCheck } from "react-icons/fi";

type SwitchProps = {
    name: string;
    label: string;
};

const Switch: FC<SwitchProps> = ({ name, label }) => {
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
        <div className="w-1/3">
            <label className="w-max flex items-center cursor-pointer">
                <input
                    id={`opt-${name}`}
                    name={name}
                    type="checkbox"
                    className="sr-only peer"
                    checked={isChecked}
                    onChange={handleChange}
                />
                <div className="bg-gray-100 rounded-sm border-1 border-gray-300 text-transparent transition peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-checked:text-white"><FiCheck className="w-4 h-4" /></div>
                <span className="ms-2 text-sm/8 font-medium text-gray-900 dark:text-gray-300">{label}</span>
            </label>
        </div>
    )
}

export default Switch