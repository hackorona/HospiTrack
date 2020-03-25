import { put, call } from 'redux-saga/effects'
import ExampleActions from 'App/Stores/Example/Actions'
import NavigationService from 'App/Services/NavigationService'
import { wifiService } from '../Services/WifiService';

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  // Dispatch a redux action using `put()`
  // @see https://redux-saga.js.org/docs/basics/DispatchingActions.html
  yield put(ExampleActions.fetchUser())

  // Add more operations you need to do at startup here
  // ...

  // We check for location permissions granted.
  const isPermissionsGranted = yield call(wifiService.askPermissions);
  
  // w/o location permissions, app is useless. go to NoPermissionsScreen
  // and beg user to grant permissions.
  if (!isPermissionsGranted) {
    return NavigationService.navigateAndReset('NoPermissionsScreen')
  }

  // When those operations are finished we redirect to the main screen
  NavigationService.navigateAndReset('MainScreen')
}
