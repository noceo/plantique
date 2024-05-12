import Recipe from "@/shared/interfaces/recipe.interface";
import Link from "next/link";

interface RecipeListItemProps {
  recipe: Recipe;
}

export default function RecipeListItem({ recipe }: RecipeListItemProps) {
  return (
    <Link className="recipe-list-item" href="/profile/my-recipes">
      <span>{recipe.title}</span>
    </Link>
  );
}
