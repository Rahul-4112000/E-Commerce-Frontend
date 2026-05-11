import { AuthTemplate } from "@/feature/auth/components/AuthTemplate";
import { RegisterForm } from "@/feature/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthTemplate>
      <RegisterForm />
    </AuthTemplate>
  );
}
