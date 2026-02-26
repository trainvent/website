import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trainvent | Company Website",
  description:
    "Trainvent builds practical digital systems, automation, and product delivery workflows for companies.",
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
