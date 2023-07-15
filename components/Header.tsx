import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 space-x-2 px-10">
      <div className="flex text-white text-3xl font-bold items-center space-x-2">
        <Link href="/">Gas Info</Link>
      </div>
      <nav className="text-white">
        <ul className="flex items-center space-x-4">
          <li>Made by Isaac Yanez</li>
        </ul>
      </nav>
    </header>
  );
}
