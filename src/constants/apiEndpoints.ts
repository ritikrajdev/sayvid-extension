import { AxiosRequestConfig } from 'axios';

export const POST_CHAT = (data: object): AxiosRequestConfig => ({
  method: 'POST',
  url: 'https://jsonplaceholder.typicode.com/posts',
  data: data
});