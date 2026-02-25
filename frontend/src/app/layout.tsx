import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "./components/app.header";
import "bootstrap/dist/css/bootstrap.min.css";
import AppFooter from "./components/app.footer";

export const metadata: Metadata = {
  title: "App",
  description: "App layout",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Thêm suppressHydrationWarning vào html để tránh lỗi từ extension
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppHeader />

        {/* Quan trọng: Phải có {children} để nội dung các trang khác (như /sach) hiện ra */}
        <main>{children}</main>

        <AppFooter />
      </body>
    </html>
  );
}
