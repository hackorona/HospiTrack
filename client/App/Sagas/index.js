import { takeLatest, all } from 'redux-saga/effects'
import { StartupTypes } from 'App/Stores/Startup/Actions'
import { WifiTypes } from '../Stores/Wifi/Actions'
import { PermissionsTypes } from '../Stores/Permissions/Actions'
import { startup, permissionsUpdate, permissionsRequest } from './StartupSaga'
import { fetchWifiList } from './WifiSaga'
import { fetchGpsLocation } from './GpsSaga'
import { GpsTypes } from '../Stores/Gps/Actions'
import { sampleData } from './samplesSaga'
import { SamplesTypes } from '../Stores/Samples/Actions';

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(PermissionsTypes.PERMISSIONS_REQUEST, permissionsRequest),
    takeLatest(PermissionsTypes.PERMISSIONS_UPDATE, permissionsUpdate),
    takeLatest(WifiTypes.FETCH_WIFI_LIST, fetchWifiList),
    takeLatest(GpsTypes.FETCH_GPS_LOCATION, fetchGpsLocation),
    takeLatest(SamplesTypes.START_SAMPLE, sampleData)
  ])
}
