import { Routes } from '@angular/router';  
import { ShoppingListComponent } from './shopping-list/shopping-list.component';  
import { RecipesComponent } from './recipes/recipes/recipes.component';  

export const routes: Routes = [  
    { path: '', redirectTo: 'recipes', pathMatch: 'full' }, 
    { path: 'recipes', component: RecipesComponent },  
    { path: 'shopping-list', component: ShoppingListComponent },  
    { path: '**', redirectTo: 'recipes' }
];  