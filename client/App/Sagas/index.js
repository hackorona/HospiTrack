import { takeLatest, all } from 'redux-saga/effects'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { WifiTypes } from '../Stores/Wifi/Actions'
import { startup } from './StartupSaga'
import { fetchWifiList } from './WifiSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(WifiTypes.FETCH_WIFI_LIST, fetchWifiList),
  ])
}
