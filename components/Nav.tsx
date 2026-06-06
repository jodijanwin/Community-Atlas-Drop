"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/atlas", label: "Atlas" },
  { href: "/submit", label: "Submit" },
  { href: "/resources", label: "Resources" },
  { href: "/print", label: "Print View" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="no-print sticky top-0 z-50 border-b" style={{ background: "#1A2433", borderColor: "#1B75BC" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-bold text-base tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#F0F4F0" }}>
            Community Atlas Drop
          </Link>
          <div className="hidden sm:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="px-3 py-1.5 rounded text-sm font-medium transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", color: pathname === href ? "#6BB8F0" : "#8AA0A8", background: pathname === href ? "rgba(27,117,188,0.15)" : "transparent" }}>{label}</Link>
            ))}
          </div>
          <div className="flex sm:hidden items-center gap-1">
            {[{ href: "/atlas", label: "Atlas" }, { href: "/submit", label: "Submit" }].map(({ href, label }) => (
              <Link key={href} href={href} className="px-2 py-1 rounded text-xs font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", color: pathname === href ? "#6BB8F0" : "#8AA0A8", background: pathname === href ? "rgba(27,117,188,0.15)" : "transparent" }}>{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
