"use client";
import React from "react";
import { Heading } from "@/shared/components/atoms/Heading";
import { Button } from "@/shared/components/atoms/Button";
import { FormField } from "@/shared/components/molecules/FormField";
import { Mail, Lock } from "lucide-react";

export const RegisterForm: React.FC = () => {
  return (
    <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20">
      <div className="text-center mb-8">
        <Heading level={2} className="mb-2">
          Create Account
        </Heading>
        <p className="text-gray-500 font-medium">
          Join eRath and start your journey
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <FormField
          id="email"
          label="Email Address"
          type="email"
          placeholder="name@company.com"
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

        <div className="flex items-center mb-6">
          <label className="flex items-start group cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              required
            />
            <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
              I agree to the{" "}
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-semibold text-indigo-600 hover:underline"
              >
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        <Button type="submit" fullWidth>
          Create Account
        </Button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="px-2 bg-white text-gray-400 font-medium tracking-wider">
              Or sign up with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            className="flex items-center justify-center gap-2 group/btn"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover/btn:scale-110"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button
            variant="secondary"
            className="flex items-center justify-center gap-2 group/btn"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover/btn:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            GitHub
          </Button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors underline decoration-2 decoration-indigo-100 underline-offset-4"
          >
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};
