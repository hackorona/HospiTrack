/* eslint-disable prettier/prettier */
import ForegroundService from 'react-native-foreground-service';

const initForegroundService = async () => {
    let resolveFunc;
    const foregroundTask = async (data) => {
    return new Promise((resolve) => {
        resolveFunc = () => {
        console.warn('resolveFunc()');
        resolve();
        };
    });
    }

    ForegroundService.registerForegroundTask("dataSample", foregroundTask);

    const notificationConfig = {
        id: 1,
        title: 'Service',
        message: `HospiTrack is keeping you safe`,
        visibility: 'public',
        importance: 'low',
        number: 55
    };

    await ForegroundService.startService(notificationConfig);
    await ForegroundService.runTask({
    taskName: 'dataSample',
    delay: 0
    }); 
}

const stopForegroundService = async () => {
    await ForegroundService.stopServiceAll();
    console.log("STOPPED");
}

export const AndroidForegroundService = {
    initForegroundService,
    stopForegroundService
}