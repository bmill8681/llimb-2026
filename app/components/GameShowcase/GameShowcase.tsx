import { GameCard } from "@/app/components/GameCard";
import { Button } from "@/app/components/Button";
import gamesData from "@/app/data/games.json";

export function GameShowcase() {
  return (
    <section className="bg-zinc-900 px-6 py-16">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-12 text-3xl font-bold text-white">Our Games</h2>
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
        <div className="mt-12">
          <Button href="/games">View all games</Button>
        </div>
      </div>
    </section>
  );
}
