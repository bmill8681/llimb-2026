import { Button } from "@/app/components/Button";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaSpotify } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 px-6 py-12">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-zinc-400">
          &copy; {currentYear} LLimb Inc. All rights reserved.
        </p>
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <Button
            href="https://jammerspodcast.com"
            target="_blank"
            icon={<FaSpotify className="h-5 w-5" />}
          >
            Jammers Podcast
          </Button>
          <Button
            href="mailto:llimbgames+inquiry@gmail.com"
            icon={<HiOutlineEnvelope className="h-5 w-5" />}
          >
            Contact Us
          </Button>
        </div>
      </div>
    </footer>
  );
}
