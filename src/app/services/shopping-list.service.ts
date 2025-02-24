import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../Models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>();
  ingredients:Ingredient[] = [
    {id: 1,name: 'Apples', amount: 5},
    {id: 2,name: 'Tomatoes', amount: 10},
    {id: 3,name: 'Bananas', amount: 15},
    {id: 4,name: 'Carrots', amount: 20}, 
    {id: 5,name: 'Potatoes', amount: 25}, 
  ];
  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
    
  }
  }
