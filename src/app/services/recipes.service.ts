import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../Models/recipe';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
 
  recipeSelected = new EventEmitter<Recipe>();
  constructor(
    private aapiService: ApiService
  ) { }

  getAllRecipes(){
    return this.aapiService.get('recipes');
  }
  
}
