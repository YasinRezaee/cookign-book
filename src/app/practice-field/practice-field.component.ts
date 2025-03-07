import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-practice-field',
  imports: [FormsModule],
  templateUrl: './practice-field.component.html',
  styleUrl: './practice-field.component.css'
})
export class PracticeFieldComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  } 

  onSubmit(form: NgForm){
    console.log("Submitted" + form.value);
  }
}
