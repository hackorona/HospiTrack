import { race, take, select, put, all, delay } from 'redux-saga/effects';
import GpsActions, { GpsTypes } from '../Stores/Gps/Actions';
import { NEXT_SAMPLE_DELAY as DELAY } from '../Consts';
import WifiActions, { WifiTypes } from '../Stores/Wifi/Actions';
import SampleActions from '../Stores/Samples/Actions';

const wifiListSelector = (state) => !state.wifi.sampleSent && state.wifi.wifiList;
const gpsLocationSelector = (state) => !state.gps.sampleSent && state.gps.gpsLocation;

export function* sampleData() {
  console.log('sampleData saga');

  // Start scan!
  yield all([
    put(GpsActions.fetchGpsLocation()),
    put(WifiActions.fetchWifiList())
  ]);

  const {data, timeout} = yield race({
    data: all([
      take(GpsTypes.FETCH_GPS_LOCATION_SUCCESS),
      take(WifiTypes.FETCH_WIFI_LIST_SUCCESS)
    ]),
    timeout: delay(DELAY)
  });

  const wifi = yield select(wifiListSelector);
  const gps = yield select(gpsLocationSelector);

  if (timeout) {
    console.log('timeout');
    if (!wifi) {
      console.log('no wifi makes me cryfi');
    }    
  } else {
    console.log('success - both are here :D');
  }

  const sample = {
    timestamp: new Date(),
    wifi,
    gps
  };

  console.log('sample ?', sample);
  // TODO: add sample to store
  yield put(SampleActions.sampleSent());
}

export function* sendSample() {

}
