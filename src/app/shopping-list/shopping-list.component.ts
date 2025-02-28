import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Ingredient } from '../Models/ingredient';
import { MatTableModule } from '@angular/material/table';
import { ShoppingListService } from '../services/shopping-list.service';
import { ShareService } from '../services/share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  imports: [ShoppingEditComponent, MatTableModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  refreshSubscription?: Subscription;
  ingredients: Ingredient[] = [];
  constructor(
    private service: ShoppingListService,
    private shareService: ShareService,
  ) {
    this.refreshData();
  }

  refreshData(){
    this.refreshSubscription = this.shareService.refreshData.subscribe(
      (refresh: boolean) => {
        if(refresh){
          this.getAllIngredients();
        }
      }
    )
  }

  ngOnInit(): void {
    this.getAllIngredients();
  }

  getAllIngredients() {
    this.service.getIngredients().subscribe(ingr => {
      this.ingredients = ingr;
    })
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
   }
}
