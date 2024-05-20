import { Unit } from "./unit.interface";

export default interface Ingredient {
  name: string;
  amount: string;
  unit: Unit | null;
}
