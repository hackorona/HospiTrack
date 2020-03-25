import { put, call, select } from 'redux-saga/effects'
import PermissionsActions from '../Stores/Permissions/Actions'
import { permissionsService } from '../Services/PermissionsService';
import NavigationService from '../Services/NavigationService'
import { Platform } from 'react-native'

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // We can see if android or ios!
  const platformMsg = Platform.select({
    ios: 'This is ios',
    android: 'This is android',
  });

  console.log('platformMsg ?', platformMsg);

  // Add more operations you need to do at startup here
  // Splash screen is shown till navigateAndReset is called ad end of this saga
  // ...
  yield put(PermissionsActions.permissionsRequest());

  // App moves to main screen on permissions granted.
}

export function* permissionsRequest() {
  // We check for location permissions granted.
  const permissionsStatus = yield call(permissionsService.askPermissions);

  // let store know permissions status
  yield put(PermissionsActions.permissionsUpdate(permissionsStatus));

  // w/o location permissions, app is useless. go to NoPermissionsScreen
  // and beg user to grant permissions.
  if (!permissionsStatus.granted)
    return NavigationService.navigateAndReset('NoPermissionsScreen')
}

export function* permissionsUpdate() {
  const isGranted = yield select(state => state.permissions.granted);

  if (isGranted) {
    // When those operations are finished we redirect to the main screen
    NavigationService.navigateAndReset('MainScreen')
  }
}
