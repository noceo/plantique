"use client";

import RecipeList from "@/components/RecipeList/RecipeList";
import { UserContext, useUser } from "@/shared/context/UserContext.context";
import useRecipes from "@/shared/hooks/use-recipes.hook";
import Link from "next/link";

export default function MyRecipes() {
  const { user } = useUser() as UserContext;
  const { data, isLoading, isError, error, status } = useRecipes({
    endpoint: "?userID=1",
    accessToken: user?.accessToken,
  });
  const recipes = data || [];

  return (
    <div className="my-recipes">
      <div className="my-recipes__header">
        <h1>My Recipes</h1>
        <Link href="/profile/my-recipes/create">Add Recipe</Link>
      </div>
      <div className="my-recipes__content">
        {isError && <p>Error: {JSON.stringify(error)}</p>}
        {isLoading ? <p>Loading</p> : <RecipeList recipes={recipes} />}
      </div>
    </div>
  );
}
