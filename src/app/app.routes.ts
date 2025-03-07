import { Routes } from '@angular/router';  
import { ShoppingListComponent } from './shopping-list/shopping-list.component';  
import { RecipesComponent } from './recipes/recipes/recipes.component';  
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';

export const routes: Routes = [  
    { path: '', redirectTo: 'recipes', pathMatch: 'full' }, 
    { path: 'recipes', component: RecipesComponent, children: [
        {path: '',component:RecipeStartComponent},
        {path: 'new', component: EditRecipeComponent},
        {path: ':id', component: RecipeDetailsComponent},
        {path: ':id/edit', component: EditRecipeComponent},
    ]},
    { path: 'shopping-list', component: ShoppingListComponent },  
    { path: '**', redirectTo: 'recipes' }
];    