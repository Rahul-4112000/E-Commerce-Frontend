import { LucideIcon } from "lucide-react";
import React from "react";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  icon?: LucideIcon;
}

export const Input: React.FC<InputProps> = ({
  error,
  className = "",
  icon,
  ...props
}) => {
  return (
    <input
      className={`w-full ${icon ? "pl-10" : "px-4"} py-3 bg-gray-50 border ${
        error
          ? "border-red-500 focus:ring-red-200"
          : "border-gray-200 focus:ring-indigo-200"
      } rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-4 focus:bg-white focus:border-indigo-500 ${className}`}
      {...props}
    />
  );
};
