import { useState, useEffect } from "react";
import { MdLightbulb, MdLightbulbOutline } from "react-icons/md";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    setTheme(stored);

    if (stored) {
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const toggleTheme = () => {
    let newTheme: "light" | "dark" | null;

    if (theme === null) {
      newTheme = "dark";
    } else if (theme === "dark") {
      newTheme = "light";
    } else {
      newTheme = "dark";
    }

    setTheme(newTheme);

    if (newTheme === null) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  if (!mounted) {
    return (<></>);
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded border border-gray-300 hover:bg-gray-100 transition-colors w-10 self-center"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderColor: "var(--foreground)",
      }}
    >
      {theme === null ? "🔄" : theme === "dark" ? <MdLightbulbOutline className="text-[20px]"/> : <MdLightbulb />}
      {/* <span className="ml-1 text-sm">{theme === null ? "Auto" : theme === "dark" ? "Dark" : "Light"}</span> */}
    </button>
  );
}
