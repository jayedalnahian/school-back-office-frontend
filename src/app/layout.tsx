import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "প্রাথমিক বিদ্যালয় ব্যাক-অফিস | Primary School Management",
  description: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার - প্রাথমিক বিদ্যালয় প্রশাসনিক ব্যাক-অফিস সিস্টেম",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${hindSiliguri.variable} ${inter.variable} min-h-screen bg-background text-foreground antialiased font-sans`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
