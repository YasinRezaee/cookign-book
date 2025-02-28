import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { LoadingComponent } from "./Loading/loading/loading.component";
 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,
     RouterLink, RouterLinkActive,
     MatToolbarModule, MatButtonModule, 
     MatIconModule, MatMenuModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
   
}
 