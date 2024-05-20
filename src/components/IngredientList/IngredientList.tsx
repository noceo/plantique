"use client";

import Ingredient from "@/shared/interfaces/ingredient.interface";
import ControlPanel from "../ContolPanel/ControlPanel";
import { useCallback } from "react";
import Button from "../Button/Button";

interface IngredientListProps {
  ingredients: Array<Ingredient>;
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
              key={ingredient.name}
              className="recipe-page__ingredient-list-item"
            >
              <td>
                <span>
                  {ingredient.amount} {ingredient.unit}
                </span>
              </td>
              <td>{ingredient.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
