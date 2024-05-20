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
import Recipe from "@/shared/interfaces/recipe.interface";
import { UserContext, useUser } from "@/shared/context/UserContext.context";
import { Unit } from "@/shared/interfaces/unit.interface";
import { useRouter } from "next/navigation";
import IngredientField from "../IngredientField/IngredientField";
import PlusIcon from "@/../public/icons/plus.svg";
import useIngredients from "@/shared/hooks/use-ingredients.hook";

interface RecipeFormProps {
  recipe?: Recipe;
}

const ingredientSchema = z.object({
  id: z.number().int().nonnegative(),
  amount: z.number(),
  unit: z.enum(["CUP", "TABLESPOON", "TEASPOON", "OUNCE"]),
});

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  ingredients: z.array(ingredientSchema),
});

export type RecipeFormFields = z.infer<typeof schema>;

export default function RecipeForm({ recipe }: RecipeFormProps) {
  const router = useRouter();
  const { user } = useUser() as UserContext;
  const {
    data: ingredients,
    isLoading,
    isError,
    error,
  } = useIngredients({
    endpoint: "",
    accessToken: user?.accessToken,
  });
  console.log(ingredients, error, isError, isLoading);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormFields>({
    defaultValues: {
      title: recipe?.title,
      description: recipe?.description,
      // @ts-ignore
      ingredients: recipe?.ingredients || [
        { id: undefined, amount: undefined, unit: undefined },
      ],
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

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
    console.log("Test");
    console.log(
      JSON.stringify({
        ...data,
        authorId: user!.id,
        // ingredients: [{ id: 1, unit: Unit.CUP, quantity: 10 }],
      })
    );
    if (recipe) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    } else {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          authorId: user!.id,
          ingredients: [{ id: 1, unit: Unit.CUP, quantity: 10 }],
        }),
      });

      if (res.ok) {
        router.push("/profile/my-recipes");
      }
    }
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
                  // defaultValue={ingredient || {}}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <>
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
            append({ id: undefined, amount: undefined, unit: undefined });
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
