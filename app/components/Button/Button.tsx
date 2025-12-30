import Link from "next/link";
import { ReactNode, AnchorHTMLAttributes } from "react";

export type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  icon?: ReactNode;
};

function ArrowIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  );
}

export function Button({ children, href, icon, ...rest }: ButtonProps) {
  const iconElement = icon !== undefined ? icon : <ArrowIcon />;

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-lg font-medium text-amber-400 transition-colors hover:text-amber-300"
      {...rest}
    >
      {children}
      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
        {iconElement}
      </span>
    </Link>
  );
}
