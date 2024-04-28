import { Allergen } from "@/shared/interfaces/allergen.interface";

const recipes = [
  {
    title: "Creamy Cauliflower Curry",
    description: "So juicy!",
    imgSrc: "https://placehold.co/400",
    allergens: [Allergen.GLUTEN_FREE, Allergen.NUT_FREE],
    isLiked: true,
    author: {
      name: "Paul",
      imgSrc: "https://placehold.co/400",
    },
    slug: "creamy-cauliflower-curry",
  },
  {
    title: "Broccoli Soup",
    description: "Just delicious!",
    imgSrc: "https://placehold.co/400",
    allergens: [Allergen.GLUTEN_FREE, Allergen.NUT_FREE],
    isLiked: true,
    author: {
      name: "Paul",
      imgSrc: "https://placehold.co/400",
    },
    slug: "broccoli-soup",
  },
  {
    title: "Portobello Mushroom Burger",
    description: "Hottest in town!",
    imgSrc: "https://placehold.co/400",
    allergens: [Allergen.GLUTEN_FREE, Allergen.NUT_FREE],
    isLiked: true,
    author: {
      name: "Paul",
      imgSrc: "https://placehold.co/400",
    },
    slug: "portobello-mushroom-burger",
  },
];

interface PageParams {
  slug: string;
}

interface PageProps {
  params: PageParams;
}

export async function generateStaticParams(): Promise<PageParams[]> {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default function Recipe({ params }: PageProps) {
  const { slug } = params;
  return (
    <div>
      <p>This is a {slug}.</p>
    </div>
  );
}
