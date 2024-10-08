import { ErrorBoundary, Navbar } from "@/components";
import { TetrisProvider } from "@/context";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "tetris",
  description: "Tetris game app",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" suppressHydrationWarning>
    <ErrorBoundary>
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
    </ErrorBoundary>
  </html>
);

export default RootLayout;
