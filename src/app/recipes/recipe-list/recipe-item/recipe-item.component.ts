import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { LoadingService } from '../../../Loading/loading.service';
import { RecipesService } from '../../../services/recipes.service';

@Component({
  selector: 'app-recipe-item',
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit{
@Input() recipe?:Recipe;

constructor(
  private loadingService: LoadingService,
  private recipeService: RecipesService
) { }
ngOnInit(): void {
   
}

onSelectRecipe() {
  this.loadingService.show();
  this.recipeService.recipeSelected.emit(this.recipe )
  this.loadingService.hide(); 
}
}

