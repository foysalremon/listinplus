import clsx from "clsx";
import { type FC } from "react";
import { FiDollarSign } from "react-icons/fi";

type PriceStatusProps = {
    price?: string;
    className?: string;
};

const PriceStatus: FC<PriceStatusProps> = ({ price, className }) => {
    return (
        <div className={clsx('leading-1', className)}>
            <FiDollarSign className={clsx('-mx-0.5 inline-block text-gray-400', {
                'text-white': price == 'expensive'
            })} />
            <FiDollarSign className={clsx('-mx-0.5 inline-block text-gray-400', {
                'text-white': price == 'expensive' || price == 'moderate'
            })} />
            <FiDollarSign className={clsx('-mx-0.5 inline-block text-gray-400', {
                'text-white': price == 'expensive' || price == 'moderate' || price == 'inexpensive'
            })} />
            <FiDollarSign className="-mx-0.5 inline-block text-white" />
        </div>
    )
}

export default PriceStatus