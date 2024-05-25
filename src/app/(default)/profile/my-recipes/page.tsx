"use client";

import Button from "@/components/Button/Button";
import RecipeList from "@/components/RecipeList/RecipeList";
import { UserContext, useUser } from "@/shared/context/UserContext.context";
import useRecipes from "@/shared/hooks/use-recipes.hook";
import PlusIcon from "@/../public/icons/plus.svg";
import Recipe from "@/shared/interfaces/recipe.interface";

export default function MyRecipes() {
  const { user } = useUser() as UserContext;
  const {
    data: recipes,
    isLoading,
    isRefetching,
    isError,
    error,
  } = useRecipes({
    endpoint: "?userID=1",
    accessToken: user?.accessToken,
  });

  return (
    <div className="my-recipes">
      <div className="my-recipes__header">
        <h1>My Recipes</h1>
        <Button variant="icon-only" href="/profile/my-recipes/create">
          <PlusIcon />
        </Button>
      </div>
      <div className="my-recipes__content">
        {isError && <p>Error: {JSON.stringify(error)}</p>}
        {isLoading || isRefetching ? (
          <p>Loading</p>
        ) : (
          <RecipeList recipes={recipes as Recipe[]} />
        )}
      </div>
    </div>
  );
}
