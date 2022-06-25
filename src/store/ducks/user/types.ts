export type SignInData = {
  email: string;
  password: string;
};

export type SignUpData = {
  email: string;
  name: string;
  password: string;
};
export const sagaUserActions = {
  FETCH_SIGNUP_SAGA: 'FETCH_SIGNUP_SAGA',
  FETCH_SIGNIN_SAGA: 'FETCH_SIGNIN_SAGA',
};
