import axios, {AxiosInstance} from 'axios';
import {enPoint} from '../constatns';

export class MakeRequest {
  constructor(private readonly _axios: AxiosInstance) {}

  setAuthorizationHeader(token: string): void {
    this._axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  unsetAuthorizationHeader(): void {
    delete this._axios.defaults.headers.common.Authorization;
  }

  get get() {
    return this._axios.get;
  }

  get post() {
    return this._axios.post;
  }

  get put() {
    return this._axios.put;
  }

  get patch() {
    return this._axios.patch;
  }
  get delete() {
    return this._axios.delete;
  }

  get request() {
    return this._axios.request;
  }

  get axios(): AxiosInstance {
    return this._axios;
  }
}

export const makeRequest = new MakeRequest(
  axios.create({
    baseURL: enPoint.API_URL,
  }),
);
