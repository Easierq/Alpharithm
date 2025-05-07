import "./globals.css";

import type { Metadata } from "next";
import { ToasterProvider } from "@/components/toast-provider";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Alpha Assessment",
  description: "Alpha assessment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <Navbar />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
