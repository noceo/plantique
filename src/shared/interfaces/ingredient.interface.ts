import { Unit } from "./unit.interface";

export interface Ingredient {
  name: string;
  amount: string;
  unit: Unit | null;
}
