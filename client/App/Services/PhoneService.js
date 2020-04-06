import device from 'react-native-device-info';

async function getPhoneDataForSample() {
  const imei = device.getUniqueId(); 
  const manufacturer = await device.getManufacturer();
  const android_version = device.getSystemVersion();
  return { imei, manufacturer, android_version };
}

export const phoneService = {
  getPhoneDataForSample
}
