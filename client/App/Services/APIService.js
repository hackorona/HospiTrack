import fs from 'react-native-fs';
import { PermissionsAndroid } from 'react-native';


// Currently writes to a local file 
const writeToServer = async (Data) => {
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
    }

}

export default {
    writeToServer
}