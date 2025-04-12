import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../../Models/recipe';
import { ShareService } from '../../services/share.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-recipe',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {
  id: string = '';
  editMode: boolean = false;
  recipeForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private sharedService: ShareService,
    private fb: FormBuilder,
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
    });
  }


  ngOnInit() {
    this.createForm();
  }

createForm() {
  this.recipeForm = this.fb.group({
    name: [''],
    imagePath: [''],
    description: [''],
    ingredients: this.fb.array([]),
  });
  this.onUpdateRecipe();
}

onUpdateRecipe() {
  this.sharedService.updateRecipe.subscribe((recipe: any) => {
    if (recipe) {
      const ingredientsArray = this.recipeForm.get('ingredients') as FormArray;
      ingredientsArray.clear();
      this.recipeForm.patchValue({
        name: recipe?.name,
        imagePath: recipe?.imagePath,
        description: recipe?.description,
      });
      
      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient: any) => {
          ingredientsArray.push(this.fb.group({
            name: [ingredient.name],
            amount: [ingredient.amount]
          }));
        });
      }
    }
  });
}

get ingredients() {
  return this.recipeForm.get('ingredients') as FormArray;
}

addIngredient() {
  this.ingredients.push(this.fb.group({
    name: [''],
    amount: ['']
  }));
}

removeIngredient(index: number) {
  this.ingredients.removeAt(index);
}
}