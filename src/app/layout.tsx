import type { Metadata } from "next";
import "./globals.css";

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
        className={`pb-16`}
      >
        {children}
      </body>
    </html>
  );
}
