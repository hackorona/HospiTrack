import { put, call, delay } from 'redux-saga/effects';
import GpsActions from '../Stores/Gps/Actions';
import { gpsService } from '../Services/GpsService';
import { NEXT_SAMPLE_DELAY as DELAY } from '../Consts';

// Temp, as repeat is till exiting hospital and is NOT a const.
const REPEAT = 10;

export function* fetchGpsLocation() {
  let counter = REPEAT;
  while (counter--) { 
    yield put(GpsActions.fetchGpsLocationLoading())

    // Fetch gps location from gpsService
    try {
      const gpsLocation = yield call(gpsService.getGPSLocation)
      yield put(GpsActions.fetchGpsLocationSuccess(gpsLocation))
    } catch(e) {
      yield put(GpsActions.fetchGpsLocationFailure(e));
      // TODO: for any error - we should put null result (at sending to db..)
    }

    yield delay(DELAY);
  }
}
