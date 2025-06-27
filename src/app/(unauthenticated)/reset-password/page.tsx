import { Suspense } from "react";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import ResetPasswordFormSkeleton from "@/components/skeletons/ResetPasswordFormSkeleton";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<ResetPasswordFormSkeleton />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
