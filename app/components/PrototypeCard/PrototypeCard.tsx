import Image from "next/image";

export type PrototypeCardProps = {
  title: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
};

export function PrototypeCard({
  title,
  description,
  projectUrl,
  imageUrl,
}: PrototypeCardProps) {
  return (
    <article className="flex gap-6 rounded-lg bg-zinc-800 p-4">
      <div className="relative h-[100px] w-[100px] flex-shrink-0 overflow-hidden rounded-lg md:h-[150px] md:w-[150px]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="mb-4 text-sm text-zinc-400">{description}</p>
        <a
          href={projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-amber-400 transition-colors hover:text-amber-300"
        >
          View Project
        </a>
      </div>
    </article>
  );
}
