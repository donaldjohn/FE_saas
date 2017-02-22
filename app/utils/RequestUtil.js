import StorageUtil from "./StorageUtil";
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
            let token = '';
            if (data.code === 1) {
                token = data.result;
            }
            fetch(url + '?token=' + token + '&device_code=dycd_dms_manage_android', {
                method,
                body
            })
                .then((response) => {
                    if (response.ok) {
                        isOk = true;
                    } else {
                        isOk = false;
                    }
                    return response.json();
                })
                .then((responseData) => {
                    if (isOk) {
                        console.log("success----------" + JSON.stringify(responseData));
                        resolve({mjson: responseData, mycode: 1});
                    } else {
                        console.log("error----------" + JSON.stringify(responseData));
                        resolve(responseData);
                    }
                })
                .catch((error) => {
                    console.log("error----------" + error);
                    reject(error);
                });
        })
    });
}

export {request};