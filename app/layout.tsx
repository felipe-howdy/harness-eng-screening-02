import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Task Manager",
  description: "A small task manager app.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
