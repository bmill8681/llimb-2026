import { Button } from "@/app/components/Button";

export function ServicesTeaser() {
  return (
    <section className="bg-zinc-800 px-6 py-16">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="mb-6 text-3xl font-bold text-white">Our Services</h2>
        <p className="mb-8 max-w-2xl text-lg text-zinc-300">
          Beyond games, we offer professional services to bring your ideas to
          life. From custom web development and interactive game prototyping to
          stylized 3D modeling.
        </p>
        <Button href="/services">Learn more</Button>
      </div>
    </section>
  );
}
