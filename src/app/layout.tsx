import { AvatarSelectorCtx } from "@/app/AvatarSelectorCtx";
import { ModalCtx } from "@/app/ModalCtx";
import { PlayerCtx } from "@/app/PlayerCtx";
import { ToastCtx } from "@/app/ToastCtx";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KW-PTCG",
  description:
    "A serverless and RTC application for PTCG (Pokemon Trading Card Game).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AvatarSelectorCtx>
          <ModalCtx>
            <ToastCtx>
              <PlayerCtx>{children}</PlayerCtx>
            </ToastCtx>
          </ModalCtx>
        </AvatarSelectorCtx>
      </body>
    </html>
  );
}
