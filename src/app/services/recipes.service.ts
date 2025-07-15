import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../Models/recipe';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
 
  recipeSelected = new EventEmitter<Recipe>();
  constructor(
    private apiService: ApiService
  ) { }

  getAllRecipes(){
    return this.apiService. get('recipes');
  }

  addNewRecipe(model:any):Observable<any>{
   return this.apiService.post('recipes', model);
  }
  
  getRecipeById(id:string){
    return this.apiService.get(`recipes/${id}`);
  }

  updateRecipe(id: string, model: any): Observable<any> {
    return this.apiService.put('recipes', id, model);  
  }

  deleteRecipe(id: string): Observable<any> {
    return this.apiService.delete(id, 'recipes');
  }
}
