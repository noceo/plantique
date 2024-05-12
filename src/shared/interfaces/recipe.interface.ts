import { Ingredient } from "./ingredient.interface";
import User from "./user.interface";

export default interface Recipe {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  published: boolean;
  authorId: number;
  author?: User;
  ingredients?: Array<Ingredient>;
}
