import LoginLayout from "@/src/app/login/_components/LoginLayout";
import ResetPasswordForm from "@/src/app/login/_components/ResetPasswordForm";

export const dynamic = "force-dynamic";

export default function ResetPasswordPage() {
  return (
    <LoginLayout>
      <ResetPasswordForm />
    </LoginLayout>
  );
}
