import { PermissionsAndroid } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import OpenAppSettings from 'react-native-app-settings';

const requestPermissions = async () => {
  // TODO: we need to ask less permissions in the future.
  // as the user might be afraid from so much permissions
  // right on startup
  const permissionsToAsk = [
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
  ]

  const grantedResults = await PermissionsAndroid.requestMultiple(permissionsToAsk);

  // Return only the results, without names of permissions
  // as we accept all or nothing.
  return Object.values(grantedResults);
};

const askPermissions = async () => { 
  const grantedResults = await requestPermissions();
  return {
    // Granted true only if *all* results are granted.
    granted: grantedResults.every(res => res === PermissionsAndroid.RESULTS.GRANTED),
    // Blocked true if even one result is blocked.
    blocked: grantedResults.some(res => res === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN)
  };
}

const { exitApp } = RNExitApp;

// Has to be wrapped in function or crashes.
const openSettings = () => OpenAppSettings.open();

export const permissionsService = {
  askPermissions,
  exitApp,
  openSettings
}