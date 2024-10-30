import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
  className?: string;
}

const CircleColor = ({ color, className, ...rest }: IProps) => {
  return (
    <span
      className={`${className} mr-2 inline-block h-5 w-5 rounded-full`}
      {...rest}
      style={{ backgroundColor: color }}
    />
  );
};

export default CircleColor;
