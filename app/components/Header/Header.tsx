"use client";

import { motion } from "motion/react";

export function Header() {
  return (
    <header className="relative h-screen w-full overflow-hidden bg-zinc-900">
      {/* Textured background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-zinc-900/50 to-blue-900/30" />

      {/* Center content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <motion.h1
          className="text-5xl font-black tracking-tight text-white drop-shadow-2xl md:text-7xl lg:text-9xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          LLimb Games
        </motion.h1>
      </div>
    </header>
  );
}
