import { Unit } from "./unit.interface";

export default interface Ingredient {
  id: number;
  name: string;
}

export interface IngredientOnRecipe {
  ingredient: Ingredient;
  quantity: number;
  unit: Unit | null;
}
