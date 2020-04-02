import { race, take, select, put, all, delay, fork, cancel, call } from 'redux-saga/effects';
import GpsActions, { GpsTypes } from '../Stores/Gps/Actions';
import { NEXT_SAMPLE_DELAY , ANDROID10_SAMPLE_DELAY, ANDROID10_API_LEVEL as ANDROID10} from '../Consts';
import WifiActions, { WifiTypes } from '../Stores/Wifi/Actions';
import SampleActions from '../Stores/Samples/Actions';
import { gpsService } from '../Services/GpsService';
import { wifiService } from '../Services/WifiService';
import { dbService } from '../Services/DbService';
import { Platform } from 'react-native';

const wifiListSelector = (state) => !state.wifi.sampleSent && state.wifi.wifiList;
const gpsLocationSelector = (state) => !state.gps.sampleSent && state.gps.gpsLocation;
const roomIdSelector = (state) => state.samples.roomId;

const DELAY = 
Platform.Version >= ANDROID10 ? ANDROID10_SAMPLE_DELAY : NEXT_SAMPLE_DELAY;

export function* sampleData() {
  while (true) {
    const task = yield fork(sampleDataOnce);
    yield delay(DELAY);
    if (task) cancel(task);
  } 
}

export function* sampleDataOnce() {
  console.log('sampleDataOnce saga');

  try {

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
        throw new Error('No wifi makes me cryfi!');
      }
    } else {
      console.log('success - both are here :D');
    }

    const gpsDataForSample = yield call(gpsService.getGpsDataForSample, gps);
    const wifiDataForSample = yield call(wifiService.getWifiDataForSample, wifi);
    const roomIdForSample = yield select(roomIdSelector);

    const sample = {
      // imei is coming from wifiService as it's temp.
      ...gpsDataForSample,
      ...wifiDataForSample,
      // Time in ms
      timestamp: Date.now(),
      roomId: roomIdForSample,
    };

    yield call(sendSample, sample);
  } catch(e) {
    console.log('e ?', e);
  } finally {
    // TODO: add sample to store
    // This marks last samples as already seen, that's why we always dispatch this.
    // TODO: consider rename to markSample (as it isn't neccearly sent..)
    yield put(SampleActions.sampleSent());
  }  
}

export function* sendSample(sample) {
  console.log('sample to send ?', sample);
  dbService.saveSample(sample);
}
