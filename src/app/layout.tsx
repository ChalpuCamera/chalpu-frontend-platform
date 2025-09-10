import type { Metadata } from "next";
import "./globals.css";
import { BottomNav } from "@/components/ui/bottom-nav";

export const metadata: Metadata = {
  title: "Feedback Platform",
  description: "RhaJuPark Feedback Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased pb-16`}
      >
        {children}
      </body>
    </html>
  );
}
