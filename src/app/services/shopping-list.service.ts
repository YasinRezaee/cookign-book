import {  Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../Models/ingredient';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService implements OnInit{
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
}