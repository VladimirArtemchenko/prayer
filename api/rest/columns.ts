import makeRequest from '../makeRequest';

export const getColumns = (token: string) =>
  makeRequest({
    url: 'https://prayer.herokuapp.com/columns',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
