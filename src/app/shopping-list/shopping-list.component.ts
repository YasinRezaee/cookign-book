import { Component, OnInit } from '@angular/core';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Ingredient } from '../Models/ingredient';
import {MatTableModule} from '@angular/material/table';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  imports: [ShoppingEditComponent, MatTableModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  recivedIngr:any;
  ingredients:Ingredient[] = [];
  constructor(
    private service: ShoppingListService,
  ) { }

  ngOnInit(): void {
     this.ingredients = this.service.getIngredients();
     this.service.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

}
 