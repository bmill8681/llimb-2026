import type { Metadata } from "next";
import { NavBar } from "@/app/components/NavBar";
import { Footer } from "@/app/components/Footer";
import { ServicesList } from "@/app/components/ServicesList";
import { Button } from "@/app/components/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Professional services from LLimb Games including web development, game prototyping, and 3D modeling. Bring your ideas to life with our expertise.",
  openGraph: {
    title: "Services | LLimb Games",
    description:
      "Professional services from LLimb Games including web development, game prototyping, and 3D modeling.",
  },
};

export default function ServicesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <NavBar />
      <section className="flex-1 bg-zinc-900 px-6 pt-32 pb-16">
        <div className="mx-auto max-w-[1200px]">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Our Services
          </h1>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300">
            Beyond games, we offer professional services to bring your ideas to
            life. From custom web development and interactive game prototyping
            to stylized 3D modeling.
          </p>
          <ServicesList />

          <div className="mt-16">
            <h2 className="mb-4 text-2xl font-bold text-white">Contact Us</h2>
            <p className="mb-6 max-w-2xl text-zinc-300">
              Interested in working with us? Get in touch to discuss your
              project and see how we can help bring your vision to life.
            </p>
            <Button href="mailto:llimbgames+inquiry@gmail.com">
              Get in touch
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
