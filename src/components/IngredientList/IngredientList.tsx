"use client";

import { IngredientOnRecipe } from "@/shared/interfaces/ingredient.interface";
import ControlPanel from "../ContolPanel/ControlPanel";
import { useCallback } from "react";

interface IngredientListProps {
  ingredients: IngredientOnRecipe[];
}

export default function IngredientList({ ingredients }: IngredientListProps) {
  const onPortionCountChange = useCallback(() => {
    console.log("Portion count changed.");
  }, []);

  return (
    <>
      <div className="recipe-page__control-panel">
        <ControlPanel onChange={onPortionCountChange} />
      </div>
      <table className="recipe-page__ingredient-list">
        <thead className="sr-only">
          <tr>
            <th>Amount</th>
            <th>Ingredient</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((ingredient) => (
            <tr
              key={ingredient.ingredient.name}
              className="recipe-page__ingredient-list-item"
            >
              <td>
                <span>
                  {ingredient.quantity} {ingredient.unit}
                </span>
              </td>
              <td>{ingredient.ingredient.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
