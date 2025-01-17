import Link from "next/link";

const MobileMenu = () => {
  return (
    <nav className="flex justify-center bg-orange-200 p-4 rounded-xl focus:bg-orange-400 lg:hidden">
      <ul className="flex flex-col text-center gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/instruments">Instruments</Link>
        </li>
        <li>
          <Link href="/lessons">Lessons</Link>
        </li>
        <li>
          <Link href="/packages">Packages</Link>
        </li>
        <li>
          <Link href="/payments">Payments</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
