import VIForegroundService from '@voximplant/react-native-foreground-service';

const channelConfig = {
    id: 'channelId',
    name: 'Channel name',
    description: 'Channel description',
    enableVibration: false
};
VIForegroundService.createNotificationChannel(channelConfig);

export async function startForegroundService(){
    console.log("Hooray! Foreground! background stuff")
    const notificationConfig = {
        channelId: 'channelId',
        id: 3456,
        title: 'Title',
        text: 'Some text',
        icon: 'ic_icon'
    };
    try {
      console.log('inside try');
      // console.time('start-service');
      await VIForegroundService.startService(notificationConfig);
      // console.timeEnd('start-service');
      console.log('started service successfuly!');
    } catch (e) {
        console.error(e);
    }
}
export const AndroidForegroundService = {
    startForegroundService
}
