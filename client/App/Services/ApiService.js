import Axios from 'axios';
import { SERVER_URLS } from '../Consts';

// For now it always fails
const writeSampleToServer = async (data) => Axios.post(
  SERVER_URLS.POST_SAMPLE,
  data,
  // TODO: decide timeout
  {timeout: 1000}
);

export const apiService = {
  writeSampleToServer
}