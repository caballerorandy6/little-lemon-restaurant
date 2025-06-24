import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useLittleLemonStore } from "@/store/little-lemon-store";

export default function MealsCards() {
  const { cart } = useLittleLemonStore();

  return (
    <ul className="divide-y divide-gray-200 border-t border-b border border-gray-200 bg-white/80 backdrop-blur p-8 rounded-lg shadow-md">
      {cart.map((item) => (
        <li key={item.item.id} className="flex flex-col sm:flex-row gap-4 py-6">
          <div className="shrink-0">
            <Image
              width={96}
              height={96}
              src={item.item.strMealThumb}
              alt={item.item.strMeal}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-md object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div>
              <div className="flex justify-between">
                <h4 className="text-sm font-medium text-gray-700">
                  <p className="hover:text-gray-800 font-semibold">
                    {item.item.strMeal}
                  </p>
                </h4>
                <p className="text-sm font-medium text-gray-900">
                  ${item.item.price.toFixed(2)}
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{item.item.strArea}</p>
              <Link
                href={item.item.strYoutube ?? "#"}
                className="mt-1 text-sm text-blue-500 hover:text-blue-600 transition-colors"
              >
                {item.item.strYoutube}
              </Link>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="flex items-center text-sm text-gray-700 gap-1">
                <CheckIcon className="h-5 w-5 text-green-500" />
                {item.quantity} {item.quantity > 1 ? "meals" : "meal"} in cart
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
