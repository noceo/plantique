import { IngredientOnRecipe } from "./ingredient.interface";
import User from "./user.interface";

export default interface Recipe {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  published: boolean;
  authorId: number;
  author?: User;
  ingredients?: IngredientOnRecipe[];
}

export interface RecipeMutation {
  title: string;
  description: string;
  authorId: number;
  ingredients: {
    id: number;
    quantity: number;
    unit: "CUP" | "TABLESPOON" | "TEASPOON" | "OUNCE";
  }[];
}
