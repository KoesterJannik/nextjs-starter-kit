import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../components/providers/Providers";
import { GLOBAL_DATA } from "../../global-data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: GLOBAL_DATA.metaTitle,
  description: GLOBAL_DATA.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
