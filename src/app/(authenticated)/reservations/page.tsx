import { Metadata } from "next";
import ReservationForm from "@/components/forms/ReservationForm";
import ReservationList from "@/components/authenticated/ReservationList";

export const metadata: Metadata = {
  title: "Reservation Page",
  description: "Make a reservation at our restaurant.",
};

const ReservationPage = () => {
  return (
    <>
      <ReservationForm />
      <ReservationList />
    </>
  );
};

export default ReservationPage;
