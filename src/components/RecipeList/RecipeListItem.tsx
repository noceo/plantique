"use client";

import Recipe from "@/shared/interfaces/recipe.interface";
import Link from "next/link";
import Button from "../Button/Button";
import TrashIcon from "@/../public/icons/trash.svg";
import useRecipeMutation from "@/shared/hooks/use-recipes-mutation.hook";
import { UserContext, useUser } from "@/shared/context/UserContext.context";

interface RecipeListItemProps {
  recipe: Recipe;
}

export default function RecipeListItem({ recipe }: RecipeListItemProps) {
  const { user } = useUser() as UserContext;
  const deleteRecipeMutation = useRecipeMutation({
    method: "DELETE",
    endpoint: `/${recipe.id}`,
    mutationKey: `recipe.${recipe.id}`,
    accessToken: user?.accessToken,
  });

  const onRemoveClick = async () => {
    await deleteRecipeMutation.mutateAsync(undefined);
  };

  return (
    <div className="recipe-list-item">
      {deleteRecipeMutation.isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link className="" href={`/profile/my-recipes/edit/${recipe.id}`}>
            <span>{recipe.title}</span>
          </Link>
          <Button variant="icon-square" color="danger" onClick={onRemoveClick}>
            <TrashIcon />
          </Button>
        </>
      )}
    </div>
  );
}
