"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/atlas", label: "Atlas" },
  { href: "/events", label: "Events" },
  { href: "/submit", label: "Submit" },
  { href: "/resources", label: "Resources" },
  { href: "/print", label: "Print View" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="no-print sticky top-0 z-50 border-b" style={{ background: "#2F5D50", borderColor: "#2F6F73" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-bold text-base tracking-tight" style={{ fontFamily: "'Lora', serif", color: "#F6F1E8" }}>
            North Durham Atlas
          </Link>
          <div className="hidden sm:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="px-3 py-1.5 rounded text-sm font-medium transition-colors" style={{ fontFamily: "'Lora', serif", color: pathname === href ? "#F6F1E8" : "#C2D1DB", background: pathname === href ? "rgba(47,111,115,0.4)" : "transparent" }}>{label}</Link>
            ))}
          </div>
          <div className="flex sm:hidden items-center gap-1">
            {[{ href: "/atlas", label: "Atlas" }, { href: "/events", label: "Events" }, { href: "/submit", label: "Submit" }].map(({ href, label }) => (
              <Link key={href} href={href} className="px-2 py-1 rounded text-xs font-medium" style={{ fontFamily: "'Lora', serif", color: pathname === href ? "#F6F1E8" : "#C2D1DB", background: pathname === href ? "rgba(47,111,115,0.4)" : "transparent" }}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
