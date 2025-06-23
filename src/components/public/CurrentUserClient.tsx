"use client";

import { useEffect } from "react";
import { Suspense } from "react";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { useRouter } from "next/navigation";
import WelcomeUser from "@/components/public/WelcomeUser";

const CurrentUserClient = () => {
  const { user } = useLittleLemonStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <Suspense fallback={<WelcomeUser />}>
      <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900">
        {user ? (
          `Welcome, ${user.name}`
        ) : (
          <span className="inline-block h-6 w-52 animate-pulse rounded bg-gray-200" />
        )}
      </h2>
    </Suspense>
  );
};

export default CurrentUserClient;
