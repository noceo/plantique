import ExploreView from "@/components/ExploreView/ExploreView";
import LabelToggle from "@/components/LabelToggle/LabelToggle";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import RecipesOTD from "@/components/RecipesOTD/RecipesOTD";
import { Allergen } from "@/shared/interfaces/allergen.interface";

const recipeCard = {
  title: "Creamy Cauliflower Curry",
  description: "So juicy!",
  imgSrc: "https://placehold.co/400",
  allergens: [Allergen.GLUTEN_FREE, Allergen.NUT_FREE],
  isLiked: true,
  author: {
    name: "Paul",
    imgSrc: "https://placehold.co/400",
  },
};

export default function Home() {
  return (
    <main>
      <ExploreView child1={<RecipesOTD />} child2={<p>ExploreView</p>} />
    </main>
  );
}
