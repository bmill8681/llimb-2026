"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function Header() {
  return (
    <header className="relative h-screen w-full overflow-hidden bg-zinc-900">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-sm"
      >
        <source src="/JelliNookHeader.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-zinc-900/50 to-blue-900/30" />

      {/* Center content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6 md:justify-start">
        <div className="mx-auto w-full max-w-[1200px]">
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/LLimbLogo.png"
              alt="LLimb Games"
              width={400}
              height={200}
              className="h-auto w-64 drop-shadow-2xl md:w-80 lg:w-96"
              priority
            />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
