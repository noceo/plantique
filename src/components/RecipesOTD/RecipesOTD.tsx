import RecipeCard from "../RecipeCard/RecipeCard";
import { Allergen } from "@/shared/interfaces/allergen.interface";

export default function RecipesOTD() {
  return (
    <div className="recipes-otd container">
      <div className="row">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="col-xs-4">
            <RecipeCard
              title="Creamy Cauliflower Curry"
              description="So juicy!"
              imgSrc="https://placehold.co/400"
              allergens={[Allergen.GLUTEN_FREE, Allergen.NUT_FREE]}
              isLiked
              author={{
                name: "Paul",
                imgSrc: "https://placehold.co/400",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
