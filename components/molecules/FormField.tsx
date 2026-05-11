import React from 'react';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col mb-4">
      <Label htmlFor={props.id}>{label}</Label>
      <Input error={!!error} {...props} />
      {error && (
        <span className="mt-1.5 ml-1 text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </span>
      )}
    </div>
  );
};
