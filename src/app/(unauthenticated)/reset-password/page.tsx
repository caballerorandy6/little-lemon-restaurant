import { Suspense } from "react";
import ResetPasswordForm from "@/components/unauthenticated/ResetPasswordForm";
import ResetPasswordFormSkeleton from "@/components/public/ResetPasswordFormSkeleton";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<ResetPasswordFormSkeleton />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
