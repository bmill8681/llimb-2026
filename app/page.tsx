import type { Metadata } from "next";
import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { GameShowcase } from "./components/GameShowcase";
import { AboutUs } from "./components/AboutUs";
import { ServicesTeaser } from "./components/ServicesTeaser";
import { Footer } from "./components/Footer";
import { JammersTeaser } from "./components/JammersTeaser";

export const metadata: Metadata = {
  title: "LLimb Games | Indie Game Studio",
  description:
    "Welcome to LLimb Games, an indie game studio crafting unique gaming experiences. Discover our games like Jelli Nook and explore our professional services.",
  openGraph: {
    title: "LLimb Games | Indie Game Studio",
    description:
      "Welcome to LLimb Games, an indie game studio crafting unique gaming experiences.",
  },
};

export default function Home() {
  return (
    <main>
      <NavBar />
      <Header />
      <GameShowcase />
      <JammersTeaser />
      <AboutUs />
      <ServicesTeaser />
      <Footer />
    </main>
  );
}
