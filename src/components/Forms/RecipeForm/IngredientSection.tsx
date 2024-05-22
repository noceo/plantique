import { UserContext, useUser } from "@/shared/context/UserContext.context";
import useIngredients from "@/shared/hooks/use-ingredients.hook";
import { Control, Controller, FormState, useFieldArray } from "react-hook-form";
import IngredientField from "../IngredientField/IngredientField";
import { RecipeFormFields } from "./RecipeForm";
import Button from "@/components/Button/Button";
import { EmptyIngredient } from "./RecipeForm";

interface IngredientSectionProps {
  control: Control<RecipeFormFields>;
  formState: FormState<RecipeFormFields>;
}

export default function IngredientSection({
  control,
  formState,
}: IngredientSectionProps) {
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

  return (
    <>
      <h2>Ingredients</h2>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul>
          {ingredientFields.map((ingredient, index) => (
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
                        errors={formState.errors.ingredients?.[index]}
                      />
                    </>
                  );
                }}
              ></Controller>
            </li>
          ))}
        </ul>
      )}
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
    </>
  );
}
