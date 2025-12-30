import { PrototypeCard } from "@/app/components/PrototypeCard";
import prototypesData from "@/app/data/prototypes.json";

export function PrototypeList() {
  const visiblePrototypes = prototypesData.filter(
    (prototype) => prototype.visible
  );

  return (
    <div className="flex flex-col gap-6">
      {visiblePrototypes.map((prototype) => (
        <PrototypeCard
          key={prototype.title}
          title={prototype.title}
          description={prototype.description}
          projectUrl={prototype.projectUrl}
          imageUrl={prototype.imageUrl}
        />
      ))}
    </div>
  );
}
