import { Ingredient } from "./ingredient";

export interface Recipe {
    id: any;
    key:string;
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];
}

 