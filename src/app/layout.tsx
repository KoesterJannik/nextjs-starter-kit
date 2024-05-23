import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../components/providers/Providers";
import { GLOBAL_DATA } from "../../global-data";
import PlausibleProvider from "next-plausible";
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
      <head>
        <PlausibleProvider
          domain="nextjs-starter-kit.koesterjannik.com"
          enabled={true}
          selfHosted={true}
          customDomain="https://analytics.koesterjannik.com"
        />
        <script
          defer
          data-domain="nextjs-starter-kit.koesterjannik.com"
          src="https://analytics.koesterjannik.com:8000/js/script.js"
        ></script>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
