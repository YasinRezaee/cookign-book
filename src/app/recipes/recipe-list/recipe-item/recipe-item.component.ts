import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { LoadingService } from '../../../Loading/loading.service';

@Component({
  selector: 'app-recipe-item',
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit{
@Input() recipe?:Recipe;
@Output() recipeSelected = new EventEmitter<void>()

constructor(
  private loadingService: LoadingService
) { }

ngOnInit(): void {
   
}

onSelectRecipe() {
  this.loadingService.show(); // Show the loading spinner
  this.recipeSelected.emit(); // Emit the recipe selected event

  // Set a timeout to hide the loading spinner after a delay
  setTimeout(() => {
    this.loadingService.hide(); // Hide the loading spinner
  }, 2000); // Change 2000 to the desired time in milliseconds (e.g., 2000ms = 2 seconds)
}
}
