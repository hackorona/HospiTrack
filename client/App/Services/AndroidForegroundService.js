import VIForegroundService from '@voximplant/react-native-foreground-service';

const channelConfig = {
    id: 'channelId',
    name: 'Channel name',
    description: 'Channel description',
    enableVibration: false
};
VIForegroundService.createNotificationChannel(channelConfig);

export async function startForegroundService(){
    const notificationConfig = {
        channelId: 'channelId',
        id: 3456,
        title: 'Title',
        text: 'Some text',
        icon: 'ic_icon'
    };
    try {
        await VIForegroundService.startService(notificationConfig);
    } catch (e) {
        console.error(e);
    }
}

export const AndroideForegroundService = {
    startForegroundService
}
