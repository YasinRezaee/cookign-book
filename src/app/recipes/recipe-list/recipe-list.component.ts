import { Component , OnDestroy, OnInit } from '@angular/core';
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { Recipe } from '../../Models/recipe';
import { RecipesService } from '../../services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareService } from '../../services/share.service';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '../../Pipes/translate.pipe';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeItemComponent, TranslatePipe],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[]=[];
  subscription!: Subscription;

  constructor(
    private recipeService: RecipesService,
    private ShareService: ShareService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
this.subscription = this.ShareService.refreshAllRecipes.subscribe({
  next:(res)=>{
    if (res) {
      this.getRecipes();
      this.router.navigate(['/recipes'], {relativeTo: this.route});
    }
  }
})
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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