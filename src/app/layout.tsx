import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nimba Stay — Front Desk",
  description: "Room availability and booking for Nimba Nature Cure Village",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
