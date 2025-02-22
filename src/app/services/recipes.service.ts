import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../Models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
 private recipes: Recipe[] = [
    { id: 1, name: "Fettuccine Alfredo", description: " Fettuccine Alfredo is a pasta dish made with fettuccine pasta, butter, heavy cream, Romano cheese, and seasonings. ", imagePath: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Alfredo-dc662e3.jpg" },
    { id: 2, name: "Ravioli", description: "Traditionally, ravioli are made at home. The filling varies according to the area where they are prepared.", imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbo8_47FMmuWuCBrw4e2Ap-rMtdkPUNiNdWQ&s" },
    { id: 3, name: "Pancake", description: " A pancake, also known as a hotcake, griddlecake, or flapjack, is a flat cake, often thin and round,", imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqkLVjhL0i-ia5c_Zcmw-_f6eKo2QdIlYhNR0SC4-fRC2nafiC9ZVCSGyg2XJ-Bu_bgyQ&usqp=CAU" },
  ];
  recipeSelected= new EventEmitter<Recipe>();
  constructor() { }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipeById(id: number) {
    return this.recipes.find(recipe => recipe.id === id);
  }
}
