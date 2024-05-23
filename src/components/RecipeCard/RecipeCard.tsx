import { Allergen } from "@/shared/interfaces/allergen.interface";
import Author from "@/shared/interfaces/author.interface";
import AllergenInfo from "../AllergenInfo/AllergenInfo";
import AuthorBadge from "../AuthorBadge/AuthorBadge";
import CustomImage from "../CustomImage/CustomImage";
import Link from "next/link";

interface RecipeCardProps {
  title: string;
  description: string;
  allergens: Array<Allergen>;
  isLiked: boolean;
  author: Author;
  imgSrc: string;
  href: string;
}

export default function RecipeCard({
  title,
  description,
  allergens,
  isLiked,
  author,
  imgSrc,
  href,
}: RecipeCardProps) {
  return (
    <div className="recipe-card">
      <Link href={href} tabIndex={0}>
        <div className="recipe-card__img">
          <CustomImage src={imgSrc} alt={title} />
        </div>
        <div className="recipe-card__text-wrapper">
          <p className="recipe-card__title">{title}</p>
          <p className="recipe-card__description">{description}</p>
          <div className="recipe-card__allergens">
            <AllergenInfo allergens={allergens} />
          </div>
          <AuthorBadge
            name={author.name}
            imgSrc={author.imgSrc}
            imgAlt={`Profile picture of ${author.name}`}
          />
        </div>
      </Link>
    </div>
  );
}
