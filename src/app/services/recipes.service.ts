import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../Models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes: Recipe[] = [
    { 
      id: 1, 
      name: "Fettuccine Alfredo",
      description: " Fettuccine Alfredo is a pasta dish made with fettuccine pasta, butter, heavy cream, Romano cheese, and seasonings. ",
       imagePath: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Alfredo-dc662e3.jpg", 
       ingredients: [
        { id: '45454', name: 'apple', amount: 3 },
        { id: '45454', name: 'pasta', amount: 2 },
        { id: '45454', name: 'cheese', amount: 3 },
        { id: '45454', name: 'peper', amount: 44 },
      ] },
    { 
      id: 2,
       name: "Ravioli",
      description: "Traditionally, ravioli are made at home. The filling varies according to the area where they are prepared.",
       imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbo8_47FMmuWuCBrw4e2Ap-rMtdkPUNiNdWQ&s",
        ingredients: [
          { id: '3423', name: 'meat', amount: 6 },
          { id: '3423', name: 'peper', amount: 3 },
          { id: '3423', name: 'milk', amount: 1 },
          { id: '3423', name: 'bread', amount: 6 },
        ] },
    { 
      id: 3, 
      name: "Pancake",
      description: " A pancake, also known as a hotcake, griddlecake, or flapjack, is a flat cake, often thin and round,",
       imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqkLVjhL0i-ia5c_Zcmw-_f6eKo2QdIlYhNR0SC4-fRC2nafiC9ZVCSGyg2XJ-Bu_bgyQ&usqp=CAU", 
       ingredients: [
        { id: '45475654', name: 'lemon', amount: 1 },
        { id: '45475654', name: 'yougert', amount: 1 },
        { id: '45475654', name: 'fat milk', amount: 1 },
        { id: '45475654', name: 'cream', amount: 1 },
      ] },
  ];
  recipeSelected = new EventEmitter<Recipe>();
  constructor() { }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipeById(id: number) {
    return this.recipes.find(recipe => recipe.id === id);
  }
}
