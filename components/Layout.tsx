import ThemeSwitch from "./SwitchTheme";
import { Home } from "react-feather";
import Link from "next/link";
import LoginButton from "./Auth";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className="p-4 flex flex-col min-h-screen justify-between bg-white dark:bg-black">
        <nav className="flex justify-between w-full border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
          <div className="inline-flex">
            <div>
              <Link href="/">
                <button
                  aria-label="Home"
                  className="p-2 rounded-lg flex items-center justify-center bg-white dark:bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all"
                >
                  <Home />
                </button>
              </Link>
            </div>

            <div>
              <Link href="/dashboard">
                <button
                  aria-label="Dashboard"
                  className="ml-2 p-2 rounded-lg flex items-center justify-center bg-white dark:bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all"
                >
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
          <div className="inline-flex">
            <div className="mr-2">
              <LoginButton />
            </div>
            <div>
              <ThemeSwitch />
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="text-center">
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
            and <a href="https://github.com/zpuckeridge/livestream">❤</a>
          </div>
        </footer>
      </div>
    </>
  );
}
