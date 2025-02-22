import { Component, OnInit } from '@angular/core';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Ingredient } from '../Models/ingredient';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-shopping-list',
  imports: [ShoppingEditComponent, MatTableModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  recivedIngr:any;
  ingredients:Ingredient[] = [
    {id: 1,name: 'Apples', amount: 5},
    {id: 2,name: 'Tomatoes', amount: 10},
    {id: 3,name: 'Bananas', amount: 15},
    {id: 4,name: 'Carrots', amount: 20}, 
    {id: 5,name: 'Potatoes', amount: 25}, 
  ];
  constructor() { }

  ngOnInit(): void {
     
  }

  onIngAdded(ingr:any){
    this.recivedIngr=ingr;
    this.ingredients.push(this.recivedIngr);
  }
}
