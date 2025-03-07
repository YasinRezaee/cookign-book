import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Ingredient } from '../Models/ingredient';
import { MatTableModule } from '@angular/material/table';
import { ShoppingListService } from '../services/shopping-list.service';
import { ShareService } from '../services/share.service';
import { interval, map, Subscription } from 'rxjs';
 

@Component({
  selector: 'app-shopping-list',
  imports: [ShoppingEditComponent, MatTableModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  refreshSubscription?: Subscription;
  intervalsubscription?: Subscription;
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
    this.intervalsubscription= interval(1000).pipe(map((data:any)=>{
      return `Round ${data}`;
    })).subscribe((data:any)=>{
       console.log(data);
       
    });
  }

  getAllIngredients() {
    this.service.getIngredients().subscribe(ingr => {
      this.ingredients = ingr;
    })
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe();
    this.intervalsubscription?.unsubscribe();
   }

  
}
