"use client";
import React, { useState } from "react";
import { Heading } from "@/shared/components/atoms/Heading";
import { Button } from "@/shared/components/atoms/Button";
import { FormField } from "@/shared/components/molecules/FormField";
import { Lock, Loader } from "lucide-react";
import { showToast } from "@/shared/utils/toast.util";
import { useRouter, useSearchParams } from "next/navigation";
import { postApi } from "@/shared/utils/api-connector";
import { API_PATHS } from "@/config/api.path";

export const InviteForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get('inviteToken');

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const error: { password?: string; confirmPassword?: string } = {};

    if (!password || password.length < 5 || password.length > 10) {
      error.password = "Password must be between 5 and 10 characters";
    }

    if (password !== confirmPassword) {
      error.confirmPassword = "Passwords do not match";
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
    
      await postApi(API_PATHS.admin.register, { password, confirmPassword, inviteToken })
      
      showToast.success("Account Activate successfully!");
      router.push("/admin");
    } catch (error: any) {
      showToast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <Heading
          level={2}
          className="text-4xl font-black mb-3 text-neutral-900"
        >
          Set Password
        </Heading>
        <p className="text-neutral-500 font-medium">
          Welcome to eRath! Please set your password to activate your account.
        </p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          icon={Lock}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.password}
        />
        <FormField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          required
          icon={Lock}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={errors.confirmPassword}
        />

        <Button
          disabled={loading}
          type="submit"
          fullWidth
          className="h-12 text-base font-bold bg-neutral-900 hover:bg-neutral-800 text-white rounded-none mt-4"
        >
          {loading ? (
            <Loader className="mx-auto" strokeWidth={"2px"} color="#fff" />
          ) : (
            "ACTIVATE ACCOUNT"
          )}
        </Button>
      </form>
    </div>
  );
};
