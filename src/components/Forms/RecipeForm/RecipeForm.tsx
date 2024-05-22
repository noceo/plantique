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

const EmptyIngredient = {
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
    endpoint: `/${recipe?.id}`,
    accessToken: user?.accessToken,
  });

  const updateRecipeMutation = useRecipeMutation({
    mutationKey: `recipe.${recipe?.id}`,
    method: "PUT",
    endpoint: `/${recipe?.id}`,
    accessToken: user?.accessToken,
  });

  const {
    data: ingredients,
    isLoading,
    isError,
    error,
  } = useIngredients({
    endpoint: "",
    accessToken: user?.accessToken,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormFields>({
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

  const {
    fields: ingredientFields,
    append,
    prepend,
    remove,
    swap,
    move,
    insert,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

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

    // let res;
    if (recipe) {
      // res = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/recipes/${recipe.id}`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       ...data,
      //       authorId: user!.id,
      //     }),
      //   }
      // );
      try {
        await updateRecipeMutation.mutateAsync(recipeMutationData);
      } catch (err) {
        console.log(err);
        return;
      }
    } else {
      // res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     ...data,
      //     authorId: user!.id,
      //     ingredients: [{ id: 1, unit: Unit.CUP, quantity: 10 }],
      //   }),
      // });
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
        error={errors.title}
      />
      <FormField
        name="description"
        type="text"
        placeholder="Description"
        register={register}
        error={errors.description}
      />
      <div className="recipe-form__ingredient-section">
        <h2>Ingredients</h2>
        <ul>
          {isLoading ? (
            <p>Loading</p>
          ) : (
            ingredientFields.map((ingredient, index) => (
              <li key={ingredient.id}>
                <Controller
                  name={`ingredients.${index}`}
                  control={control}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <>
                        {/* {JSON.stringify(value)} */}
                        <IngredientField
                          value={value}
                          onChange={onChange}
                          ingredients={ingredients}
                          errors={errors.ingredients?.[index]}
                        />
                      </>
                    );
                  }}
                ></Controller>
              </li>
            ))
          )}
        </ul>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            // @ts-ignore
            append(EmptyIngredient);
          }}
        >
          Add Ingredient
        </Button>
      </div>
      <div className="recipe-form__submit-btn">
        <Button
          variant="primary"
          disabled={isSubmitting}
          type="submit"
          className="submit-button"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}
