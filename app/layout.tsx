import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KHULA CRM — Grow Your Business",
  description: "WhatsApp-first CRM for South African SMEs. Automate follow-ups, manage contacts, and book appointments — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
