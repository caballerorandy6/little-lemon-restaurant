import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getCurrentUser } from "@/libs/auth/getCurrentUser";
import { formatDateToDDMMYYYY } from "@/libs/utils";
import { updateExpiredReservations } from "@/libs/server";
import { parse } from "date-fns";

// Create a new reservation for the current user
export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  try {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { date, time, guests } = body;

    if (!date || !time || !guests) {
      return NextResponse.json(
        { error: "Date, time, and guests are required" },
        { status: 400 }
      );
    }

    // The frontend sends the date as MM/dd/yyyy, so we parse it accordingly
    const parsedDate = parse(date, "MM/dd/yyyy", new Date());

    const reservation = await prisma.reservation.create({
      data: {
        userId: user.id,
        date: parsedDate,
        time,
        guests,
      },
    });

    return NextResponse.json(
      {
        ...reservation,
        date: formatDateToDDMMYYYY(reservation.date.toString()),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Get all reservations for the current user
export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await updateExpiredReservations(user.id);

    const reservations = await prisma.reservation.findMany({
      where: { userId: user.id },
      orderBy: { date: "asc" },
    });

    const formattedReservations = reservations.map((reservation) => ({
      ...reservation,
      date: formatDateToDDMMYYYY(reservation.date.toString()),
    }));

    return NextResponse.json(
      { reservations: formattedReservations },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching/updating reservations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// This function deletes the reservation of the current user
export async function DELETE() {
  const user = await getCurrentUser();
  try {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reservation = await prisma.reservation.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }
    await prisma.reservation.delete({
      where: {
        id: reservation.id,
      },
    });

    return NextResponse.json(
      { message: "Reservation deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//Update the reservation by ID
export async function PUT(request: NextRequest) {
  const user = await getCurrentUser();
  try {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, date, time, guests, status } = body;

    if (!id || !date || !time || !guests || !status) {
      return NextResponse.json(
        { error: "ID, date, time, and guests are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!existing || existing.userId !== user.id) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    console.log("Existing reservation found:", existing);

    const reservation = await prisma.reservation.update({
      where: { id },
      data: {
        date: new Date(date),
        time,
        guests,
        status: status || existing.status,
      },
    });

    console.log("Reservation updated:", reservation);

    return NextResponse.json(reservation, { status: 200 });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
