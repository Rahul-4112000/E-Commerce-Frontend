import React from 'react';
import { AuthTemplate } from './AuthTemplate';
import Link from 'next/link';
import { PAGE_ROUTES } from '@/shared/utils/constants';
import { ShieldAlert } from 'lucide-react';

const InvalidInvite = () => {
  return (
    <AuthTemplate>
      <div className='w-full flex flex-col items-center justify-center text-center py-10'>

        {/* Icon */}
        <div className='bg-red-50 p-5 rounded-full mb-6'>
          <ShieldAlert className='w-12 h-12 text-red-500' strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <h2 className='text-3xl font-black text-neutral-900 mb-3'>
          Invitation Invalid or Expired
        </h2>

        {/* Description */}
        <p className='text-neutral-500 font-medium max-w-sm mx-auto mb-2'>
          This invitation link is no longer valid. It may have already been used or the expiry time has passed.
        </p>
        <p className='text-neutral-400 text-sm max-w-sm mx-auto mb-8'>
          Please contact your administrator to request a new invitation.
        </p>

        {/* Divider */}
        <div className='w-full border-t border-neutral-100 mb-8' />

        {/* CTA */}
        <Link
          href={PAGE_ROUTES.AUTH.LOGIN}
          className='inline-flex items-center justify-center w-full h-12 text-base font-bold bg-neutral-900 hover:bg-neutral-800 text-white transition-colors'
        >
          BACK TO LOGIN
        </Link>

      </div>
    </AuthTemplate>
  );
};

export default InvalidInvite;
