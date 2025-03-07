import { Component , OnInit } from '@angular/core';
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { Recipe } from '../../Models/recipe';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
   this.getRecipes();
  }

  getRecipes(){
    this.recipeService.getAllRecipes().subscribe(recipes=>{
      this.recipes=recipes;
    })
  }

  addNewRecipe(){
     this.router.navigate(['/recipes/new'], {relativeTo: this.route});
  }
}


