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
      className="text-sm/6 font-semibold text-white hover:bg-yellow-500 px-3.5 py-2 shadow-xs bg-yellow-400 tfocus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 transition-colors rounded-md"
    >
      {children}
      <span aria-hidden="true">{icon}</span>
    </Link>
  );
};

export default YellowButton;
