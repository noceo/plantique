import { useMemo } from "react";
import SelectField from "../SelectField/SelectField";
import { Unit } from "@/shared/interfaces/unit.interface";

export default function IngredientField({
  value,
  onChange,
  ingredients,
  errors,
}: any) {
  const onIngredientChange = (changedValue: string) => {
    const option = ingredients.find(
      (ingredient: any) => ingredient.name === changedValue
    );
    onChange({ ...value, ingredient: option });
  };

  const onQuantityChange = (e: any) => {
    onChange({ ...value, quantity: Number(e.target.value) });
  };

  const onUnitChange = (changedUnit: string) => {
    onChange({ ...value, unit: changedUnit });
  };

  const ingredientOptions = useMemo(() => {
    return ingredients.map((ingredient: any) => ingredient.name);
  }, [ingredients]);

  console.log(value);

  return (
    <div className="ingredient-field">
      <div className="form-field">
        <SelectField
          options={ingredientOptions}
          value={value.id}
          defaultValue={value.ingredient?.name}
          placeholder="Select Ingredient..."
          onValueChange={onIngredientChange}
        />
        <span className="form-error">{errors?.ingredient?.message}</span>
      </div>
      <div className="form-field">
        <input
          type="number"
          min="0"
          value={value.quantity}
          placeholder="Amount"
          onChange={onQuantityChange}
        />
        <span className="form-error">{errors?.quantity?.message}</span>
      </div>
      <div className="form-field">
        <SelectField
          options={["CUP"]}
          value={value.unit}
          onValueChange={onUnitChange}
        />
        <span className="form-error">{errors?.unit?.message}</span>
      </div>
    </div>
  );
}
