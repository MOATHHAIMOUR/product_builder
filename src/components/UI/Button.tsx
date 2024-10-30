import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, width = "w-fit", className, ...rest }: IProps) => {
  return (
    <button
      className={`rounded-md ${className} ${width} rounded-xl p-1`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
