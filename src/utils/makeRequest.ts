import axios, { AxiosRequestConfig } from 'axios';
import { CannotConnectToService } from '../constants/text/text.en';

export async function makeRequest(
  apiEndpoint: AxiosRequestConfig,
  errorHandler: (errorMessage: string) => any
) {
  try {
    const response = await axios(apiEndpoint);
    return response.data;
  } catch (error: any) {
    if (error?.response) {
      // // expecting error comes as a message in response
      // errorHandler(error.response.msg);
      errorHandler(CannotConnectToService + ' : E-' + error.response.status);
    } else errorHandler(error.message);
    return null;
  }
} 