import { SERVER_USERNAME, SERVER_PASSWORD } from 'react-native-dotenv'

export const REPEAT_LOCATION_SCAN_TIMES = 10;
const ALWAYS_SAME_DELAY = 3000;
export const NEXT_SAMPLE_DELAY = ALWAYS_SAME_DELAY || 30000; // 4 scans in 2min is Google's limitation
export const ANDROID10_SAMPLE_DELAY = ALWAYS_SAME_DELAY || 5000; // Android 10 gives option for more scans in dev settings
export const ANDROID10_API_LEVEL = 29;

export const GPS_TIMEOUT = NEXT_SAMPLE_DELAY;
export const API_TIMEOUT = NEXT_SAMPLE_DELAY;

const SERVER_PREFIX_URL = 'http://www.wize-web.com/talproject';
export const SERVER_URLS = {
  // IS_ALIVE: SERVER_PREFIX_URL + '/test',
  POST_SAMPLE: SERVER_PREFIX_URL + '/AddOne.asp',
}
export const SERVER_AUTH = {
  UserName: SERVER_USERNAME,
  Password: SERVER_PASSWORD
}

export const IS_DEV = __DEV__;