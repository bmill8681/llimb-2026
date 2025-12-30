import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";
import { GameShowcase } from "./components/GameShowcase";
import { AboutUs } from "./components/AboutUs";
import { ServicesTeaser } from "./components/ServicesTeaser";
import { Footer } from "./components/Footer";
import { JammersTeaser } from "./components/JammersTeaser";

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
