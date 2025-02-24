import { Component , OnInit } from '@angular/core';
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { Recipe } from '../../Models/recipe';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[]=[];

  constructor(
    private recipeService: RecipesService,
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}


