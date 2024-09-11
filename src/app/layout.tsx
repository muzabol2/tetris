import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "tetris",
  description: "Tetris game app",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Readonly<Props>) => (
  <html lang="en" suppressHydrationWarning>
    <body className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-200">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <main className="mx-auto mb-0 mt-16 flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 lg:px-12">
          {children}
        </main>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
