import React, { useState } from "react";
import { Label } from "@/shared/components/atoms/Label";
import { Input } from "@/shared/components/atoms/Input";
import { LucideIcon, Eye, EyeOff } from "lucide-react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  icon: Icon,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col mb-4">
      <Label htmlFor={props.id}>{label}</Label>
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-indigo-500">
            <Icon size={18} strokeWidth={2.5} />
          </div>
        )}
        <Input
          error={!!error}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={isPassword ? "pr-11" : ""}
          {...props}
          icon={Icon}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={2.5} />
            ) : (
              <Eye size={18} strokeWidth={2.5} />
            )}
          </button>
        )}
      </div>
      {error && (
        <span className="mt-1.5 ml-1 text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};
