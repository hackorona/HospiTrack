/* eslint-disable prettier/prettier */
import ForegroundService from 'react-native-foreground-service';

const TASK_NAME = 'dataSample';

let resolveFunc;

const initForegroundService = async () => {
  const foregroundTask = async (data) => {
    console.log('foregrondTask initialized');
    return new Promise((resolve) => {
      // Pass to "global" var
      resolveFunc = resolve;
    });
  }

  ForegroundService.registerForegroundTask(TASK_NAME, foregroundTask);

  // TODO: play with configs
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
    taskName: TASK_NAME,
    delay: 0
  });
}

const stopForegroundService = async () => {
  if (resolveFunc) {
    console.log('resolving task');
    resolveFunc();
  } else {
    throw new Error(`Can't stop foreground service if didn't start`);
  }
  await ForegroundService.stopServiceAll();
  console.log("STOPPED");
}

export const AndroidForegroundService = {
  initForegroundService,
  stopForegroundService
}