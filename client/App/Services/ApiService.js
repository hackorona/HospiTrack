import Axios from 'axios';

// For now it always fails
const writeSampleToServer = async (data) => Axios.post(
  // TODO: pass to consts
  'https://hospitrack-app-api.azurewebsites.net/api/insert-router-scan',
  data,
  // TODO: decide timeout
  {timeout: 1000}
);

export const apiService = {
  writeSampleToServer
}