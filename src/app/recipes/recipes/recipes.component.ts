import { Component, OnInit } from '@angular/core';
import { RecipeListComponent } from "../recipe-list/recipe-list.component";
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { Recipe } from '../../Models/recipe';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes',
  imports: [RecipeListComponent, RecipeDetailsComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit{
 selectedRecipe?: Recipe
  constructor(
    private recipeService: RecipesService
  ) { 
  
  }

  ngOnInit(): void {
     this.recipeService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );
  }

}
