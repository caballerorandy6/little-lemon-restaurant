"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSectionObserver from "@/libs/hooks/useSectionObserver";
import { reservationSchema, ReservationFormData } from "@/libs/zod";
import { toast } from "sonner";
import { ErrorMessage } from "@hookform/error-message";
import { useReservationStore } from "@/store/reservation-store";
// import { useRouter } from "next/navigation";
// import { createReservation } from "@/actions/reservations";
import { formatDateToMMDDYYYY } from "@/libs/utils";

const ReservationForm = () => {
  const { setUserReservations } = useReservationStore();
  const ref = useSectionObserver({ sectionName: "Reservation" });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    mode: "onChange",
  });

  // const onSubmit = async (data: ReservationFormData) => {
  //   try {
  //     const response = await fetch("/api/reservations", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) {
  //       toast.error("Failed to create reservation. Please try again.");
  //       return;
  //     }

  //     const result = await response.json();

  //     const fixedResult = {
  //       ...result,
  //       date: result.date.split("/").reverse().join("-"),
  //     };

  //     addUserReservation(fixedResult);
  //     //router.push("/reservations");

  //     toast.success("Reservation created successfully!");
  //     reset();

  //     console.log("Reservation created:", result);
  //   } catch (error) {
  //     console.error("Error creating reservation:", error);
  //     toast.error("An error occurred while creating the reservation.");
  //   }
  // };

  const onSubmit = async (data: ReservationFormData) => {
    try {
      const formattedDate = formatDateToMMDDYYYY(data.date);

      const response = await fetch("/api/reservations", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, date: formattedDate }),
      });

      if (!response.ok) {
        toast.error("Failed to create reservation. Please try again!");
        return;
      }

      //Updating Zustand store
      const newReservation = await response.json();

      setUserReservations((prevReservations) => [
        ...prevReservations,
        newReservation,
      ]);

      reset();
      toast.success("Reservation created successfully!");
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast.error("An error occurred while creating the reservation.");
    }
  };

  return (
    <section
      id="reservation"
      ref={ref}
      className="bg-white/80 backdrop-blur p-8 rounded-lg shadow-md max-w-xl mx-auto  mb-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Looking to dine with us?
        </h2>
        <p className="mt-2 text-lg text-gray-600">Book your table now!</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-10 max-w-xl sm:mt-12"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-bold text-gray-900"
            >
              Reservation Date
            </label>
            <div className="mt-2">
              <input
                {...register("date")}
                id="date"
                type="date"
                autoComplete="date"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
              />

              <ErrorMessage
                errors={errors}
                name="date"
                render={({ message }) => (
                  <p className="text-red-500 text-sm mt-1">{message}</p>
                )}
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-bold text-gray-900"
            >
              Reservation Time
            </label>
            <div className="mt-2">
              <input
                {...register("time")}
                id="time"
                type="time"
                autoComplete="time"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
              />
              <ErrorMessage
                errors={errors}
                name="time"
                render={({ message }) => (
                  <p className="text-red-500 text-sm mt-1">{message}</p>
                )}
              />
            </div>
          </div>

          {/* Guests */}
          <div>
            <label
              htmlFor="guests"
              className="block text-sm font-bold text-gray-900"
            >
              Number of Guests
            </label>
            <div className="mt-2">
              <input
                id="guests"
                type="number"
                min={1}
                max={50}
                {...register("guests")}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
              />
              <ErrorMessage
                errors={errors}
                name="guests"
                render={({ message }) => (
                  <p className="text-red-500 text-sm mt-1">{message}</p>
                )}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            id="reserve-button"
            type="submit"
            disabled={!isValid || isSubmitting}
            className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            {isSubmitting ? "Reserving..." : "Reserve Now"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ReservationForm;
