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
  this.loadingService.show();
  this.recipeSelected.emit(); 
  setTimeout(() => {
    this.loadingService.hide(); 
  }, 1000);
}
}

