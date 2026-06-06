import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Community Atlas Drop",
  description: "Make hidden abundance impossible to ignore. A living map of mutual aid, free services, local makers, and trusted gathering spots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `try{var t=localStorage.getItem('atlas-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`
        }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
