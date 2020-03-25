import { PermissionsAndroid } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import OpenAppSettings from 'react-native-app-settings';

const requestPermissions = async () => {
  const grantedResult = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location permission is required for WiFi connections',
      message:
        'This app needs location permission as this is required  ' +
        'to scan for wifi networks.',
      buttonNegative: 'DENY',
      buttonPositive: 'ALLOW',
    },
  );

  return grantedResult;
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