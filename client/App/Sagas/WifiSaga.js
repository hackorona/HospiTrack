import { put, call, delay } from 'redux-saga/effects'
import WifiActions from '../Stores/Wifi/Actions'
import { wifiService } from '../Services/WifiService'
import { NEXT_SAMPLE_DELAY as DELAY } from '../Consts';

// Temp, as repeat is till exiting hospital and is NOT a const.
const REPEAT = 10;

export function* fetchWifiList() {
  let counter = REPEAT;
  while (counter--) { 
    // Dispatch a redux action using `put()`
    yield put(WifiActions.fetchWifiListLoading())

    // Fetch wifi informations from the wifiService
    const wifiArr = yield call(wifiService.fetchWifiList)
    if (wifiArr) {
      yield put(WifiActions.fetchWifiListSuccess(wifiArr))
    } else {
      yield put(
        WifiActions.fetchWifiListFailure('There was an error while fetching Wifi list.')
      );
    }

    yield delay(DELAY);
  }
}
