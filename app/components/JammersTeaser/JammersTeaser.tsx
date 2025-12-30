import { Button } from "@/app/components/Button";
import { FaSpotify } from "react-icons/fa";

export function JammersTeaser() {
  return (
    <section className="bg-cyan-800 px-6 py-16">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-6 text-3xl font-bold text-zinc-200">
          Jammers Podcast
        </h2>
        <p className="mb-8 font-bold max-w-2xl text-lg text-zinc-200">
          Jammers Podcast is dedicated to discussing game design with a focus on
          rapid prototyping and crafting short, consumable experiences.
        </p>
        <section className="flex flex-col gap-4">
          <Button href="https://jammerspodcast.com" target="_blank">Learn more</Button>
          <Button
            href="https://open.spotify.com/show/2TLinXl6DGXOwmLptmhgaT"
            icon={<FaSpotify className="h-5 w-5" />}
          >
            Listen now
          </Button>
        </section>
      </div>
    </section>
  );
}
