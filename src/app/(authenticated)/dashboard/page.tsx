"use client";

import CurrentUserClient from "@/components/public/CurrentUserClient";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import MealsCards from "@/components/authenticated/MealsCards";
import ProfileInfo from "@/components/authenticated/ProfileInfo";
import ReservationsCards from "@/components/authenticated/ReservationsCards";
import ReviewsCards from "@/components/authenticated/ReviewsCards";
import { useDashboardStore } from "@/store/dashboard-store";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { useReservationStore } from "@/store/reservation-store";
import CountUp from "react-countup";

function DashboardPage() {
  const { activeTab, setActiveTab } = useDashboardStore();
  const { cart } = useLittleLemonStore();
  const { userReservations } = useReservationStore();

  function classNames(
    ...classes: (string | false | null | undefined)[]
  ): string {
    return classes.filter(Boolean).join(" ");
  }

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const stats = [
    {
      title: "Cart Items",
      value: (
        <CountUp
          end={cart.reduce((acc, item) => acc + item.quantity, 0)}
          duration={2}
        />
      ),
    },
    {
      title: "Reservations",
      value: <CountUp end={userReservations.length} duration={2} />, // Replace with actual reservations count
    },
    {
      title: "Reviews",
      value: <CountUp end={100} duration={2} />, // Replace with actual reviews count
    },
  ];

  const tabs = [
    { name: "Profile Info", href: "#", current: false },
    { name: "Reservations", href: "#", current: false },
    { name: "My Cart", href: "#", current: false },
    { name: "Reviews", href: "#", current: true },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <CurrentUserClient />
      <div className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base/7 text-gray-600">{stat.title}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:hidden">
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            defaultValue={tabs.find((tab) => tab.current)?.name}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
          />
        </div>

        <div className="hidden sm:block mt-10">
          <div className="border-b border-gray-200">
            <nav aria-label="Tabs" className="-mb-px flex">
              {tabs.map((tab) => (
                <button
                  onClick={() => handleTabChange(tab.name)}
                  value={tab.name}
                  key={tab.name}
                  className={classNames(
                    tab.name === activeTab
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "w-1/4 border-b-2 px-1 py-4 text-center text-sm font-medium cursor-pointer transition-colors"
                  )}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-4">
          {activeTab === "Reservations" && <ReservationsCards />}
          {activeTab === "My Cart" && <MealsCards />}
          {activeTab === "Profile Info" && <ProfileInfo />}
          {activeTab === "Reviews" && <ReviewsCards />}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
