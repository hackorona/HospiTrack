import { PermissionsAndroid } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import OpenAppSettings from 'react-native-app-settings';

const requestPermissions = async () => {
  const permissionsToAsk = [
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
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