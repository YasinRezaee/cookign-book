import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ShareService } from '../../../services/share.service';
 

@Component({
  selector: 'app-recipe-item',
  imports: [RouterLink, NgClass],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent implements OnInit{
@Input() recipe?:Recipe;

constructor(
  private router: Router,
) { }

ngOnInit(): void {

}

isActive(recipeId: any): boolean {  
return this.router.isActive('/recipes/' + recipeId, true);
}  

}

