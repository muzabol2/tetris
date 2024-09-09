import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components";
import { ThemeProvider } from "next-themes";

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
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 lg:px-12 mt-16 mb-0">
          {children}
        </main>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
