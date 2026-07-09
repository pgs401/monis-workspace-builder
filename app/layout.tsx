import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monis Workspace Builder",
  description:
    "Pick a desk, chair, and accessories, then rent your workspace setup.",
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
