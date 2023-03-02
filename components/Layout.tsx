import Link from "next/link";
import LoginButton from "./LoginButton";
import { FiGrid, FiHome } from "react-icons/fi";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <div className="p-4 flex flex-col min-h-screen justify-between text-white bg-[#111111]">
        <nav className="flex justify-between w-fullborder-gray-700">
          <div className="inline-flex">
            <div>
              <Link href="/" passHref>
                <button
                  title="Home"
                  className="py-1 px-6 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
                  <FiHome className="mr-1" />
                  Home
                </button>
              </Link>
            </div>

            <div>
              <Link href="/dashboard" passHref>
                <button
                  title="Dashboard"
                  className="ml-2 py-1 px-6 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
                  <FiGrid className="mr-1" />
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
          <div className="inline-flex">
            <div>
              <LoginButton />
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="text-center">
          <div className="font-semibold text-md text-[#888888]">
            Made with{" "}
            <a
              href="https://nextjs.org/"
              className="hover:text-white transition-all duration-200">
              Next.JS
            </a>
            ,{" "}
            <a
              href="https://reactjs.org/"
              className="hover:text-white transition-all duration-200">
              React
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com/"
              className="hover:text-white transition-all duration-200">
              Tailwind CSS
            </a>{" "}
            and{" "}
            <a
              href="https://github.com/zpuckeridge/livestream"
              className="hover:text-[#ff0000] transition-all duration-200">
              ❤
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
