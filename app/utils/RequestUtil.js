import StorageUtil from "./StorageUtil";
var Platform = require('Platform');
import * as StorageKeyNames from "../constant/storageKeyNames";
const request = (url, method, params) => {

    let isOk;
    let body = '';
    for (let key of Object.keys(params)) {
        body += key;
        body += '=';
        body += params[key];
        body += '&';
    }
    if (body.length > 0) {
        body = body.substring(0, body.length - 1);
    }

    return new Promise((resolve, reject) => {
        StorageUtil.mGetItem(StorageKeyNames.token, (data) => {
            let token = '0ac50af9a02b752ca0f48790dc8ea6d1';
            // if (data.code === 1) {
            //     token = data.result;
            // }
            let device_code = '';
            if(Platform.OS==='android'){
                device_code='dycd_dms_manage_android';
            }else{
                device_code='dycd_dms_manage_ios';
            }
            fetch(url + '?token=' + token + '&device_code='+device_code, {
                method,
                body
            })
                .then((response) => {
                    if (response.ok) {
                        isOk = true;
                    } else {
                        isOk = false;
                    }
                    console.log(response);
                    return response.json();
                })
                .then((responseData) => {
                    if (isOk) {
                        // console.log("success----------" + JSON.stringify(responseData));
                        resolve({mjson: responseData, mycode: 1});
                    } else {
                        // console.log("error----------" + JSON.stringify(responseData));
                        resolve(responseData);
                    }
                })
                .catch((error) => {
                    // console.log("error----------" + error);
                    reject(error);
                });
        })
    });
}

export {request};