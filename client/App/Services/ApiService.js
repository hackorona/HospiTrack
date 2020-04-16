import Axios from 'axios';
import { SERVER_URLS, API_TIMEOUT } from '../Consts';

const METHODS = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE',
  PUT: 'PUT'
};

const apiCall = (method, url, data=undefined, config={}) => Axios({
  method,
  url,
  data,
  ...config
})

const writeSampleToServer = (sampleData) => apiCall(
  METHODS.POST,
  SERVER_URLS.POST_SAMPLE,
  sampleData,
  {
    timeout: API_TIMEOUT
  }
);

export const apiService = {
  writeSampleToServer
}