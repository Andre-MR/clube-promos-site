import Image from "next/legacy/image";
import Link from "next/link";
import { useState } from "react";
import Category from "../../models/category";
import HeaderCategory from "./header-category";
import HeaderSearch from "./header-search";

const hamburgerStyles = {
  open: {
    navLinks: "h-60 sm:h-60",
    hamburgerLines: "translate-x-10",
    crossGroup: "translate-x-0",
    crossLine1: "rotate-45",
    crossLine2: "-rotate-45",
  },
  closed: {
    navLinks: "h-0",
    hamburgerLines: "",
    crossGroup: "-translate-x-10",
    crossLine1: "rotate-0",
    crossLine2: "-rotate-0",
  },
};

export default function HeaderMain({ categories }: { categories: Category[] }) {
  const [hamburgerStyle, setHamburgerStyle] = useState(hamburgerStyles.closed);
  const hamburgerClick = () => {
    if (hamburgerStyle.navLinks == hamburgerStyles.open.navLinks) {
      setHamburgerStyle(hamburgerStyles.closed);
    } else {
      setHamburgerStyle(hamburgerStyles.open);
    }
  };

  return (
    <nav className="fixed top-0 z-30 m-auto flex w-full items-center justify-between bg-fuchsia-900">
      <div className="relative flex w-full flex-wrap items-center justify-between">
        <div className="relative z-10 flex w-full items-center justify-between px-4 pt-2">
          <Link
            className="flex rounded-full border-2 border-white"
            href="/"
            prefetch={false}
          >
            <svg
              className="cursor-pointer fill-white"
              width={30}
              height={30}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
          </Link>
          <HeaderSearch />

          <button className="group relative flex" onClick={hamburgerClick}>
            <div className="relative flex h-[40px] w-[40px] items-center justify-center overflow-hidden transition-all duration-200">
              <div className="flex h-1/2 w-2/3 origin-center transform flex-col justify-between overflow-hidden transition-all duration-300">
                <div
                  className={`h-[2px] w-full origin-left transform bg-gray-100 transition-all duration-300 ${hamburgerStyle.hamburgerLines}`}
                ></div>
                <div
                  className={`h-[2px] w-full transform rounded bg-gray-100 transition-all duration-300 ${hamburgerStyle.hamburgerLines} delay-75`}
                ></div>
                <div
                  className={`h-[2px] w-full origin-left transform bg-gray-100 transition-all duration-300 ${hamburgerStyle.hamburgerLines} delay-150`}
                ></div>

                <div
                  className={`absolute top-2.5 transform items-center justify-between transition-all duration-500 ${hamburgerStyle.crossGroup} flex w-0 group-focus:w-12`}
                >
                  <div
                    className={`absolute h-[2px] w-5 transform bg-gray-100 transition-all duration-500 ${hamburgerStyle.crossLine1} delay-300`}
                  ></div>
                  <div
                    className={`absolute h-[2px] w-5 transform bg-gray-100 transition-all duration-500 ${hamburgerStyle.crossLine2} delay-300`}
                  ></div>
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="flex w-full space-x-5 overflow-x-scroll py-2 pl-2 no-scrollbar">
          {categories.map((category) => (
            <HeaderCategory key={category.SK} category={category} />
          ))}
        </div>

        <div
          id="navlinks"
          className={`absolute top-10 right-0 z-30 mt-2 w-1/3  overflow-x-hidden rounded-l
        bg-white shadow-xl transition-all duration-200 ease-in-out sm:w-1/3 ${hamburgerStyle.navLinks}`}
        >
          <ul className="py-4 px-5 text-right text-lg tracking-wide text-gray-600">
            <li className="block w-full py-3 hover:text-blue-500">
              <Link href={"/"} prefetch={false}>
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
