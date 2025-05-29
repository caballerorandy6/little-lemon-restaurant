// src/libs/prisma.ts
import { PrismaClient } from "@prisma/client";
import { Meal, Category, Review, User } from "@prisma/client";

export type CategoryAPI = Category;

export type ReviewAPI = Review & {
  user: User;
};

export type MealAPI = Meal & {
  category: CategoryAPI;
  reviews: ReviewAPI[];
  price: number;
};

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
