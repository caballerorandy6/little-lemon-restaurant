"use server";

import { prisma } from "@/libs/prisma";

export async function getCategoriesAction() {
  const categories = await prisma.category.findMany({
    include: {
      meals: true,
    },
  });
  return categories;
}
