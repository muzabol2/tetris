import { Navbar } from "@/components";
import "@/styles/globals.css";
import { TetrisProvider } from "@/tetrisContext";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: "tetris",
  description: "Tetris game app",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Readonly<Props>) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className="flex flex-col bg-background text-foreground transition-colors duration-200"
      style={{ minHeight: "var(--vh)", height: "var(--vh)" }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TetrisProvider>
          <Navbar />
          <main className="mx-auto mb-0 mt-16 flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 lg:px-12">
            {children}
          </main>
        </TetrisProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
