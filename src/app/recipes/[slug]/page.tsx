import AllergenInfo from "@/components/AllergenInfo/AllergenInfo";
import Button from "@/components/Button/Button";
import CreatorCard from "@/components/CreatorCard/CreatorCard";
import CustomImage from "@/components/CustomImage/CustomImage";
import ImageStack from "@/components/ImageStack/ImageStack";
import IngredientList from "@/components/IngredientList/IngredientList";
import NavigationLink from "@/components/NavigationLink/NavigationLink";
import StepsSection from "@/components/StepsSection/StepsSection";
import { Allergen } from "@/shared/interfaces/allergen.interface";
import { Unit } from "@/shared/interfaces/unit.interface";
import CurrentImageProvider from "@/shared/providers/CurrentImageProvider";

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

const ingredients = [
  {
    name: "Avocado",
    amount: "1/2",
    unit: null,
  },
  {
    name: "Broccoli",
    amount: "1/5",
    unit: null,
  },
  {
    name: "Onion",
    amount: "1/2",
    unit: null,
  },
  {
    name: "Ginger",
    amount: "1",
    unit: null,
  },
  {
    name: "Lemon",
    amount: "1/4",
    unit: null,
  },
  {
    name: "Sesame Seeds",
    amount: "1/2",
    unit: Unit.CUP,
  },
  {
    name: "Peas, frozen",
    amount: "16",
    unit: Unit.OUNCE,
  },
  {
    name: "Coconut Milk",
    amount: "1",
    unit: Unit.CUP,
  },
  {
    name: "Coconut Oil",
    amount: "2",
    unit: Unit.TBSP,
  },
  {
    name: "Apple Vinegar",
    amount: "1",
    unit: Unit.TSP,
  },
  {
    name: "Veggie Broth",
    amount: "2",
    unit: Unit.CUP,
  },
  {
    name: "Turmeric",
    amount: "1",
    unit: Unit.TBSP,
  },
  {
    name: "Salt",
    amount: "",
    unit: null,
  },
  {
    name: "Pepper",
    amount: "",
    unit: null,
  },
];

const steps = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac luctus est. Nulla fringilla nulla nec tortor gravida ultrices. Etiam massa lorem, condimentum ut euismod eget, consequat cursus urna. Morbi finibus pharetra dolor sed mattis. Integer quis commodo leo, et consectetur mi. Vivamus tristique id nibh eget tempor. Aliquam non lorem eu purus pharetra scelerisque porttitor ut est. Proin auctor, augue non dignissim lobortis, libero libero placerat ex, sit amet ullamcorper justo lorem et mi. Etiam pulvinar venenatis leo, eget fringilla elit egestas vel.",
  "Aliquam ut ultricies ipsum. Nullam efficitur tincidunt justo, eget rhoncus risus aliquam quis. Praesent tempus, enim in pulvinar venenatis, justo risus vestibulum mauris, at hendrerit lectus neque varius ipsum. Praesent enim ex, finibus vulputate euismod sit amet, commodo eu odio. Quisque neque orci, congue a blandit in, faucibus at ex. Cras porttitor tincidunt diam. Mauris congue lacinia felis, in tincidunt augue sodales sit amet. Sed turpis massa, vehicula ac iaculis sed, semper vestibulum est. Maecenas rhoncus nunc nec mauris dignissim porttitor. Praesent viverra rhoncus nisl, sed viverra eros luctus vel. Integer elementum risus quis lectus vulputate, posuere tincidunt purus commodo. Vivamus malesuada nulla erat, aliquet ornare massa viverra faucibus. Curabitur suscipit dui eu libero vehicula, in vulputate enim dictum. Suspendisse ac placerat est. Donec a augue in purus molestie congue eu eu lorem. Praesent tincidunt feugiat libero, nec egestas dui.",
  "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum quis erat nibh. Nam nec pulvinar massa. Curabitur vitae neque quis arcu bibendum ultricies. Etiam vitae sollicitudin felis. Ut dictum non sem quis ullamcorper. Aenean condimentum massa varius, varius eros quis, placerat leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed nec massa non dolor sagittis gravida in at nulla. Mauris auctor maximus nisl, sed commodo ipsum ultrices blandit. Pellentesque tempus mollis elit, id consectetur mi mollis quis. Proin arcu neque, mollis eu est ac, blandit porta ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut leo diam, aliquam ut dui non, elementum porta velit. Integer pellentesque orci nec eros bibendum, non luctus purus aliquam.",
  "Curabitur id leo massa. Sed vestibulum tellus nec est sodales, quis vestibulum ligula consectetur. Nam blandit, odio vel aliquam sagittis, erat mi iaculis odio, quis accumsan tellus lorem ac mi. Sed eros diam, convallis vel dignissim vel, viverra ac orci. Vestibulum sit amet lacus elit. Sed facilisis odio enim, id rhoncus urna ornare ac. Aliquam ullamcorper congue enim non pharetra.",
  "Phasellus eget rutrum ex, sed consequat odio. Praesent condimentum dapibus mauris, ut congue diam viverra et. Ut lobortis nibh vel nisi pellentesque, id pretium tellus auctor. Cras metus ante, euismod et convallis et, bibendum id nisi. Sed quis tellus augue. Quisque ut ullamcorper enim. Vestibulum sit amet lorem ultrices, aliquet felis vestibulum, sodales sapien. Etiam quis odio a mi consectetur consequat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
];

const author = {
  name: "Paul",
  slogan: "Love is my secret ingredient that puts a smile on everyone’s face.",
  created_at: new Date(),
  imgSrc: "https://placehold.co/400",
};

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
    <CurrentImageProvider>
      <div className="recipe-page">
        <div className="recipe-page__link-back">
          <NavigationLink href="/" variant="back" />
        </div>
        <div className="recipe-page__img-stack">
          <ImageStack>
            <CustomImage src="https://picsum.photos/400" alt="Placeholder" />
            <CustomImage src="https://picsum.photos/410" alt="Placeholder" />
            <CustomImage src="https://picsum.photos/420" alt="Placeholder" />
            <CustomImage src="https://picsum.photos/430" alt="Placeholder" />
            <CustomImage src="https://picsum.photos/440" alt="Placeholder" />
          </ImageStack>
        </div>
        <div className="recipe-page__content">
          <section className="recipe-page__overview">
            <h1 className="recipe-page__title">Creamy Cauliflower Curry</h1>
            <p className="recipe-page__description">So juicy!</p>
            <div className="recipe-page__ingredient-list-control-combo">
              <IngredientList ingredients={ingredients} />
            </div>
            <AllergenInfo
              allergens={[
                Allergen.GLUTEN_FREE,
                Allergen.NUT_FREE,
                Allergen.SOY_FREE,
              ]}
            />
            <div className="recipe-page__btn-shopping-list">
              <Button variant="primary">Add to Shopping List</Button>
            </div>
          </section>
          <section className="recipe-page__steps">
            <StepsSection steps={steps} />
          </section>
          <section className="recipe-page__author">
            <h2>Creator</h2>
            <div className="recipe-page__author-info">
              <CreatorCard
                name={author.name}
                slogan={author.slogan}
                member_since={author.created_at}
                imgSrc={author.imgSrc}
              />
            </div>
          </section>
          <section className="recipe-page__suggestions"></section>
        </div>
      </div>
    </CurrentImageProvider>
  );
}
