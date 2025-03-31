import {  Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../Models/ingredient';
import { ApiService } from './api.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit{
 startEditing = new Subject<Ingredient>();
 ingredients: Ingredient[] = [];
  constructor(
    private apiService: ApiService,
  ) { }
  ngOnInit(): void {
    this.getIngredients();
  }

getIngredients(){
    return this.apiService.get('ingredients');
  }
addNewIgrds(model:Ingredient):Observable<any>{
 return this.apiService.post('ingredients', model);
}

editIgredient(id: string, model: Ingredient): Observable<any> {
  return this.apiService.put('ingredients', id, model);  
}

deleteIngredient(id: string): Observable<any> {
  return this.apiService.delete(id, 'ingredients');
}
}