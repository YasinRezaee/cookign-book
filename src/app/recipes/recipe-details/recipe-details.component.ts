import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ShareService } from '../../services/share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-details',
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule],
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
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.recipeService.getRecipeById(this.id).subscribe(recipe => {
        this.recipe = recipe;
      });
    });
  }

  addToSoppingList(ingredients: any) {
    this.shareService.addedingerient.next(ingredients);
    this.router.navigate(['/shopping-list']);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}

