import Link from "next/link";

interface GreenButtonProps {
  href: string;
  children: React.ReactNode;
}

const GreenButton = ({ href, children }: GreenButtonProps) => {
  return (
    <Link
      href={href}
      className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
    >
      {children}
    </Link>
  );
};

export default GreenButton;
