import Image from "next/image";

export type ServiceImageProps = {
  src: string;
  alt: string;
  onClick?: () => void;
};

export function ServiceImage({ src, alt, onClick }: ServiceImageProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[150px] w-[150px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition-opacity hover:opacity-80"
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </button>
  );
}
