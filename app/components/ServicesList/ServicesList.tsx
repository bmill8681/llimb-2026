"use client";

import { useState } from "react";
import { Service } from "@/app/components/Service";
import servicesData from "@/app/data/services.json";

export function ServicesList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border-t border-zinc-700">
      {servicesData.map((service, index) => (
        <Service
          key={service.title}
          title={service.title}
          images={service.images}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        >
          <p>{service.description}</p>
        </Service>
      ))}
    </div>
  );
}
