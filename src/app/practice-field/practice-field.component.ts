import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-practice-field',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './practice-field.component.html',
  styleUrl: './practice-field.component.css'
})
export class PracticeFieldComponent implements OnInit {
  genderList = ['Male', 'Female'];
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formListSighUp();
  }

  formListSighUp() {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      text: ['', Validators.required],
      option: ['', Validators.required],
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

  onsubmit(formValue: any) {
    console.log(formValue);
    // Handle form submission here
  }
}