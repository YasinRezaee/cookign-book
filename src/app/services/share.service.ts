import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../Models/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
addedingerient = new Subject();
refreshData = new Subject<boolean>();
  constructor() { }
  
}
