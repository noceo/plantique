import ExploreView from "@/components/ExploreView/ExploreView";
import ProfileControls from "@/components/ProfileControls/ProfileControls";
import RecipesOTD from "@/components/RecipesOTD/RecipesOTD";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ExploreView child1={<RecipesOTD />} child2={<p>ExploreView</p>} />
    </main>
  );
}
