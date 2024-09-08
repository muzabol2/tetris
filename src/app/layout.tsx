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
    <body className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <Providers>
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center mt-[4rem] mb-0">
          {children}
        </main>
      </Providers>
    </body>
  </html>
);

export default RootLayout;
