import Recipe from "@/shared/interfaces/recipe.interface";
import RecipeListItem from "./RecipeListItem";

interface RecipeListProps {
  recipes: Array<Recipe>;
}

export default function RecipeList({ recipes }: RecipeListProps) {
  console.log(recipes);
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeListItem recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}
