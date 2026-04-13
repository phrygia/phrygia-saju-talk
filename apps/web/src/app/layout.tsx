import type { Metadata } from "next";
import {
  DM_Serif_Display,
  Noto_Sans_KR,
  Noto_Serif_KR,
} from "next/font/google";
import ToastClient from "@/src/components/providers/ToastClient";
import Providers from "@/src/utils/provider";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-kr",
  display: "swap",
  preload: false,
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "SAJU TALK - AI 사주 대화 서비스",
  description: "사주 정보를 등록하고 AI와 대화하세요",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${notoSansKr.variable} ${notoSerifKr.variable} ${dmSerifDisplay.variable}`}
    >
      <body className={notoSansKr.className}>
        <Providers>
          {children}
          <ToastClient />
        </Providers>
      </body>
    </html>
  );
}
