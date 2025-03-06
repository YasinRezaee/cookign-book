import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../Models/recipe';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
 
  recipeSelected = new EventEmitter<Recipe>();
  constructor(
    private apiService: ApiService
  ) { }

  getAllRecipes(){
    return this.apiService.get('recipes');
  }
  
  getRecipeById(id:number){
    return this.apiService.get(`recipes/${id}`);
  }
}
