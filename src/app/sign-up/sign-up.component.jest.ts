import { render, screen } from '@testing-library/angular';
import { SignUpComponent } from './sign-up.component';

describe('Primeiro teste', () => {
  it('has sign up header', async () => {
    await render(SignUpComponent);

    const element = screen.getByRole('heading', { name: 'Sign Up' });
    expect(element).toBeTruthy();
  });
});
