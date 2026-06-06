"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/atlas", label: "Atlas" },
  { href: "/submit", label: "Submit" },
  { href: "/resources", label: "Resources" },
  { href: "/print", label: "Print View" },
  { href: "/about", label: "About" },
];

function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("atlas-theme") as "dark" | "light" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("atlas-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-8 h-8 flex items-center justify-center rounded transition-colors"
      style={{ color: "var(--text-2)", background: "transparent" }}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="no-print sticky top-0 z-50 border-b" style={{ background: "var(--bg)", borderColor: "#1B75BC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-bold text-base tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--text)" }}>
            Community Atlas Drop
          </Link>
          <div className="hidden sm:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="px-3 py-1.5 rounded text-sm font-medium transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", color: pathname === href ? "var(--accent)" : "var(--text-2)", background: pathname === href ? "rgba(27,117,188,0.15)" : "transparent" }}>{label}</Link>
            ))}
            <ThemeToggle />
          </div>
          <div className="flex sm:hidden items-center gap-2">
            {[{ href: "/atlas", label: "Atlas" }, { href: "/submit", label: "Submit" }].map(({ href, label }) => (
              <Link key={href} href={href} className="px-2 py-1 rounded text-xs font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", color: pathname === href ? "var(--accent)" : "var(--text-2)", background: pathname === href ? "rgba(27,117,188,0.15)" : "transparent" }}>{label}</Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
