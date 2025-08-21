import { Logo } from "@/utils/icon";
import Link from "next/link";
import Navigation from "./Navigation";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 drop-shadow-xs drop-shadow-gray-400/50 dark:drop-shadow-gray-900/50">
      <div className="max-w-screen flex flex-wrap gap-20 items-center justify-between mx-auto md:px-12 px-8">
        <Navigation />
        <Link href="/" className="md:order-1 space-x-3 rtl:space-x-reverse">
          <Logo />
        </Link>
        <Search />
      </div>
    </nav>
  );
};

export default Navbar;