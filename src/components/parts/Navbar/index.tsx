import { Music } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-purple-200 m-2 rounded-full shadow-xl">
      <nav className="flex items-center gap-4 px-4 py-3">
        <Link href="/">
          <Music className="w-8 h-8" />
        </Link>

        <ul className="flex gap-4">
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
      </nav>
    </header>
  );
};

export default Navbar;
