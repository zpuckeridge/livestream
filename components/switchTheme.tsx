import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@supabase/ui";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  return (
    <>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="w-9 h-9 bg-gray-200 rounded-lg dark:bg-[#1d1f22] flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {mounted && (
          <>
            {theme === "dark" ? (
              <IconSun strokeWidth={2} />
            ) : (
              <IconMoon strokeWidth={2} />
            )}
          </>
        )}
      </button>
    </>
  );
}
