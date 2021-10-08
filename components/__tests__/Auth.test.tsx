import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Auth from '../Auth';

interface mockArgs {
  email: string;
  password: string;
}

const mockSignIn = jest.fn((_args: mockArgs) => Promise.resolve({ user: {} }));
const mockSignUp = jest.fn((_args: mockArgs) => Promise.resolve({}));

jest.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signIn: (args: mockArgs) => mockSignIn(args),
      signUp: (args: mockArgs) => mockSignUp(args),
    },
  },
}));

it(`renders the initial screen`, () => {
  const { getByText } = render(<Auth />);
  expect(getByText('Email')).not.toBeNull();
  expect(getByText('Password')).not.toBeNull();
  expect(getByText('Sign in')).not.toBeNull();
  expect(getByText('Sign up')).not.toBeNull();
});

it('signs in with valid email', () => {
  const { getByText, getByPlaceholderText, debug } = render(<Auth />);
  const email = getByPlaceholderText('email@address.com');
  fireEvent(email, 'onChangeText', 'a@b.c');
  expect(email.props.value).toBe('a@b.c');
  const password = getByPlaceholderText('Password');
  fireEvent(password, 'onChangeText', 'test1234');
  expect(password.props.value).toBe('test1234');

  fireEvent(getByText('Sign in'), 'press');
  expect(mockSignIn).toBeCalledTimes(1);
  expect(mockSignIn).toBeCalledWith({ email: 'a@b.c', password: 'test1234' });
});
