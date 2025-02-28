import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../Models/ingredient';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-shopping-edit',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit{
  ingrdsForm: FormGroup = new FormGroup({});

  constructor(
    private slService: ShoppingListService,
    private shareService: ShareService,
    private fb: FormBuilder,
  ) { 
  this.shareService.addedingerient.subscribe({
      next:(data:any)=>{
        if(data){
           data.forEach((item: Ingredient) => {
         this.isSubData(item)
        });
        }
       }
    })
  }
 
  ngOnInit(): void {
    this.createIngrdsFormList();
  }

  createIngrdsFormList() {
    this.ingrdsForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    })
  }

  addIngredient(valueForm: any) {
    if (this.ingrdsForm.invalid) {
      this.ingrdsForm.markAllAsTouched();
      this.ingrdsForm.updateValueAndValidity();
      return alert('Please fill all the fields');
    }
    const ingredientId = uuidv4();
    const newIng: Ingredient = {id: ingredientId, name: valueForm.name, amount: valueForm.amount};
  this.isSubData(newIng);
  }

  isSubData(newIng: Ingredient) {
    this.slService.addNewIgrds(newIng).subscribe(
      {
        next: (data) => {
          if(data){
            this.ingrdsForm.reset();
            this.shareService.refreshData.next(true);
          }
        },
        error: (err) => {
          console.log("err===>",err);
        }
      }
      
     )
  }
}
