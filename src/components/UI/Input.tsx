import { InputHTMLAttributes } from "react";

const Input = ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="rounded-md border-2 px-3 py-2 shadow-md focus:border-blue-500 focus:outline-none focus:ring-2"
      {...rest}
    />
  );
};

export default Input;
