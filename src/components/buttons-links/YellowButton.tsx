import Link from "next/link";

interface YellowButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const YellowButton = ({ href, children, icon }: YellowButtonProps) => {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-yellow-300 hover:to-yellow-200 btn-shine cursor-pointer"
    >
      {children}
      <span aria-hidden="true">{icon}</span>
    </Link>
  );
};

export default YellowButton;
