import { Component, Input, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { Recipe } from '../../Models/recipe';
@Component({
  selector: 'app-recipe-details',
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipe?: Recipe;

 constructor() { }

  ngOnInit(): void {
  }
 
}

