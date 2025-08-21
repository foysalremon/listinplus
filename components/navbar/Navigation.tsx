import Link from "next/link";
import { FiChevronDown, FiPlus } from "react-icons/fi";

const MENU_ITEMS = [
    {
        label: "Home",
        url: "/",
    },
    {
        label: "Explore",
        url: "/explore",
    },
    {
        label: "News",
        url: "/news",
    },
    {
        label: "Pages",
        url: "",
        SUBMENU_ITEMS: [
            {
                label: "How It Works",
                url: "/how-it-works",
            },
            {
                label: "Price Plan",
                url: "/pricing",
            },
            {
                label: "FAQ",
                url: "/faq",
            },
            {
                label: "About Us",
                url: "/about-us",
            },
            {
                label: "Contact Us",
                url: "/contact-us",
            },
            {
                label: "Terms & Conditions",
                url: "/terms-and-conditions",
            },
        ],
    },
];

const Navigation = () => {
    return (
        <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-3"
            id="navbar-sticky"
        >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {MENU_ITEMS.map((menu_item, index) => (
                    menu_item.SUBMENU_ITEMS ? (
                        <li key={`menu-item-${index}`} className="relative group inline-block">
                            <button
                                type="button"
                                className="cursor-pointer text-sm/6 inline-block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-500 md:p-5 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition whitespace-nowrap"
                            >
                                <span className="inline-block align-middle leading-none">{menu_item.label}</span>
                                {menu_item.SUBMENU_ITEMS && <FiChevronDown className="w-4 h-4 inline-block align-middle -mr-1 transition-transform group-hover:rotate-180" />}
                            </button>
                            {menu_item.SUBMENU_ITEMS && (
                                <div className="
                                absolute top-full right-0 z-10 pt-1
                                transition-all duration-300 ease-in-out
                                transform opacity-0 invisible 
                                group-hover:opacity-100 group-hover:visible
                            ">
                                    <ul className="
                                    min-w-[170px] 
                                    bg-white shadow-xs inset-shadow-2xs shadow-gray-400/50 
                                    px-6 py-3 rounded-md
                                ">
                                        {menu_item.SUBMENU_ITEMS.map((submenu_item, index2) => (
                                            <li key={`submenu-item-${index2}`}>
                                                <Link
                                                    href={submenu_item.url}
                                                    className="text-sm/8 block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-500 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition whitespace-nowrap"
                                                >
                                                    {submenu_item.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ) : (
                        <li key={`menu-item-${index}`} className="relative group inline-block">
                            <Link
                                href={menu_item.url}
                                className="text-sm/6 inline-block py-2 px-3 text-gray-500 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-500 md:p-5 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 transition whitespace-nowrap"
                            >
                                <span className="inline-block align-middle leading-none">{menu_item.label}</span>
                            </Link>
                        </li>
                    )
                ))}
            </ul>
            <button
                type="button"
                className="text-white transition cursor-pointer bg-primary-500 hover:bg-primary-dark focus:ring-none focus:outline-none font-medium rounded-md text-sm px-8 py-3 text-center ml-4"
            >
                <FiPlus className="w-4 h-4 inline-block align-middle -ml-1 mr-1" />
                <span className="inline-block align-middle">Add Listing</span>
            </button>
            {/* TODO: Menu Toggle for mobile */}
        </div>
    );
};

export default Navigation;
