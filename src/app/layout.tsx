import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "SNBI | 프리미엄 다단계 마케팅 쇼핑몰",
  description: "최고의 퀄리티, 최고의 네트워크 SNBI 쇼핑몰입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
