import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "tetris",
  description: "Tetris game app",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Readonly<Props>) => (
  <html lang="en" suppressHydrationWarning>
    <body>
      <Providers>
        <Navbar />
        {children}
      </Providers>
    </body>
  </html>
);

export default RootLayout;
