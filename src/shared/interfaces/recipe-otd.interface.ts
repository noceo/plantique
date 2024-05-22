import Recipe from "./recipe.interface";

export default interface RecipeOTD {
  id: number;
  pickedAt: Date;
  recipe: Recipe;
}
