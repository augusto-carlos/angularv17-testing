import { render, screen } from '@testing-library/angular';
import { SignUpComponent } from './sign-up.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { http } from 'msw';

const server = setupServer(
  http.post('/api/users', async ({ request }) => {
    return new Response(request.body, {
      status: 200,
      headers: {
        Allow: 'GET,HEAD,POST',
      },
    });
  })
);

beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const setupComponent = async () => {
  await render(SignUpComponent, {
    imports: [HttpClientTestingModule],
  });
};

describe('SignUpComponent layout', () => {
  let httpTestingController: HttpTestingController;
  it('has sign up header', async () => {
    await setupComponent();

    const element = screen.getByRole('heading', { name: 'Sign Up' });
    expect(element).toBeTruthy();
  });

  it('has input fields and submit button', async () => {
    await setupComponent();
    httpTestingController = TestBed.inject(HttpTestingController);

    const emailInput = screen.getByLabelText<HTMLInputElement>('Email');
    const passwordInput = screen.getByLabelText<HTMLInputElement>('Password');
    const secondPasswordInput = screen.getByLabelText<HTMLInputElement>(
      'Repeat the password'
    );
    const button = screen.getByRole<HTMLButtonElement>('button', {
      name: 'Create account',
    });

    await userEvent.type(emailInput, 'test@gmail');
    await userEvent.type(passwordInput, '1234');
    await userEvent.type(secondPasswordInput, '1234');

    expect(button.disabled).toBeFalsy();

    button.click();

    // Expect the HTTP request
    const reqs = httpTestingController.match({
      url: 'http://localhost:3000/users',
      method: 'GET',
    });

    // expect(req.request.method).toEqual('GET');

    // //  Respond with mock data
    // req.flush([
    //   {
    //     name: 'test',
    //     email: 'test@gmail',
    //     password: '1234',
    //     secondPassword: '1234',
    //   },
    // ]);

    // httpTestingController.verify();
  });
});
