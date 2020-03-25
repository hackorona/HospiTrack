import WifiManager from "react-native-wifi-reborn";
import { PermissionsAndroid } from 'react-native';

async function fetchWifiList() {
  return new Promise((res, rej) => {
    WifiManager.setEnabled(true);
    WifiManager.reScanAndLoadWifiList(
      wifiList => {
          let wifiArray =  JSON.parse(wifiList);
          res(wifiArray);
      },
      error =>  rej(error)
    );
  })
}

const askPermissions = async () => {
  const granted = await PermissionsAndroid.request(
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
  
  return (granted === PermissionsAndroid.RESULTS.GRANTED);
}

export const wifiService = {
  fetchWifiList,
  askPermissions
}
