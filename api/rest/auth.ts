import makeRequest from '../makeRequest';

export const signUp = (data: {email: string; name: string; password: string}) =>
  makeRequest({
    url: 'https://prayer.herokuapp.com/auth/sign-up',
    method: 'POST',
    data,
  });
export const signIn = (data: {email: string; password: string}) =>
  makeRequest({
    url: 'https://prayer.herokuapp.com/auth/sign-in',
    method: 'POST',
    data,
  });
