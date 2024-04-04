import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import GamePlayContextProvider from "@/hooks/__GamePlayContextProvider";
import React from "react";
import GamePlayContextProvider from "@/hooks/useGamePlay";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bot to beat Angie Pangie",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GamePlayContextProvider>{children}</GamePlayContextProvider>
      </body>
    </html>
  );
}
