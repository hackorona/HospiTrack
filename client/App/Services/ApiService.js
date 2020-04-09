import Axios from 'axios';
import { SERVER_URLS, API_TIMEOUT, SERVER_AUTH } from '../Consts';

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

const writeSampleToServer = (sampleData) => {
  const data = {
    ...SERVER_AUTH,
    ...sampleData
  }

  return apiCall(
    METHODS.POST,
    SERVER_URLS.POST_SAMPLE,
    data,
    {
      timeout: API_TIMEOUT
    }
  );
}

export const apiService = {
  writeSampleToServer
}