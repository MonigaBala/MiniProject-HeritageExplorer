import "@/styles/globals.css"; // Uses the alias '@' if configured

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getMessages } from "@/lib/messages"; // Import correctly


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heritage Explorer",
  description: "Discover Tamil Nadu’s rich culture and history",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(params.locale); // Fetch messages dynamically

  return (
    <html lang={params.locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <p>{messages?.discover ?? "Fallback Text"}</p> {/* Avoids errors if undefined */}
        {children}
      </body>
    </html>
  );
}
