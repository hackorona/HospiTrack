import { takeLatest, all } from 'redux-saga/effects'
import { ExampleTypes } from 'App/Stores/Example/Actions'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { WifiTypes } from '../Stores/Wifi/Actions'
import { PermissionsTypes } from '../Stores/Permissions/Actions'
import { fetchUser } from './ExampleSaga'
import { startup, permissionsUpdate, permissionsRequest } from './StartupSaga'
import { fetchWifiList } from './WifiSaga'

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(PermissionsTypes.PERMISSIONS_REQUEST, permissionsRequest),
    takeLatest(PermissionsTypes.PERMISSIONS_UPDATE, permissionsUpdate),
    // Call `fetchUser()` when a `FETCH_USER` action is triggered
    takeLatest(ExampleTypes.FETCH_USER, fetchUser),
    takeLatest(WifiTypes.FETCH_WIFI_LIST, fetchWifiList),
  ])
}
