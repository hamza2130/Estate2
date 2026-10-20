import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Autostack AI | Real Estate & Builders", template: "%s | Autostack AI" },
  description: "Verified plots, villas and commercial property in DHA Islamabad and Bahria Town.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
