import React from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({ level = 1, children, className = '' }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const styles = {
    1: 'text-4xl font-extrabold tracking-tight text-gray-900',
    2: 'text-3xl font-bold tracking-tight text-gray-900',
    3: 'text-2xl font-bold text-gray-900',
    4: 'text-xl font-semibold text-gray-900',
    5: 'text-lg font-semibold text-gray-900',
    6: 'text-base font-semibold text-gray-900',
  };

  return (
    <Tag className={`${styles[level]} ${className}`}>
      {children}
    </Tag>
  );
};
