import Image from "next/image";

export type GameCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  steamUrl: string;
  status: string;
};

export function GameCard({
  title,
  description,
  imageUrl,
  steamUrl,
  status,
}: GameCardProps) {
  return (
    <article className="flex max-w-[500px] flex-col overflow-hidden rounded-lg bg-zinc-800">
      {/* Game Image */}
      <div className="relative aspect-[480/720] w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6">
        {/* Status Badge */}
        <span className="w-fit rounded-full bg-amber-500/20 px-3 py-1 text-sm font-medium text-amber-400">
          {status}
        </span>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white">{title}</h3>

        {/* Description */}
        <p className="text-zinc-400">{description}</p>

        {/* Steam Link */}
        <a
          href={steamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex w-fit items-center gap-2 rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-600"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" />
          </svg>
          View on Steam
        </a>
      </div>
    </article>
  );
}
