import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ShareService } from '../../services/share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import { TranslatePipe } from '../../Pipes/translate.pipe';

@Component({
  selector: 'app-recipe-details',
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, TranslatePipe],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  recipe?: any;
  id: string = '';


  constructor(
    private shareService: ShareService,
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router,
    private sharedService: ShareService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.recipeService.getRecipeById(this.id).subscribe(recipe => {
        this.recipe = recipe;
      });
    });
  }

  addToSoppingList(Recipe: any) {
    this.shareService.addedingerient.next(Recipe);
    this.router.navigate(['/shopping-list']);
  }

  onEditRecipe(recipe: any) {
    this.router.navigate(['edit'], { relativeTo: this.route });
    this.shareService.updateRecipe.next(recipe);
  }

  onRemoveRecipe(recipe: any) {
    this.recipeService.deleteRecipe(recipe.id).subscribe({
      next: (res) => {
        alert("Recipe was removed successfully");
        this.sharedService.refreshAllRecipes.next(true);
      }
    })
  }
}

