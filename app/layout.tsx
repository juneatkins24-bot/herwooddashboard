import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Herwood Writers' Room",
  description: "Daily standup from seven AI employees at Herwood Creative.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
