import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../Models/ingredient';
import { ShareService } from '../../services/share.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslatePipe } from '../../Pipes/translate.pipe';
import { LoadingService } from '../../Loading/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-edit',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingrdsForm: FormGroup = new FormGroup({});
  selectedToEditId!: string;
  editMode = false;
  editSubscription?: Subscription;
  addedIngredientSubscription?: Subscription;

  constructor(
    private slService: ShoppingListService,
    private shareService: ShareService,
    private fb: FormBuilder,
    private load: LoadingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.createIngrdsFormList();
    
    this.editSubscription = this.slService.startEditing.subscribe((data: Ingredient) => {
      this.selectedToEditId = data.key;
      this.editMode = true;
      this.ingrdsForm.patchValue({
        name: data.name,
        amount: data.amount,
      });
    });
  }

  createIngrdsFormList() {
    this.ingrdsForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  addIngredient(valueForm: any) {
    this.load.show();
    if (this.ingrdsForm.invalid) {
      this.ingrdsForm.markAllAsTouched();
      this.ingrdsForm.updateValueAndValidity();
      return alert('Please fill all the fields');
    }
    
    const ingredientId = uuidv4();
    
    const newIng: Ingredient = { 
      id: ingredientId, 
      name: valueForm.name, 
      amount: valueForm.amount,
      key:'',
    };
    
    this.slService.addNewIgrds(newIng).subscribe({
      next: (data) => {
        if (data) {
          this.shareService.refreshData.next(true);
        }
      },
      error: (err) => {
        console.log("err===>", err);
      },complete:()=>{
        this.ingrdsForm.reset();
        this.router.navigate(['shopping-list'])
        this.load.hide();
      }
    });
  }

  editIngredient(ingrdsForm: Ingredient) {
    const editIng = {
      id: this.selectedToEditId,
      key: ingrdsForm.id,
      name: ingrdsForm.name,
      amount: ingrdsForm.amount
    };
    
    this.slService.editIgredient(this.selectedToEditId, editIng).subscribe({
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
    });
  }

  onClear() {
    this.ingrdsForm.reset();
    this.editMode = false;
  }

  deleteIngredient(ingrdsForm: Ingredient) {
    if (!ingrdsForm.amount || !ingrdsForm.name) {
      return alert('Please select an ingredient to delete');
    }
    
    if (confirm('Are you sure you want to delete this ingredient?')) {
      this.slService.deleteIngredient(this.selectedToEditId).subscribe({
        next: () => {
          this.shareService.refreshData.next(true);
          this.ingrdsForm.reset();
        },
        error: (err) => {
          console.error("Error deleting ingredient:", err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.editSubscription?.unsubscribe();
    this.addedIngredientSubscription?.unsubscribe();
  }
}