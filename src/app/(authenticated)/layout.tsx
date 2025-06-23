import { getCurrentUser } from "@/libs/auth/getCurrentUser";
import { redirect } from "next/navigation";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <div className="relative isolate bg-white px-6 lg:px-8 pt-32">
      {children}
    </div>
  );
}
