import { MenuItem } from "@prisma/client";

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};
