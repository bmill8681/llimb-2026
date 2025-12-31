"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/components/Button";
import { HiOutlineEnvelope } from "react-icons/hi2";

const navLinks = [
  { label: "Games", href: "/games" },
  { label: "Services", href: "/services" },
];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const showSolidBackground = isMenuOpen || isAnimating;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${showSolidBackground ? "bg-slate-800" : "bg-zinc-900/95 backdrop-blur-sm"}`}>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <Image
            src="/LLimbLogo.png"
            alt="LLimb Games Logo"
            width={40}
            height={40}
            className="h-8 w-auto"
          />
          <span style={{ fontFamily: "Impact, sans-serif", letterSpacing: "0.1rem" }}>LLimb Games</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 min-[800px]:flex">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            href="mailto:llimbgames+inquiry@gmail.com"
            icon={<HiOutlineEnvelope className="h-4 w-4" />}
            style={{ fontSize: "14px" }}
          >
            Contact
          </Button>
        </div>

        {/* Hamburger Button */}
        <button
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 min-[800px]:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <motion.span
            className="block h-0.5 w-6 bg-white"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 8 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-white"
            animate={{
              opacity: isMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-white"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -8 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence
        onExitComplete={() => setIsAnimating(false)}
      >
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 bg-slate-800 min-[800px]:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            onAnimationStart={() => setIsAnimating(true)}
            variants={{
              open: { opacity: 1, transition: { duration: 0.3 } },
              closed: { opacity: 0, transition: { delay: 0.3, duration: 0.2 } },
            }}
          >
            <motion.ul
              className="flex flex-col items-center gap-8 pt-16"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {navLinks.map((link) => (
                <motion.li
                  key={link.label}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -20 },
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-2xl font-medium text-zinc-100 transition-colors hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -20 },
                }}
              >
                <Button
                  href="mailto:llimbgames+inquiry@gmail.com"
                  icon={<HiOutlineEnvelope className="h-5 w-5" />}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Button>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
