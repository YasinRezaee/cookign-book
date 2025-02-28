import { Component, Input, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { Recipe } from '../../Models/recipe';
import { ShareService } from '../../services/share.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipe-details',
  imports: [MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipe?: Recipe;

 constructor(
  private shareService:ShareService,
  private router: Router,
 ) { }

  ngOnInit(): void {
  }
 
  addToSoppingList(ingredients:any){
    
    this.shareService.addedingerient.next(ingredients);
    this.router.navigate(['/shopping-list']);
  }
}

