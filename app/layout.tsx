import type { Metadata } from "next";
import "./globals.css";

import { getPageAlternates, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
	metadataBase: siteUrl,
  title: "Trainvent | Company Website",
  description:
    "Trainvent builds practical digital systems, automation, and product delivery workflows for companies.",
	alternates: getPageAlternates("en", "/"),
  icons: {
    icon: "/LeLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
