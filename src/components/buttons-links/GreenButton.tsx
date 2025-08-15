import Link from "next/link";

interface GreenButtonProps {
  href: string;
  children: React.ReactNode;
}

const GreenButton = ({ href, children }: GreenButtonProps) => {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-green-600 hover:to-green-500 btn-shine cursor-pointer"
    >
      {children}
    </Link>
  );
};

export default GreenButton;
