import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "tetris",
  description: "Tetris game app",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<Props>) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
