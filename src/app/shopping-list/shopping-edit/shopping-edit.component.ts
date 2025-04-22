import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../Models/ingredient';
import { ShareService } from '../../services/share.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslatePipe } from '../../Pipes/translate.pipe';

@Component({
  selector: 'app-shopping-edit',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule,TranslatePipe],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingrdsForm: FormGroup = new FormGroup({});
  selectedToEditId!: string;
  editMode = false;
  editSubscription?: Subscription;

  constructor(
    private slService: ShoppingListService,
    private shareService: ShareService,
    private fb: FormBuilder,
  ) {
    this.shareService.addedingerient.subscribe({
      next: (data: any) => {
        if (data) {
          data.forEach((item: Ingredient) => {
            this.isSubData(item)
          });
        }
      }
    })
  }


  ngOnInit(): void {
    this.createIngrdsFormList();
    this.editSubscription = this.slService.startEditing.subscribe((data: Ingredient) => {
      this.selectedToEditId = data.id;
      this.editMode = true;
      this.ingrdsForm.patchValue({
        name: data.name,
        amount: data.amount,
      })
    })

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
    const newIng: Ingredient = { id: ingredientId, name: valueForm.name, amount: valueForm.amount };
    this.isSubData(newIng);
  }

  editIngredient(ingrdsForm: Ingredient) {
    const editIng = {
      id: this.selectedToEditId,
      name: ingrdsForm.name,
      amount: ingrdsForm.amount
    };
    this.slService.editIgredient(this.selectedToEditId, editIng).subscribe(
      {
        next: (data) => {
          if (data) {
            this.shareService.refreshData.next(true);
            this.ingrdsForm.reset();
            this.editMode = false;
          }
        },
        error: (err) => {
          console.log("err===>", err);
        }
      }

    )
  }

  onClear() {
    this.ingrdsForm.reset();
    this.editMode = false;
  }

  deleteIngredient(ingrdsForm: Ingredient) {
    debugger
    if (!ingrdsForm.amount || !ingrdsForm.name) {
      return alert('Please select an ingredient to delete');
    } else {
      const deletedIng = {
        id: this.selectedToEditId,
        name: ingrdsForm.name,
        amount: ingrdsForm.amount
      };
      let id = deletedIng.id;
      if (confirm('Are you sure you want to delete this ingredient?')) {
        this.slService.deleteIngredient(id).subscribe({
          next: () => {
            this.shareService.refreshData.next(true);
            this.ingrdsForm.reset();
          },
          error: (err) => {
            console.error("Error deleting ingredient:", err);
            // Optional: Show error message
          }
        });
      }
    }
  }
  isSubData(newIng: Ingredient) {
    this.slService.addNewIgrds(newIng).subscribe(
      {
        next: (data) => {
          if (data) {
            this.ingrdsForm.reset();
            this.shareService.refreshData.next(true);
          }
        },
        error: (err) => {
          console.log("err===>", err);
        }
      }

    )
  }

  ngOnDestroy(): void {
    this.editSubscription?.unsubscribe();
  }
}
