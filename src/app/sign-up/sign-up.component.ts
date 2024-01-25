import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  ngOnInit(): void {
    this.signUpForm = new FormBuilder().group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      secondPassword: [null, Validators.required],
    });
  }

  get passwordDoesNotMatch() {
    return (
      this.signUpForm?.value?.password !==
      this.signUpForm?.value?.secondPassword
    );
  }
}
