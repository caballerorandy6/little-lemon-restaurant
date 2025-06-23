import { TitleProps } from "@/libs/types";

const Title = ({ children }: TitleProps) => {
  return (
    <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-pretty text-gray-900 text-center sm:text-left">
      {children}
    </h1>
  );
};

export default Title;
