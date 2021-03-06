package com.vin.scan;

import android.app.Activity;
import android.content.Intent;
import android.telephony.TelephonyManager;
import android.content.Context;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.text.TextUtils;
import android.net.Uri;

import android.os.Environment;
import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by Administrator on 2017/3/2.
 */

public class VinScanModule extends ReactContextBaseJavaModule implements ActivityEventListener{

    private Promise mVLPromise;
    private Context mContext;

    public VinScanModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
        mContext = reactContext;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if(mVLPromise != null){
            if(resultCode == Activity.RESULT_CANCELED){
                mVLPromise.reject("error","Result_Canceled");
            }else if(resultCode == Activity.RESULT_OK){
                if(requestCode == 1){
                    String vl = data.getStringExtra("vl");
                    mVLPromise.resolve(vl);
                    mVLPromise = null;
                }else if(requestCode == 0){
                    String vl = data.getStringExtra("vin");
                    mVLPromise.resolve(vl);
                    mVLPromise = null;
                }
            }
        }
    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    @Override
    public String getName() {
        return "VinScan";
    }

    @ReactMethod
    public void scan(int vinType,final Promise promise){
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject("error", "Activity doesn't exist");
            return;
        }

        mVLPromise = promise;
        try{
            if(vinType == 1){
                Intent vlIntent = new Intent(currentActivity,VLScanActivity.class);
                currentActivity.startActivityForResult(vlIntent,1);
            }else if(vinType == 0){
                Intent vinIntent = new Intent(currentActivity,FDScanActivity.class);
                currentActivity.startActivityForResult(vinIntent,0);
            }
        }catch (Exception e){
            mVLPromise.reject("error",e.toString());
            mVLPromise = null;
        }
    }

     @ReactMethod
        public void goBack(){
        Activity currentActivity = getCurrentActivity();
                Intent intent = new Intent(Intent.ACTION_MAIN);
                intent.addCategory(Intent.CATEGORY_HOME);
                                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                                currentActivity.startActivity(intent);
        }
    @ReactMethod
    public void getIMEI(Callback callback){
        TelephonyManager mTm = (TelephonyManager)mContext.getSystemService(Context.TELEPHONY_SERVICE);
        String imei = mTm.getDeviceId();
        callback.invoke(imei);
    }
    @ReactMethod
    public void getPhoneVersion(Callback callback){
        String verison = "phoneVersion=" +android.os.Build.VERSION.RELEASE  +
                ",phoneModel=" + android.os.Build.MODEL+
                ",appVersion="+getAppVersionName(mContext);
        callback.invoke(verison);
    }
    private String getAppVersionName(Context context) {
        String versionName = "";
        try {
            PackageManager packageManager = context.getPackageManager();
            PackageInfo packageInfo = packageManager.getPackageInfo("com.fe_sass", 0);
            versionName = packageInfo.versionName;
            if (TextUtils.isEmpty(versionName)) {
                return "";
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return versionName;
    }

    @ReactMethod
    public void callPhone(String tel){
        tel = tel.replace(",", ",,");
        Intent intent = new Intent(Intent.ACTION_CALL);
        intent.setData(Uri.fromParts("tel", tel, null));//拼一个电话的Uri，拨打分机号 关键代码
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mContext.startActivity(intent);
    }

    @ReactMethod
    public void getPicture(Callback callback){
        String sdPath = getSDPath() + File.separator + "saas.png";
        try {
            InputStream its = mContext.getAssets().open("erweima.png");
            int fileLength = its.available();
            File file = new File(sdPath);
            if (!file.exists()) {
                file.createNewFile();
            }
            FileOutputStream fots = new FileOutputStream(file, true);
            byte[] buffer = new byte[fileLength];
            int readCount = 0;
            while (readCount < fileLength) {
                readCount += its.read(buffer, readCount, fileLength - readCount);
            }
            fots.write(buffer, 0, fileLength);
            its.close();
            fots.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        callback.invoke(sdPath);
    }

    public String getSDPath() {
        File sdDir = null;
        boolean sdCardExist = Environment.getExternalStorageState()
                .equals(android.os.Environment.MEDIA_MOUNTED); //判断sd卡是否存在
        if (sdCardExist) {
            sdDir = Environment.getExternalStorageDirectory();//获取跟目录
        }
        return sdDir.getPath();
    }

}
