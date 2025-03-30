import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UsersService } from '../services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-practice-field',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './practice-field.component.html',
  styleUrl: './practice-field.component.css'
})
export class PracticeFieldComponent implements OnInit {
  genderList = ['Male', 'Female'];
  signUpForm!: FormGroup;
  allUsers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.formListSighUp();
    this.getAllUsers();
    // this.setInitValue();
    this.signUpForm.statusChanges.subscribe(data => {
      console.log(data);
    })
    // this.signUpForm.valueChanges.subscribe(data => {
    //   console.log(data);
    // })

  }

  formListSighUp() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required, this.validateUser.bind(this)]],
      email: ['', [Validators.required, Validators.email], this.validateEmail.bind(this)],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        zip: ['', Validators.required],
      }),
      hobbies: this.fb.array([])
    });
  }

  get newHobbies(): FormArray {
    return this.signUpForm.get('hobbies') as FormArray;
  }

  removeHobby(index: number) {
    this.newHobbies.removeAt(index);
  }

  onAddHobbies() {
    const hobbyControl = new FormControl('', Validators.required);
    this.newHobbies.push(hobbyControl);
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.allUsers = data;
    })
  }

  validateUser(control: FormControl) {
    let checkedUsers = this.allUsers.some(user => user.name === control.value);
    if (checkedUsers) {
      return { 'forbiddenUserName': true };
    }
    return null;
  }

  validateEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      if (this.allUsers.some(user => user.email === control.value)) {
        return resolve({ 'forbiddenEmail': true });
      } else {
        return resolve(null);
      }
    });
    return promise;
  }

  onsubmit(formValue: User) {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.signUpForm.updateValueAndValidity();
      alert('Please fill all the fields');
      return;
    }
    const userModel: User = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
      gender: formValue.gender,
      address: {
        street: formValue.address.street,
        city: formValue.address.city,
        zip: formValue.address.zip
      },
      hobbies: formValue.hobbies
    }
    this.userService.addUser(userModel).subscribe(data => {
      confirm('User added successfully');
      this.getAllUsers();
      this.signUpForm.reset();
    })
  }

  setInitValue() {
    this.signUpForm.setValue(
      {
        name: "test",
        email: 'test@gmail.com',
        password: '',
        gender: 'Male',
        address: {
          street: '',
          city: '',
          zip: ''
        },
        hobbies: []
      }
    )
  }
}