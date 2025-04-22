import { Component } from '@angular/core';
import { TranslatePipe } from '../../Pipes/translate.pipe';

@Component({
  selector: 'app-recipe-start',
  imports: [TranslatePipe],
  templateUrl: './recipe-start.component.html',
  styleUrl: './recipe-start.component.css'
})
export class RecipeStartComponent {

}
