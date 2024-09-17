import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionProvider from "./SessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "中核高中",
  description: "a web game",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider session={session}>
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
