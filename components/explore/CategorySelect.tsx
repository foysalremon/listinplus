"use client";
import { useCategories, type Category } from "@/hooks/useCategories";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { FiList } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeHtml } from "@/utils/helper";
import { TextLineSkeleton } from "../ui/Skeleton";

const CategorySelect = () => {
    const { categories, isLoading, isError } = useCategories();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState({ name: "All Category", slug: '', id: 0 });
    const [categoryInput, setCategoryInput] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!categories) return;

        const categorySlugParam = searchParams.get("category");

        if (categorySlugParam) {
            const foundCategory = categories.find(
                (r) => r.slug === categorySlugParam
            );
            if (foundCategory) {
                setCategoryInput(decodeHtml(foundCategory.name));
            }
        }
    }, [categories, searchParams]);

    useEffect(() => {
        if (isDropdownOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isDropdownOpen]);

    const filteredCategories = useMemo(() => {
        if (!categories) return [];
        if (!categoryInput) return categories;

        return categories.filter((category) =>
            category.name.toLowerCase().includes(categoryInput.toLowerCase())
        );
    }, [categories, categoryInput]);

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);

        const params = new URLSearchParams(window.location.search);
        if (category && category.slug != "") {
            params.set("category", category.slug);
        } else {
            params.delete("category");
        }

        router.push(`/explore?${params.toString()}`);
    };

    return (
        <div
            className="relative group w-full min-w-40"
        >
            <div className="text-gray-500 group-focus-within:text-primary-500 absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none transition">
                <FiList />
            </div>
            {isDropdownOpen ? (
                <input
                    ref={inputRef}
                    type="text"
                    name="categoryInput"
                    className="h-full ps-9 pe-4 py-2 w-full text-sm text-gray-500 placeholder:text-gray-500 rounded-md bg-gray-100 border-1 border-gray-300 transition focus:border-primary-500 focus:outline-none focus:bg-primary-50"
                    placeholder=""
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    autoComplete="off"
                    onBlur={() => {
                        setTimeout(() => {
                            setIsDropdownOpen(false);
                        }, 150);
                    }}
                />
            ) : (
                <button
                    type="button"
                    className="cursor-pointer px-9 py-2 w-full text-sm text-left text-gray-500 rounded-md bg-gray-100 border-1 border-gray-300 transition focus:border-primary-500 focus:outline-none focus:bg-primary-50"
                    onClick={() => {
                        setIsDropdownOpen(true);
                        setCategoryInput('');
                    }}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                >
                    <span className="text-nowrap truncate" dangerouslySetInnerHTML={{ __html: selectedCategory.name }}></span>
                </button>
            )}
            <div
                className={clsx(
                    "absolute top-full left-0 right-0 z-10 pt-1 transition-all duration-300 ease-in-out",
                    {
                        "opacity-100 visible": isDropdownOpen,
                        "opacity-0 invisible": !isDropdownOpen,
                    }
                )}
            >
                <ul className="top-full left-0 right-0 bg-white shadow-xs inset-shadow-2xs shadow-gray-400/50 rounded-md z-20 max-h-60 overflow-y-auto">
                    {isLoading ? (
                        <>
                            <TextLineSkeleton className="border-b border-gray-100" />
                            <TextLineSkeleton className="border-b border-gray-100" />
                            <TextLineSkeleton className="border-b border-gray-100" />
                            <TextLineSkeleton className="border-b border-gray-100" />
                            <TextLineSkeleton />
                        </>
                    ) : isError ? (
                        <li
                            className={clsx(
                                "px-5 text-sm/8 text-gray-500 hover:text-primary-500 cursor-pointer text-nowrap truncate"
                            )}
                        >
                            Could not load categories.
                        </li>
                    ) : (
                        <>
                            <li
                                onClick={() =>
                                    handleCategorySelect({ name: "All Category", slug: "", id: 0 })
                                }
                                className={clsx(
                                    "px-5 text-sm/8 text-gray-500 hover:text-primary-500 cursor-pointer whitespace-nowrap truncate border-b border-gray-100 text-nowrap truncate"
                                )}
                                dangerouslySetInnerHTML={{ __html: "All Categories" }}
                            ></li>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category, index) => (
                                    <li
                                        key={`category-${category.id}`}
                                        onClick={() => handleCategorySelect(category)}
                                        className={clsx(
                                            "px-5 text-sm/8 text-gray-500 hover:text-primary-500 cursor-pointer text-nowrap truncate",
                                            {
                                                "border-b border-gray-100":
                                                    index < filteredCategories.length - 1,
                                            }
                                        )}
                                        dangerouslySetInnerHTML={{ __html: category.name }}
                                    ></li>
                                ))
                            ) : (
                                <li
                                    className={clsx(
                                        "px-5 text-sm/8 text-gray-500 hover:text-primary-500 cursor-pointer text-nowrap truncate"
                                    )}
                                >
                                    No category found
                                </li>
                            )}
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CategorySelect;
