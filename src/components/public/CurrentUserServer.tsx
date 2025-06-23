// components/ServerUserInfo.tsx
import { getCurrentUser } from "@/libs/auth/getCurrentUser";

const CurrentUserServer = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
        Welcome to Little Lemon
      </h2>
    );
  }

  return (
    <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
      Welcome, {user.name}
    </h2>
  );
};

export default CurrentUserServer;
