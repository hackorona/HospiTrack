import device from 'react-native-device-info';

async function getPhoneDataForSample() {
  const imei = device.getUniqueId(); 

  return { imei };
}

export const phoneService = {
  getPhoneDataForSample
}
