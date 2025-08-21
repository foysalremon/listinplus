'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineFilterListOff } from "react-icons/md";

const ResetButton = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleReset = () => {
        const qParam = searchParams.get('q');
        const regionParam = searchParams.get('region');

        const params = new URLSearchParams();

        if (qParam) {
            params.set('q', qParam);
        }
        if (regionParam) {
            params.set('region', regionParam);
        }

        router.push(`/explore?${params.toString()}`, { scroll: false });
    };

    return (
        <button
            type="button"
            onClick={handleReset}
            className="relative flex items-center cursor-pointer px-3 py-2 w-full text-sm text-left text-gray-500 rounded-md bg-gray-100 border-1 border-gray-300 transition peer-checked:border-primary-500 peer-checked:bg-primary-50"
        >
            <MdOutlineFilterListOff className="w-4 h-4 me-3" />
            <span className="font-medium text-gray-500 dark:text-gray-300">Reset Filter</span>
        </button>
    )
}

export default ResetButton