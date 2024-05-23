import { useMemo } from "react";
import SelectField from "../SelectField/SelectField";
import TrashIcon from "@/../public/icons/trash.svg";
import Button from "@/components/Button/Button";

export default function IngredientField({
  value,
  onChange,
  ingredients,
  errors,
  onRemove,
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
        <span className="form-error">{errors?.ingredient?.name?.message}</span>
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
      <div className="ingredient-field__remove-btn">
        <Button variant="icon-square" color="danger" onClick={onRemove}>
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
}
