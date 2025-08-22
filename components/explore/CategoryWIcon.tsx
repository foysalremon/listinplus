import clsx from "clsx";
import { type FC } from "react";
import { BiCar } from "react-icons/bi";
import { FiCoffee, FiMapPin, FiShoppingBag } from "react-icons/fi";
import { IoBedOutline } from "react-icons/io5";
import { LuBuilding2 } from "react-icons/lu";
import { SlUserFemale } from "react-icons/sl";
import { TbBowlSpoon } from "react-icons/tb";

type CategoryWIconProps = {
    category: {
        id: number;
        name: string;
        slug: string;
        taxonomy: string;
    }
};

const CategoryWIcon: FC<CategoryWIconProps> = ({ category }) => {

    const getIcon = (slug: string) => {
        const className = 'text-white text-sm p-2.5 rounded-full';

        switch (slug) {
            case 'cafe-bar':
                return <span className={clsx(className, 'bg-yellow-500')}><FiCoffee /></span>
            case 'beautyspa':
                return <span className={clsx(className, 'bg-green-500')}><SlUserFemale /></span>
            case 'automotive':
                return <span className={clsx(className, 'bg-sky-500')}><BiCar /></span>
            case 'hotel':
                return <span className={clsx(className, 'bg-fuchsia-500')}><IoBedOutline /></span>
            case 'real-estate':
                return <span className={clsx(className, 'bg-indigo-500')}><LuBuilding2 /></span>
            case 'restaurant':
                return <span className={clsx(className, 'bg-red-400')}><TbBowlSpoon /></span>
            case 'shopping':
                return <span className={clsx(className, 'bg-cyan-400')}><FiShoppingBag /></span>
            default:
                return <span className={clsx(className, 'bg-gray-500')}><FiMapPin /></span>
        }
    }
    return (
        <div className="flex items-center gap-2">
            {getIcon(category.slug)}
            <span className="text-gray-500 text-sm" dangerouslySetInnerHTML={{ __html: category.name }} />
        </div>
    )
}

export default CategoryWIcon