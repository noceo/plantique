"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import { z } from "zod";
import FormField from "../FormField/FormField";
import Button from "@/components/Button/Button";
import Recipe, { RecipeMutation } from "@/shared/interfaces/recipe.interface";
import { UserContext, useUser } from "@/shared/context/UserContext.context";
import { Unit } from "@/shared/interfaces/unit.interface";
import { useRouter } from "next/navigation";
import IngredientField from "../IngredientField/IngredientField";
import PlusIcon from "@/../public/icons/plus.svg";
import useIngredients from "@/shared/hooks/use-ingredients.hook";
import { useCallback, useEffect } from "react";
import useRecipeMutation from "@/shared/hooks/use-recipes-mutation.hook";
import IngredientSection from "./IngredientSection";

interface RecipeFormProps {
  recipe?: Recipe;
}

const ingredientSchema = z.object({
  ingredient: z.object({
    id: z.number().int().nonnegative(),
    name: z.string().min(3),
  }),
  quantity: z.number(),
  unit: z.enum(["CUP", "TABLESPOON", "TEASPOON", "OUNCE"]),
});

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  ingredients: z.array(ingredientSchema),
});

export type RecipeFormFields = z.infer<typeof schema>;

export const EmptyIngredient = {
  ingredient: { id: undefined, name: undefined },
  quantity: undefined,
  unit: undefined,
};

export default function RecipeForm({ recipe }: RecipeFormProps) {
  const router = useRouter();
  const { user } = useUser() as UserContext;

  const createRecipeMutation = useRecipeMutation({
    mutationKey: `recipe.${recipe?.id}`,
    method: "POST",
    endpoint: "",
    accessToken: user?.accessToken,
  });

  const updateRecipeMutation = useRecipeMutation({
    mutationKey: `recipe.${recipe?.id}`,
    method: "PUT",
    endpoint: `/${recipe?.id}`,
    accessToken: user?.accessToken,
  });

  const { register, handleSubmit, reset, control, formState } =
    useForm<RecipeFormFields>({
      defaultValues: {
        title: recipe?.title,
        description: recipe?.description,
        // @ts-ignore
        ingredients: recipe?.ingredients || [EmptyIngredient],
      },
      resolver: zodResolver(schema),
      mode: "onBlur",
    });

  useEffect(() => {
    reset();
  }, [recipe, reset]);

  const onSubmit: SubmitHandler<RecipeFormFields> = async (data) => {
    console.log(
      JSON.stringify({
        ...data,
        authorId: user!.id,
      })
    );

    const sanitizedIngredients = data.ingredients.map((el) => {
      const { ingredient, ...data } = el;
      return { ...data, id: el.ingredient.id };
    });
    const recipeMutationData: RecipeMutation = {
      ...data,
      ingredients: sanitizedIngredients,
      authorId: user!.id,
    };

    try {
      if (recipe) {
        await updateRecipeMutation.mutateAsync(recipeMutationData);
      } else {
        await createRecipeMutation.mutateAsync(recipeMutationData);
      }
    } catch (err) {
      console.log(err);
      return;
    }

    router.push("/profile/my-recipes");
  };

  return (
    <form className="form recipe-form" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="title"
        type="text"
        placeholder="Title"
        register={register}
        error={formState.errors.title}
      />
      <FormField
        name="description"
        type="text"
        placeholder="Description"
        register={register}
        error={formState.errors.description}
      />
      <div className="recipe-form__ingredient-section">
        <IngredientSection control={control} formState={formState} />
      </div>
      <div className="recipe-form__submit-btn">
        <Button
          variant="primary"
          disabled={formState.isSubmitting}
          type="submit"
          className="submit-button"
        >
          {formState.isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
