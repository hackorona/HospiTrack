import Geolocation from 'react-native-geolocation-service';
import { GPS_TIMEOUT } from '../Consts';

function getGPSLocation() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
              (position) => {
                resolve(position);
              },
              (error) => {
                  // See error code charts below.
                  reject(error);
              },
              { enableHighAccuracy: true, timeout: GPS_TIMEOUT }
  )});
}

export const gpsService = {
  getGPSLocation
}