import Link from "next/link";

export default function MyRecipes() {
  return (
    <div className="my-recipes">
      <div className="my-recipes__header">
        <h1>My Recipes</h1>
        <Link href="/profile/my-recipes/add">Add Recipe</Link>
      </div>
    </div>
  );
}
