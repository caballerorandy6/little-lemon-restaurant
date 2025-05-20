import { getCurrentUser } from "@/libs/auth/getCurrentUser";
import { redirect } from "next/navigation";

const CurrentUserServer = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "ADMIN") {
    redirect("/admin-panel");
  }

  return <section>Welcome, {user.name}</section>;
};

export default CurrentUserServer;
