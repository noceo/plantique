import { Allergen } from "@/shared/interfaces/allergen.interface";

interface AllergenInfoProps {
  allergens: Array<Allergen>;
}

export default function AllergenInfo({ allergens }: AllergenInfoProps) {
  return (
    <div className="allergen-info">
      {allergens.map((allergen, i) => (
        <div key={allergen} className="allergen-info__item">
          <p>{i}.</p>
        </div>
      ))}
    </div>
  );
}
