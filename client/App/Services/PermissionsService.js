import { PermissionsAndroid } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import OpenAppSettings from 'react-native-app-settings';

const requestPermissions = async () => {
  const grantedResult = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
  ]);
    // TODO: return to single request of location once getting rid of imei
    // const grantedResult = await PermissionsAndroid.request(
      // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      // {
      //   title: 'Location permission is required for WiFi connections',
      //   message:
      //     'This app needs location permission as this is required  ' +
      //     'to scan for wifi networks.',
      //   buttonNegative: 'DENY',
      //   buttonPositive: 'ALLOW',
      // },
    // );

  // return grantedResult;
  return grantedResult['android.permission.ACCESS_FINE_LOCATION'];
};

const askPermissions = async () => { 
  const granted = await requestPermissions();
  return {
    granted: granted === PermissionsAndroid.RESULTS.GRANTED,
    blocked: granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
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