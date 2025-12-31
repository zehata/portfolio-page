import type { Metadata } from "next";
import "./globals.css";
import MainMenu from "@/components/main-menu/MainMenu";
import React from "react";
import { ViewTransitions } from "next-view-transitions";
import BaseBackground from "@/components/backgrounds/BaseBackground";
import { GlobalContextProvider } from "@/components/context/GlobalContext";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Zenon",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className="fixed w-screen h-[100dvh] bg-black">
          <GlobalContextProvider>
            <Link
              className="fixed top-0 left-0 p-4 m-4 bg-background rounded-full font-bold border-4 text-2xl opacity-0 -z-10 focus-within:z-10 focus-within:opacity-100"
              href="#main-content"
            >
              Skip to main content
            </Link>
            <React.Suspense>
              <BaseBackground />
            </React.Suspense>
            <MainMenu />
            {children}
          </GlobalContextProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
