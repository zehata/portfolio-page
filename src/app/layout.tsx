import type { Metadata } from "next";
import "./globals.css";
import MainMenu from "@/components/main-menu/MainMenu";
import React from "react";
import { ViewTransitions } from "next-view-transitions";
import BaseBackground from "@/components/backgrounds/BaseBackground";
import { GlobalContextProvider } from "@/components/context/GlobalContext";

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
        <body className="fixed top-0 left-0 w-screen h-screen overflow-hidden">
          <GlobalContextProvider>
            <BaseBackground />
            <MainMenu />
            {children}
          </GlobalContextProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
