'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Heading } from '@/shared/components/atoms/Heading';
import { Button } from '@/shared/components/atoms/Button';
import { FormField } from '@/shared/components/molecules/FormField';
import { Mail, Lock, User, Loader } from 'lucide-react';
import { showToast } from '@/shared/utils/toast.util';
import { useRouter } from 'next/navigation';
import { PAGE_ROUTES } from '@/shared/utils/constants';
import { authService } from '../services/auth.api.service';

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [loading, setLoading] = useState(false);

  const onChangeInputField = (value: string, key: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const error: Partial<typeof formData> = {};
    if (!formData.name) error.name = 'name is required';
    if (!formData.email || !formData.email.includes('@')) error.email = 'email is not valid';
    if (!formData.password || formData.password.length < 5) error.password = 'password must be at least 5 characters';
    if (formData.password !== formData.confirmPassword) error.confirmPassword = 'passwords do not match';
    return error;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const data = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });
      if (!data.success) throw new Error(data.message || 'registration failed');
      showToast.success('Successfully Registered');
      router.push(PAGE_ROUTES.HOME);
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
          Join Us
        </Heading>
        <p className='text-neutral-500 font-medium'>Create an account and start your premium shopping journey.</p>
      </div>

      <form className='space-y-6' onSubmit={onSubmit}>
        <FormField
          id='name'
          label='Full Name'
          type='text'
          placeholder='Enter your name'
          required
          icon={User}
          value={formData.name}
          onChange={(e) => onChangeInputField(e.target.value, 'name')}
          error={errors.name}
        />
        <FormField
          id='email'
          label='Email Address'
          type='email'
          placeholder='Enter your email'
          required
          icon={Mail}
          value={formData.email}
          onChange={(e) => onChangeInputField(e.target.value, 'email')}
          error={errors.email}
        />
        <FormField
          id='password'
          label='Password'
          type='password'
          placeholder='••••••••'
          required
          icon={Lock}
          value={formData.password}
          onChange={(e) => onChangeInputField(e.target.value, 'password')}
          error={errors.password}
        />
        <FormField
          id='confirmPassword'
          label='Confirm Password'
          type='password'
          placeholder='••••••••'
          required
          icon={Lock}
          value={formData.confirmPassword}
          onChange={(e) => onChangeInputField(e.target.value, 'confirmPassword')}
          error={errors.confirmPassword}
        />

        <div className='flex items-start'>
          <label className='flex items-start group cursor-pointer'>
            <input
              type='checkbox'
              className='mt-1 w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer transition-all'
              required
            />
            <span className='ml-3 text-sm text-neutral-600 leading-relaxed group-hover:text-neutral-900 transition-colors'>
              I agree to the{' '}
              <a href='#' className='font-bold text-neutral-900 underline underline-offset-2'>
                Terms
              </a>{' '}
              and{' '}
              <a href='#' className='font-bold text-neutral-900 underline underline-offset-2'>
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>

        <Button
          type='submit'
          fullWidth
          disabled={loading}
          className='h-12 text-base font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-none'
        >
          {loading ? <Loader className='mx-auto' strokeWidth={'2px'} color='#fff' /> : 'CREATE ACCOUNT'}
        </Button>

        <div className='relative my-10'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-neutral-100'></div>
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='px-4 bg-[#fdfdfd] text-neutral-400 font-bold tracking-[0.2em]'>Or join with</span>
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
          Already have an account?{' '}
          <a
            href='/login'
            className='font-bold text-neutral-900 hover:opacity-70 transition-opacity border-b-2 border-neutral-900 pb-0.5'
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};
