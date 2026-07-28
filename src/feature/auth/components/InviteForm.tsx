'use client';
import React, { useState } from 'react';
import { Heading } from '@/shared/components/atoms/Heading';
import { Button } from '@/shared/components/atoms/Button';
import { FormField } from '@/shared/components/molecules/FormField';
import { Lock, Loader, User, Mail, Clock } from 'lucide-react';
import { showToast } from '@/shared/utils/toast.util';
import { useRouter, useSearchParams } from 'next/navigation';
import { postApi } from '@/shared/utils/api-connector';
import { API_PATHS } from '@/config/api.path';
import { PAGE_ROUTES } from '@/shared/utils/constants';

interface InviteFormProps {
  email: string;
  expiresAt: string;
  inviteToken: string;
}

function formatExpiry(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export const InviteForm: React.FC<InviteFormProps> = ({ email, expiresAt,inviteToken }) => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const error: { password?: string; confirmPassword?: string } = {};

    if (!password || password.length < 5 || password.length > 10) {
      error.password = 'Password must be between 5 and 10 characters';
    }

    if (password !== confirmPassword) {
      error.confirmPassword = 'Passwords do not match';
    }

    return error;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await postApi(API_PATHS.admins.invitationsAccept, { password, confirmPassword, inviteToken, name });
      showToast.success('Account activated successfully!');
      router.push(PAGE_ROUTES.DASHBOARD.HOME);
    } catch (error: any) {
      showToast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <div className='mb-8'>
        <Heading level={2} className='text-4xl font-black mb-3 text-neutral-900'>
          Activate Account
        </Heading>
        <p className='text-neutral-500 font-medium'>
          Welcome to <span className='font-semibold text-neutral-700'>eRATH</span>! Your invitation has been verified. Please complete your account setup.
        </p>
      </div>

      {/* Expiry notice */}
      <div className='flex items-center gap-2 mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-sm text-amber-700 text-sm font-medium'>
        <Clock size={15} strokeWidth={2.5} className='shrink-0' />
        <span>
          Invitation expires on <span className='font-semibold'>{formatExpiry(expiresAt)}</span>
        </span>
      </div>

      <form className='space-y-6' onSubmit={onSubmit}>
        {/* Email — read-only */}
        <FormField
          id='email'
          label='Email'
          type='email'
          icon={Mail}
          value={email}
          disabled
          readOnly
          className='opacity-60 cursor-not-allowed'
        />

        {/* Name — optional */}
        <FormField
          id='name'
          label='Name (optional)'
          type='text'
          placeholder='Your full name'
          icon={User}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <FormField
          id='password'
          label='Password'
          type='password'
          placeholder='••••••••'
          required
          icon={Lock}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        <FormField
          id='confirmPassword'
          label='Confirm Password'
          type='password'
          placeholder='••••••••'
          required
          icon={Lock}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={errors.confirmPassword}
        />

        <Button
          disabled={loading}
          type='submit'
          fullWidth
          className='h-12 text-base font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-none mt-4'
        >
          {loading ? <Loader className='mx-auto' strokeWidth={'2px'} color='#fff' /> : 'ACTIVATE ACCOUNT'}
        </Button>
      </form>
    </div>
  );
};
