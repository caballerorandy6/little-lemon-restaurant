import { getCurrentUser } from "@/libs/auth/getCurrentUser";
import { redirect } from "next/navigation";

const AdminPanel = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <section id="admin-panel">
      <h1>Welcome {user.name}</h1>
      <h2>Admin Panel</h2>
    </section>
  );
};

export default AdminPanel;
