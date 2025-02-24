import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';  
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../Models/ingredient';
@Component({
  selector: 'app-shopping-edit',
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit{
  @ViewChild('name') nameInputRef?:ElementRef;
  @ViewChild('amount') amountInputRef?:ElementRef;

  constructor(
    private slService: ShoppingListService,
  ) { }

  ngOnInit(): void {
     
  }
  addIngredient(){
    const ingredientId = uuidv4();
    const ingName = this.nameInputRef?.nativeElement.value;
    const ingAmount = this.amountInputRef?.nativeElement.value;
    const newIng: Ingredient = {id: ingredientId, name: ingName, amount: ingAmount};
    this.slService.addIngredient(newIng);
    console.log("new`", newIng);
    
  }
}
 