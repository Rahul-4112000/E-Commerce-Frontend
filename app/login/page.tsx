import { AuthTemplate } from "@/feature/auth/components/AuthTemplate";
import { LoginForm } from "@/feature/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthTemplate>
      <LoginForm />
    </AuthTemplate>
  );
}
