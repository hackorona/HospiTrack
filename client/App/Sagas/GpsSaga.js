import { put, call, delay } from 'redux-saga/effects'
import WifiActions from '../Stores/Wifi/Actions'
import { gpsService } from '../Services/GpsService'
import { NEXT_SAMPLE_DELAY as DELAY } from '../Consts';

// Temp, as repeat is till exiting hospital and is NOT a const.
const REPEAT = 10;

export function* fetchGpsLocation() {
  let counter = REPEAT;
  while (counter--) { 
    // // Dispatch a redux action using `put()`
    // yield put(??Actions.fetchGpsLoading())

    // Fetch gps location from gpsService
    try {
      const geoLocation = yield call(gpsService.getGPSLocation)
      // yield put(??Actions.fetchGpsSuccess(geoLocation))
      console.log('geoLocation ?', geoLocation);
    } catch(e) {
      console.error('error ? ', e);
      // yield put(??Actions.fetchGpsFailure('Error with gps'));
      // TODO: for any error - we should put null result
    }

    yield delay(DELAY);
  }
}
