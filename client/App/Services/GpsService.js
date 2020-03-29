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

function getGpsDataForSample(gpsLocation) {
  let accuracy, altitude, longitude, latitude;

  // Define all gps data! If gpsLocation is undefined, leave undefined
  if (gpsLocation) {
    const { coords } = gpsLocation;
    // destruct elements
    ({accuracy, altitude, longitude, latitude} = coords);
  }

  return { accuracy, altitude, longitude, latitude };
}

export const gpsService = {
  getGPSLocation,
  getGpsDataForSample
}