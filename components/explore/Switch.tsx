'use client';
import { type FC } from "react";
import { FiCheck } from "react-icons/fi";

type SwitchProps = {
    feature: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Switch: FC<SwitchProps> = ({ feature, checked, onChange }) => {
    return (
        <div className="w-1/3">
            <label className="w-max flex items-center cursor-pointer">
                <input
                    id={`opt-${feature}`}
                    name="feature"
                    value={feature}
                    type="checkbox"
                    className="sr-only peer"
                    checked={checked}
                    onChange={onChange}
                />
                <div className="bg-gray-100 rounded-sm border-1 border-gray-300 text-transparent transition peer-checked:bg-primary-500 peer-checked:border-primary-500 peer-checked:text-white"><FiCheck className="w-4 h-4" /></div>
                <span className="ms-2 text-sm/8 font-medium text-gray-900 dark:text-gray-300">{feature}</span>
            </label>
        </div>
    )
}

export default Switch