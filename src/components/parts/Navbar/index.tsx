"use client";

import { useState } from "react";

import { Menu, Music } from "lucide-react";
import Link from "next/link";
import RightMenu from "./RightMenu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-purple-200 m-2 rounded-xl shadow-xl md:m-4">
      <nav className="flex items-center gap-4 px-4 py-3 max-lg:justify-between">
        <Link href="/">
          <Music className="w-8 h-8" />
        </Link>

        <ul className="hidden gap-4 lg:flex">
          <li className="hover:text-blue-400 transition-colors">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-blue-400 transition-colors">
            <Link href="/">Instruments</Link>
          </li>
          <li className="hover:text-blue-400 transition-colors">
            <Link href="/">Lessons</Link>
          </li>
          <li className="hover:text-blue-400 transition-colors">
            <Link href="/">Packages</Link>
          </li>
          <li className="hover:text-blue-400 transition-colors">
            <Link href="/">Payments</Link>
          </li>
        </ul>

        <Menu
          className={cn(
            "w-8 h-8 transition-transform lg:hidden",
            isOpen && "rotate-90",
          )}
          onClick={handleMenu}
        />
      </nav>
      {isOpen && <RightMenu />}
    </header>
  );
};

export default Navbar;
