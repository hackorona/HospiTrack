import fs from 'react-native-fs';
import Axios from 'axios';
import { promisesService } from './PromisesService'
import { apiService } from './ApiService'

const saveSample = async (data) => {
  try {
    const results = await promisesService.allSettled([
      writeLocally(data),
      apiService.writeSampleToServer(data)
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

const writeLocally = async (data) => {
    const path = fs.ExternalStorageDirectoryPath + '/data.txt';
    const isFileExist = await fs.exists(path);
    const dataToWrite = JSON.stringify(data) + ", ";
    
    if (isFileExist) {
      return new Promise((res, rej) => {
        fs.appendFile(path, dataToWrite, 'utf8')
          .then(() => {
            res('ADDED TO FILE! file: ' + path);
          })
          .catch((err) => {
            rej(err.message);
          });
      })
    } else {
      return new Promise((res, rej) => {
        fs.writeFile(path, dataToWrite, 'utf8')
          .then(() => {
            res('FILE CREATED! to: ' + path)
          })
          .catch((err) => {
            rej(err.message);
          });
      });
    }
}

export const dbService = {
  saveSample
}