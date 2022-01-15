import { Ingredient } from './ingredient.model';

export class Cocktail{
  constructor(
    public id: string,
    public name: string,
    public imageUrl: string,
    public type: string,
    public description: string,
    public ingredients: Ingredient[],
    public cookingDescription: string,
    ) {
  }
}
