import WifiManager from "react-native-wifi-reborn";
import device from 'react-native-device-info';

async function fetchWifiList() {
  return new Promise((res, rej) => {
    WifiManager.setEnabled(true);
    WifiManager.reScanAndLoadWifiList(
      wifiList => {
          let wifiArray =  JSON.parse(wifiList);
          res(wifiArray);
      },
      // TODO: handle error somehow
      error =>  rej(error)
    );
  })
}

async function getWifiDataForSample(wifiList) {
  // TODO: if imei is here to stay, it should be retrieved
  // on startup once, and saved to store!
  const imei = device.getUniqueId(); 
  const wifiDict = wifiList.reduce((accum, curr) => {
    // Set object at key bssid with value rssi
    accum[curr.BSSID] = curr.level;
    return accum;
  }, {});

  return { rssi_by_bssid: wifiDict, imei };
}

export const wifiService = {
  fetchWifiList,
  getWifiDataForSample
}
