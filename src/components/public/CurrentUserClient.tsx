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
    }
  }, [router, user]);

  return (
    <Suspense fallback={<WelcomeUser />}>
      <h1 className="text-xl font-semibold text-green-800 mb-10">{`Welcome, ${user?.name
        .split(" ")
        .slice(0, 1)
        .join("")}`}</h1>
    </Suspense>
  );
};

export default CurrentUserClient;
