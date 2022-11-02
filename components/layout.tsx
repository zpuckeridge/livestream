import ThemeSwitch from "./switchTheme";
import { Home } from "react-feather";
import Link from "next/link";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div>
        <nav className="p-8 flex justify-between w-full border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
          <Link href="/">
            <button
              aria-label="Home"
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-[#1d1f22] hover:ring-2 ring-gray-300  transition-all"
            >
              <Home />
            </button>
          </Link>
          <ThemeSwitch />
        </nav>
        <main>{children}</main>
        <footer className="p-2 text-center">
          <div className="font-semibold text-md text-gray-600 dark:text-gray-400">
            Made with{" "}
            <a
              href="https://nextjs.org/"
              className="hover:text-gray-800 dark:hover:text-gray-200 transition-all"
            >
              Next.JS
            </a>
            ,{" "}
            <a
              href="https://reactjs.org/"
              className="hover:text-gray-800 dark:hover:text-gray-200 transition-all"
            >
              React
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com/"
              className="hover:text-gray-800 dark:hover:text-gray-200 transition-all"
            >
              Tailwind CSS
            </a>{" "}
            and <a href="https://github.com/zpuckeridge/livestream">💖</a>
          </div>
        </footer>
      </div>
    </>
  );
}
