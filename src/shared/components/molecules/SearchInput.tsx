import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/shared/components/atoms/Input";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  className = "",
  wrapperClassName = "",
  placeholder = "Search...",
  ...props
}) => {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10">
        <Search size={18} />
      </div>
      <Input
        type="text"
        icon={Search}
        placeholder={placeholder}
        className={`!pl-10 !py-2 !rounded-lg !text-sm !bg-white !border-gray-200 focus:!border-indigo-500 w-64 ${className}`}
        {...props}
      />
    </div>
  );
};
