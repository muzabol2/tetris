import "./index.css";
import { ErrorBoundary, GameBoard, GameMenu, MobileButtons, Navbar } from "@/components";
import { TetrisProvider } from "@/context";
import { ThemeProvider } from "next-themes";

const App = () => (
  <ErrorBoundary>
    <div
      className="flex flex-col bg-background text-foreground transition-colors duration-200"
      style={{ minHeight: "var(--vh)", height: "var(--vh)" }}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TetrisProvider>
          <Navbar />
          <main className="mx-auto mb-0 mt-16 flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 lg:px-12">
            <div className="flex flex-col">
              <div className="flex gap-1">
                <GameBoard />
                <GameMenu />
              </div>
              <MobileButtons />
            </div>
          </main>
        </TetrisProvider>
      </ThemeProvider>
    </div>
  </ErrorBoundary>
);

export { App };
