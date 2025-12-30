"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ServiceImage } from "@/app/components/ServiceImage";
import { ImageCarouselModal } from "@/app/components/ImageCarouselModal";

export type ServiceProps = {
  title: string;
  children: ReactNode;
  images?: string[];
  isOpen: boolean;
  onToggle: () => void;
};

export function Service({ title, children, images, isOpen, onToggle }: ServiceProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setActiveImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="border-b border-zinc-700">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-zinc-400"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-zinc-300">
              {children}
              {images && images.length > 0 && (
                <div className="mt-4 flex gap-4 overflow-x-auto scrollbar-hide">
                  {images.map((src, index) => (
                    <ServiceImage
                      key={src}
                      src={src}
                      alt={`${title} image ${index + 1}`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {images && images.length > 0 && (
        <ImageCarouselModal
          images={images}
          activeImage={activeImageIndex}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
