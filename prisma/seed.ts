import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@littlelemon.com" },
    update: {},
    create: {
      name: "Randy Caballero",
      email: "admin@littlelemon.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Created Admin:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
