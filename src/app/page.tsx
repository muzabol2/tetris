import { config } from "@/config";
import { BuyMeACoffee, GithubIcon, TetrisLogoIcon } from "@/icons";

const Home = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full flex items-center justify-between p-4 bg-header bg-opacity-90 fixed top-0 left-0 right-0 shadow-md z-50 pl-8 pr-8">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
          <TetrisLogoIcon />
          {config.title}
        </h1>
        <div className="flex items-center gap-4">
          <a
            href={config.buyMeACoffee}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center p-1 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition-colors duration-200"
          >
            <BuyMeACoffee />
          </a>
          <a href={config.githubUrl} target="_blank" rel="noopener noreferrer">
            <GithubIcon />
          </a>
        </div>
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"></main>
    </div>
  );
};

export default Home;
