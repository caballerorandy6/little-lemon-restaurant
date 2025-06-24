import type { Metadata } from "next";
import { Roboto_Slab, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navbar from "@/components/public/Navbar";
import StoreHydration from "@/components/public/StoreHydration";
import { getCategories, getMealsByCategory, getSingleMeal } from "@/libs/utils";
import { getCurrentUser } from "@/libs/auth/getCurrentUser";
import { getUserReservationsServerSide } from "@/libs/server";
//import { getCartServerSide } from "@/libs/server";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-title",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Little Lemon",
  description: "Little Lemon Restaurant, a delightful dining experience",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //
  const categoriesPromise = getCategories();
  const mealsByCategoryPromise = categoriesPromise.then((categories) =>
    Promise.all(
      categories.map((category) => getMealsByCategory(category.strCategory))
    ).then((mealsByCategory) => mealsByCategory.flat())
  );
  const singleMealPromise = Promise.all([
    categoriesPromise,
    mealsByCategoryPromise,
  ]).then(([categories, meals]) =>
    getSingleMeal(categories[0]?.strCategory || "", meals[0]?.strMeal || "")
  );
  const currentUser = await getCurrentUser();
  //const cartFromDBPromise = getCartServerSide();
  const userReservationsPromise = getUserReservationsServerSide();

  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <body
        className={`${robotoSlab.variable} ${inter.variable} antialiased text-pretty font-body`}
      >
        <Navbar />
        <StoreHydration
          categoriesPromise={categoriesPromise}
          mealsByCategoryPromise={mealsByCategoryPromise}
          singleMealPromise={singleMealPromise}
          currentUser={currentUser}
          //cartFromDBPromise={cartFromDBPromise}
          userReservationsPromise={userReservationsPromise}
        />
        {children}
        <Toaster position="bottom-right" richColors closeButton={true} />
      </body>
    </html>
  );
}
