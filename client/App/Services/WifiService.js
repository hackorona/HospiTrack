import WifiManager from "react-native-wifi-reborn";

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

export const wifiService = {
  fetchWifiList
}
