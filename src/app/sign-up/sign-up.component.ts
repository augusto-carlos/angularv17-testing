import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup<{
    email: FormControl;
    password: FormControl;
    secondPassword: FormControl;
  }>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.signUpForm = new FormBuilder().nonNullable.group({
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

  signUp() {
    console.log('test');
    const { email, password } = this.signUpForm.value;

    this.http
      .post('https://reqres.in/api/register', { email, password })
      .subscribe({
        next: console.log,
        error: console.log,
      });
  }
}
