import ExploreView from "@/components/ExploreView/ExploreView";
import RecipesOTD from "@/components/RecipesOTD/RecipesOTD";

export default function Home() {
  return (
    <main>
      <ExploreView child1={<RecipesOTD />} child2={<p>ExploreView</p>} />
    </main>
  );
}
