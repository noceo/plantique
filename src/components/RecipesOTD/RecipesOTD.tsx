import RecipeCard from "../RecipeCard/RecipeCard";
import { Allergen } from "@/shared/interfaces/allergen.interface";
import { ResponseError } from "@/shared/services/httpClient.service";
import RecipeOTD from "@/shared/interfaces/recipe-otd.interface";

async function getRecipesOTD() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recipes-otd`);
  if (!res.ok) {
    throw new ResponseError("Bad response", res);
  }
  const recipesOTD = await res.json();
  return recipesOTD as RecipeOTD[];
}

export default async function RecipesOTD() {
  const recipesOTD = await getRecipesOTD();

  return (
    <div className="recipes-otd container">
      <div className="row">
        {recipesOTD.map((recipeOTD, i) => (
          <div key={i} className="col-xs-4">
            <RecipeCard
              title={recipeOTD.recipe.title}
              description={recipeOTD.recipe.description}
              imgSrc="https://placehold.co/400"
              allergens={[Allergen.GLUTEN_FREE, Allergen.NUT_FREE]}
              isLiked
              author={{
                name: recipeOTD.recipe.author?.name || "",
                imgSrc: "https://placehold.co/400",
              }}
              href={`/recipes/${recipeOTD.recipe.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
