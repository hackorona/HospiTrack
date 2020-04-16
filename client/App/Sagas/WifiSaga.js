import { put, call } from 'redux-saga/effects'
import WifiActions from '../Stores/Wifi/Actions'
import { wifiService } from '../Services/WifiService'

export function* fetchWifiList() {
  yield put(WifiActions.fetchWifiListLoading())

  try {
    // Fetch wifi informations from the wifiService
    const wifiArr = yield call(wifiService.fetchWifiList)
    yield put(WifiActions.fetchWifiListSuccess(wifiArr))
  } catch(e) {
    yield put(WifiActions.fetchWifiListFailure(e));
  }
}
