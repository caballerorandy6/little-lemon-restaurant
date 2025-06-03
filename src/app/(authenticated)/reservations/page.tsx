import { Suspense } from "react";
import { Metadata } from "next";
import ReservationForm from "@/components/public/ReservationForm";
import ReservationList from "@/components/authenticated/ReservationList";

export const metadata: Metadata = {
  title: "Reservation Page",
  description: "Make a reservation at our restaurant.",
};

const ReservationPage = () => {
  return (
    <>
      <ReservationForm />
      <Suspense fallback={<div>Loading reservations...</div>}>
        <ReservationList />
      </Suspense>
    </>
  );
};

export default ReservationPage;
