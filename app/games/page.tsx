import type { Metadata } from "next";
import { NavBar } from "@/app/components/NavBar";
import { Footer } from "@/app/components/Footer";
import { GameCard } from "@/app/components/GameCard";
import { PrototypeList } from "@/app/components/PrototypeList";
import gamesData from "@/app/data/games.json";

export const metadata: Metadata = {
  title: "Games",
  description:
    "Explore games and prototypes from LLimb Games. From published titles like Jelli Nook to experimental game jam prototypes.",
  openGraph: {
    title: "Games | LLimb Games",
    description:
      "Explore games and prototypes from LLimb Games. From published titles to experimental game jam prototypes.",
  },
};

export default function GamesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <NavBar />
      <section className="flex-1 bg-zinc-900 px-6 pt-32 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="mb-12 text-4xl font-bold text-white md:text-5xl">
            Our Games
          </h1>
          <div className="flex flex-wrap justify-center gap-8 md:justify-start">
            {gamesData.map((game) => (
              <GameCard
                key={game.title}
                title={game.title}
                description={game.description}
                imageUrl={game.imageUrl}
                steamUrl={game.steamUrl}
                status={game.status}
              />
            ))}
          </div>

          <div className="mt-16">
            <h2 className="mb-8 text-3xl font-bold text-white">Prototypes</h2>
            <PrototypeList />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
