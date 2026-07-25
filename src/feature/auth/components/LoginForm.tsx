'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Heading } from '@/shared/components/atoms/Heading';
import { Button } from '@/shared/components/atoms/Button';
import { FormField } from '@/shared/components/molecules/FormField';
import { Mail, Lock } from 'lucide-react';
import { API_PATHS, BASE_URL } from '@/config/api.path';
import { Loader } from 'lucide-react';
import { showToast } from '@/shared/utils/toast.util';
import { EROLE } from '../types/auth.type';
import { useRouter } from 'next/navigation';
import { PAGE_ROUTES } from '@/shared/utils/constats';

type loginCredential = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loginCredential, setLoginCredential] = useState<loginCredential>({
    email: '',
    password: '',
  });
  const [errors, setErros] = useState<Partial<loginCredential>>({});
  const [loading, setLoading] = useState(false);

  const onChangeInputField = (value: string, key: string) => {
    setLoginCredential((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const validateLoginCredential = (loginCredential: loginCredential) => {
    const error: Partial<loginCredential> = {};

    if (loginCredential.email === '' || !loginCredential.email.includes('@')) {
      error.email = 'email is not valid';
    }

    if (
      loginCredential.password === '' ||
      loginCredential.password.length < 5 ||
      loginCredential.password.length > 10
    ) {
      error.password = 'password is not valid';
    }

    return error;
  };

  const onSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    const errors = validateLoginCredential(loginCredential);

    if (Object.keys(errors).length > 0) {
      setErros(errors);
      return;
    }

    setErros({});

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/${API_PATHS.auth.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredential),
        credentials: 'include',
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || 'something went wrong');
      }
      showToast.success('Successfully Login');

      if (data.user.role === EROLE.USER) {
        router.push(PAGE_ROUTES.HOME);
        return;
      }

      router.push(PAGE_ROUTES.DASHBOARD.HOME);
    } catch (error: any) {
      showToast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full'>
      <div className='mb-10'>
        <Heading level={2} className='text-4xl font-black mb-3 text-neutral-900'>
          Sign In
        </Heading>
        <p className='text-neutral-500 font-medium'>Welcome back! Please enter your details to access your account.</p>
      </div>

      <form className='space-y-6' onSubmit={onSubmit}>
        <FormField
          id='email'
          label='Email Address'
          type='email'
          placeholder='Enter your email'
          required
          icon={Mail}
          value={loginCredential.email}
          onChange={(event) => {
            onChangeInputField(event.target.value, 'email');
          }}
          error={errors.email}
        />
        <FormField
          id='password'
          label='Password'
          type='password'
          placeholder='••••••••'
          required
          icon={Lock}
          value={loginCredential.password}
          onChange={(event) => {
            onChangeInputField(event.target.value, 'password');
          }}
          error={errors.password}
        />

        <div className='flex items-center justify-between'>
          <label className='flex items-center group cursor-pointer'>
            <input
              type='checkbox'
              className='w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer transition-all'
            />
            <span className='ml-2 text-sm text-neutral-600 group-hover:text-neutral-900 transition-colors'>
              Stay signed in
            </span>
          </label>
          <a href='#' className='text-sm font-bold text-neutral-900 hover:opacity-70 transition-opacity'>
            Forgot password?
          </a>
        </div>

        <Button
          disabled={loading}
          type='submit'
          fullWidth
          className='h-12 text-base font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-none'
        >
          {loading ? <Loader className='mx-auto' strokeWidth={'2px'} color='#fff' /> : 'SIGN IN'}
        </Button>

        <div className='relative my-10'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-neutral-100'></div>
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='px-4 bg-[#fdfdfd] text-neutral-400 font-bold tracking-[0.2em]'>Or continue with</span>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4'>
          <Button
            variant='secondary'
            className='flex items-center justify-center gap-3 h-12 rounded-none border-neutral-200 hover:bg-neutral-50 group/btn transition-all'
          >
            <Image
              src='/icons/google.svg'
              alt='Google'
              width={20}
              height={20}
              className='transition-transform group-hover/btn:scale-110'
            />
            <span className='font-bold text-neutral-700'>GOOGLE</span>
          </Button>
        </div>

        <p className='mt-10 text-center text-sm text-neutral-500 font-medium'>
          New to eRath?{' '}
          <a
            href='/register'
            className='font-bold text-neutral-900 hover:opacity-70 transition-opacity border-b-2 border-neutral-900 pb-0.5'
          >
            Create an Account
          </a>
        </p>
      </form>
    </div>
  );
};
