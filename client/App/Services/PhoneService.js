import device from 'react-native-device-info';

async function getPhoneDataForSample() {
  const imei = device.getUniqueId(); 
  // device.getManufacturerSync()
  return { imei };
}

export const phoneService = {
  getPhoneDataForSample
}
