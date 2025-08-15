"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/libs/auth/getCurrentUser";
import { revalidatePath } from "next/cache";
import { ReservationFormData } from "@/libs/zod";

//Create a reservation
export async function createReservation(
  data: ReservationFormData
): Promise<ReservationFormData> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const { date, time, guests } = data;

  if (!date || !time || !guests) {
    throw new Error("Date, time, and guests are required");
  }

  const reservation = await prisma.reservation.create({
    data: {
      userId: user.id,
      date: new Date(`${date}T${time}`),
      time,
      guests,
    },
  });

  revalidatePath("/reservations");

  return {
    ...reservation,
    date: reservation.date.toISOString().split("T")[0],
  };
}

export async function getReservations() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  // Fetch reservations for the current user
  const reservations = await prisma.reservation.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: "desc",
    },
  });

  return reservations.map((r) => ({
    ...r,
    date: r.date.toISOString().split("T")[0], // "YYYY-MM-DD"
  }));
}
