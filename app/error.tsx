'use client';

import Link from 'next/link';
import { Shirt, ArrowRight, RotateCcw } from 'lucide-react';

export default function Error({ reset }: { error: Error & { digest?: string }; reset?: () => void }) {
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center px-4 text-center'>
      <div className='relative mb-8 animate-fade-in-up'>
        <Shirt className='w-24 h-24 text-gray-200' strokeWidth={1} />
        <div className='absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-sm border border-gray-100'>
          <span className='text-xl font-bold text-gray-900'>!</span>
        </div>
      </div>

      <h1 className='text-4xl md:text-5xl font-light text-gray-900 tracking-tight mb-4'>
        A slight <span className='font-semibold'>Snag</span>.
      </h1>

      <p className='text-gray-500 max-w-md mb-10 text-lg'>
        We encountered an issue while retrieving your dashboard. Let's try smoothing things out.
      </p>

      <div className='flex flex-col sm:flex-row gap-4 items-center'>
        <button
          onClick={() => {
            if (reset) {
              reset();
            } else {
              window.location.reload();
            }
          }}
          className='group flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5'
        >
          <RotateCcw className='w-4 h-4 group-hover:-rotate-90 transition-transform' />
          <span>Try Again</span>
        </button>

        <Link
          href='/'
          className='group flex items-center gap-2 bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-full font-medium transition-all hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5'
        >
          <span>Return Home</span>
          <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
        </Link>
      </div>
    </div>
  );
}
