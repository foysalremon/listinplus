import Filter from "@/components/explore/Filter";
import Listing from "@/components/explore/Listing";
import Layout from "@/components/Layout";

const Explore = () => {
    return (
        <Layout>
            <div className="flex items-top w-full min-h-screen pt-16">
                <div className="flex flex-col w-3/7 bg-white drop-shadow-xs drop-shadow-gray-400/50">
                    <Filter className="p-12 border-b border-gray-200" />
                    <Listing className="bg-gray-100 p-12 h-full" />
                </div>
            </div>
        </Layout>
    );
}

export default Explore;
