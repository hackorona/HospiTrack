import { put, call, select } from 'redux-saga/effects'
import PermissionsActions from '../Stores/Permissions/Actions'
import { permissionsService } from '../Services/PermissionsService'
import NavigationService from '../Services/NavigationService'
import { Platform } from 'react-native'
import { AndroidForegroundService } from '../Services/AndroidForegroundService'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Splash screen is shown till navigateAndReset is called at permissionsUpdate saga
  yield put(PermissionsActions.permissionsRequest());

  // Make app work in background
  yield call(AndroidForegroundService.initForegroundService);
}

export function* permissionsRequest() {
  // We check for location permissions granted.
  const permissionsStatus = yield call(permissionsService.askPermissions);

  // let store know permissions status
  // and wait for permissionsUpdate saga to be triggered
  yield put(PermissionsActions.permissionsUpdate(permissionsStatus));
}

export function* permissionsUpdate() {
  const isGranted = yield select(state => state.permissions.granted);

  if (isGranted) {
    // When those operations are finished we redirect to the main screen
    NavigationService.navigateAndReset('MainScreen')
  } else {
    // w/o location permissions, app is useless. go to NoPermissionsScreen
    // and beg user to grant permissions.
    return NavigationService.navigateAndReset('NoPermissionsScreen')
  }
}
