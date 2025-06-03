export type CartItem = {
  item: MealAPI;
  quantity: number;
  image: string;
};

export type Role = "ADMIN" | "USER";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  reservations?: ReservationAPI[];
  reviews?: Review[];
  createdAt: string; // o Date
  updatedAt: string; // o Date
};

//Type for TheMealDB API
export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};

// Type for the API response
export type CategoryAPI = {
  id: number;
  strCategory: string;
  description: string;
  thumb: string;
};

// Type for TheMealDB API
export type Meal = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
};

// Type for the API response
export type MealAPI = {
  id: number;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strArea?: string | null;
  strTags?: string | null;
  strYoutube?: string | null;
  ingredients?: Ingredient[] | null;
  categoryId: number;
  category: CategoryAPI;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
  price: number;
};

export type Review = {
  id: number;
  userId: number;
  mealId: number;
  rating: number;
  comment: string;
  createdAt: string; // o Date
  user?: User;
  meal?: MealAPI;
};

export type ReservationAPI = {
  id: number;
  userId: number;
  date: string; // o Date
  time: string;
  guests: number;
  // createdAt: string; // o Date
  // user?: User;
};

export type Ingredient = {
  ingredient: string;
  measure: string;
};
