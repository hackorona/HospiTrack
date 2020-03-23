import { put, call } from 'redux-saga/effects'
import WifiActions from '../Stores/Wifi/Actions'
import { wifiService } from '../Services/WifiService'

export function* fetchWifiList() {
  // Dispatch a redux action using `put()`
  yield put(WifiActions.fetchWifiListLoading())

  // Fetch user informations from an API
  const wifiArr = yield call(wifiService.fetchWifiList)
  if (wifiArr) {
    yield put(WifiActions.fetchWifiListSuccess(wifiArr))
  } else {
    yield put(
      WifiActions.fetchWifiListFailure('There was an error while fetching Wifi list.')
    )
  }
}
