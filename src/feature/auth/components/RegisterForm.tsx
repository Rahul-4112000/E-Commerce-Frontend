"use client";
import React from "react";
import Image from "next/image";
import { Heading } from "@/shared/components/atoms/Heading";
import { Button } from "@/shared/components/atoms/Button";
import { FormField } from "@/shared/components/molecules/FormField";
import { Mail, Lock, User } from "lucide-react";

export const RegisterForm: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mb-10">
        <Heading level={2} className="text-4xl font-black mb-3 text-neutral-900">
          Join Us
        </Heading>
        <p className="text-neutral-500 font-medium">
          Create an account and start your premium shopping journey.
        </p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <FormField
          id="name"
          label="Full Name"
          type="text"
          placeholder="Enter your name"
          required
          icon={User}
        />
        <FormField
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
          icon={Mail}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          icon={Lock}
        />
        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          required
          icon={Lock}
        />

        <div className="flex items-start">
          <label className="flex items-start group cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer transition-all"
              required
            />
            <span className="ml-3 text-sm text-neutral-600 leading-relaxed group-hover:text-neutral-900 transition-colors">
              I agree to the{" "}
              <a href="#" className="font-bold text-neutral-900 underline underline-offset-2">Terms</a>{" "}
              and{" "}
              <a href="#" className="font-bold text-neutral-900 underline underline-offset-2">Privacy Policy</a>.
            </span>
          </label>
        </div>

        <Button type="submit" fullWidth className="h-12 text-base font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-none">
          CREATE ACCOUNT
        </Button>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-4 bg-[#fdfdfd] text-neutral-400 font-bold tracking-[0.2em]">
              Or join with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <Button
            variant="secondary"
            className="flex items-center justify-center gap-3 h-12 rounded-none border-neutral-200 hover:bg-neutral-50 group/btn transition-all"
          >
            <Image 
              src="/icons/google.svg" 
              alt="Google" 
              width={20}
              height={20}
              className="transition-transform group-hover/btn:scale-110" 
            />
            <span className="font-bold text-neutral-700">GOOGLE</span>
          </Button>
        </div>

        <p className="mt-10 text-center text-sm text-neutral-500 font-medium">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-bold text-neutral-900 hover:opacity-70 transition-opacity border-b-2 border-neutral-900 pb-0.5"
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};
