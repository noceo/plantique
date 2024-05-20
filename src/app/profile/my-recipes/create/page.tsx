import Button from "@/components/Button/Button";
import RecipeForm from "@/components/Forms/RecipeForm/RecipeForm";

export default function CreateRecipe() {
  return (
    <div className="my-recipes">
      <div className="my-recipes__header">
        <h1>Create Recipe</h1>
      </div>
      <div className="my-recipes__content">
        <RecipeForm />
      </div>
    </div>
  );
}
