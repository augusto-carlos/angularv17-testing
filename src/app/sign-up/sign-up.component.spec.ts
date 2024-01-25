import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('SignUpComponent Layout', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let document: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    document = fixture.nativeElement as HTMLElement;
  });

  it('has email input', () => {
    const label = document.querySelector('label[for="email"]');
    const emailInput = document.querySelector<HTMLInputElement>(
      'input[placeholder="Enter email"]'
    );

    expect(emailInput?.type).toBe('email');
    expect(label).toBeTruthy();
  });

  it('has the password inputs', () => {
    const labelPassword = document.querySelector('label[for="password"]');
    const labelSecondPassword = document.querySelector(
      'label[for="second-password"]'
    );
    const passwordInputs = document.querySelectorAll('input[type="password"]');

    expect(passwordInputs?.length).toBe(2);
    expect(labelPassword?.textContent).toContain('Password');
    expect(labelSecondPassword?.textContent).toContain('Repeat the password');
  });

  it('has a sign up button', () => {
    const button = document.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );
    expect(button?.textContent).toBe('Create account');
  });

  it('disables the sign up button initially', () => {
    const button = document.querySelector<HTMLButtonElement>(
      'button[type="submit"]'
    );
    expect(button?.disabled).toBeTruthy();
  });
});

describe('Interactions', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let document: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    document = fixture.nativeElement as HTMLElement;
  });

  it('enables the sign up button only when the form is valid', () => {
    const emailInput = document.querySelector(
      'input[id="email"]'
    ) as HTMLInputElement;
    emailInput.value = 'test@gmail.com';
    emailInput.dispatchEvent(new Event('input'));

    const passwordInput = document.querySelector(
      'input[id="password"]'
    ) as HTMLInputElement;
    passwordInput.value = '1234';
    passwordInput.dispatchEvent(new Event('input'));

    const secondPasswordInput = document.querySelector(
      'input[id="second-password"]'
    ) as HTMLInputElement;
    secondPasswordInput.value = '1234';
    secondPasswordInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const button = document.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    expect(button.disabled).toBeFalsy();
  });

  it('Send the sign up data to the server', () => {
    let httpTestingController = TestBed.inject(HttpTestingController);

    const emailInput = document.querySelector(
      'input[id="email"]'
    ) as HTMLInputElement;
    emailInput.value = 'test@gmail.com';
    emailInput.dispatchEvent(new Event('input'));
  });
});
