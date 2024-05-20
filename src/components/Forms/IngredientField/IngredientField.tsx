import { useMemo } from "react";
import SelectField from "../SelectField/SelectField";

export default function IngredientField({
  value,
  onChange,
  ingredients,
  errors,
}: any) {
  const onIngredientChange = (changedValue: any) => {
    const option = ingredients.find(
      (ingredient: any) => ingredient.name === changedValue
    );
    onChange({ ...value, id: option.id });
  };

  const onAmountChange = (e: any) => {
    onChange({ ...value, amount: Number(e.target.value) });
  };

  const onUnitChange = (changedUnit: any) => {
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
          placeholder="Select Ingredient..."
          onValueChange={onIngredientChange}
        />
        <span className="form-error">{errors?.id?.message}</span>
      </div>
      <div className="form-field">
        <input
          type="number"
          min="0"
          value={value.amount}
          placeholder="Amount"
          onChange={onAmountChange}
        />
        <span className="form-error">{errors?.amount?.message}</span>
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
