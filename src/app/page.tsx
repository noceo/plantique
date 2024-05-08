import ExploreView from "@/components/ExploreView/ExploreView";
import RecipesOTD from "@/components/RecipesOTD/RecipesOTD";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/login">Login</Link>
      <Link href="/profile">Profile</Link>
      <ExploreView child1={<RecipesOTD />} child2={<p>ExploreView</p>} />
    </main>
  );
}
