import type { Metadata } from "next";
import { Roboto_Slab, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/public/Navbar";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-title",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Little Lemon",
  description: "Little Lemon Restaurant, a delightful dining experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body
        className={`${robotoSlab.variable} ${inter.variable} antialiased text-pretty font-body`}
      >
        <Navbar />
        {children}
        <Toaster position="bottom-right" richColors closeButton={true} />
      </body>
    </html>
  );
}
