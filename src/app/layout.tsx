import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio Gallery — רשימת המתנה",
  description:
    "מערכת אחת לניהול גלריות, העלאת תמונות כבדות, בחירת לקוחות והורדות באיכות גבוהה. חודש ראשון חינם לנרשמות הראשונות.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-dvh bg-stone-50 text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
