import fs from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';
import Axios from 'axios';
import { promisesService } from './PromisesService'

const saveSample = async (data) => {
  try {
    const results = await promisesService.allSettled([
      writeLocally(data),
      writeToServer(data)
    ]);

    const [ localResult, serverResult ] = results;
    const successes = {
      local: localResult.resolved,
      server: serverResult.resolved
    };

    // uncomment on debug only - results are [{ payload: err/result, resloved: bool }].
    // results.forEach((res) => {
    //   if (!res.resolved) {
    //     console.log('e ?', res.payload);
    //   }
    // })

    console.log('Wrote data to', successes);
  } catch(e) {
    // Based on how allSettled built, should never get here.
    console.error('allSettled failed. FIXME!');
  }
}

// For now it always fails
const writeToServer = async (data) => Axios.post(
  // TODO: pass to consts
  'https://hospitrack-api-test.azurewebsites.net/api/insert-router-scan',
  data,
  // TODO: decide timeout
  {timeout: 1000}
);

// TODO: pass permissions or make it with try/catch not if else
const writeLocally = async (Data) => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: "Grant file permissions",
        message: "pretty please"
    }
  );

  if (granted === PermissionsAndroid.RESULTS.GRANTED){
      console.log("Granted permission");
      const path = fs.ExternalStorageDirectoryPath + '/data.txt';
      
      if (await fs.exists(path)){
          fs.appendFile(path, JSON.stringify(Data) + ", ", 'utf8')
              .then((success) => {
              console.log('ADDED TO FILE! file: ' + path);
              
              })
              .catch((err) => {
              console.log(err.message);
              });
      } else {    
          fs.writeFile(path, JSON.stringify(Data), 'utf8')
          .then((success) => {
          console.log('FILE CREATED! to: ' + path)
          })
          .catch((err) => {
          console.log(err.message);
          });
      }
  } else {
      console.log("Where is my permission?");
      throw new Error('No permission');
  }
}

export const dbService = {
  saveSample
}