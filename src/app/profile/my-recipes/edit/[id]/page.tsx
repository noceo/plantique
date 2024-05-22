"use client";

import RecipeForm from "@/components/Forms/RecipeForm/RecipeForm";
import { UserContext, useUser } from "@/shared/context/UserContext.context";
import useRecipes from "@/shared/hooks/use-recipes.hook";
import Recipe from "@/shared/interfaces/recipe.interface";
import { boolean } from "zod";

interface EditRecipeProps {
  recipe: Recipe;
  params: {
    id: string;
  };
}

export default function EditRecipe({ params }: EditRecipeProps) {
  const { user } = useUser() as UserContext;
  const {
    data: recipe,
    isLoading,
    isRefetching,
  } = useRecipes({
    endpoint: `/${params.id}`,
    queryKey: `recipe.${params.id}`,
    accessToken: user?.accessToken,
  });
  console.log(params.id, recipe);

  return (
    <div className="my-recipes">
      <div className="my-recipes__header">
        <h1>Edit Recipe</h1>
      </div>
      <div className="my-recipes__content">
        {isLoading || isRefetching ? (
          <p>Loading</p>
        ) : (
          <RecipeForm recipe={recipe as Recipe} />
        )}
      </div>
    </div>
  );
}
