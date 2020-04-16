import { put, call } from 'redux-saga/effects';
import GpsActions from '../Stores/Gps/Actions';
import { gpsService } from '../Services/GpsService';

export function* fetchGpsLocation() {
  yield put(GpsActions.fetchGpsLocationLoading())
  // TODO: retry as long as timeout didn't reach (yeah I said it.) (check out service itself ;) iYKwIM)

  // Fetch gps location from gpsService
  try {
    const gpsLocation = yield call(gpsService.getGPSLocation)
    yield put(GpsActions.fetchGpsLocationSuccess(gpsLocation))
  } catch(e) {
    yield put(GpsActions.fetchGpsLocationFailure(e));
  }
}
