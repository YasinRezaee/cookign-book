import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
addedingerient = new Subject();
refreshData = new Subject<boolean>();
addRecipe = new BehaviorSubject<any>({});
updateRecipe = new BehaviorSubject<any>({});
  constructor() { }
  
}
