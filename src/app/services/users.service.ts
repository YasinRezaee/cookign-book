import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private apiService: ApiService
  ) { }

getAllUsers(){
  return this.apiService.get('users');
}
 addUser(user:User){
   return this.apiService.post('users', user);
 }

}


export interface Address {
  street: string;
  city: string;
  zip: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  gender: string;
  address: Address;
  hobbies: string[];
}