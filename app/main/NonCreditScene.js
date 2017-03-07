import React from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    Linking
} from 'react-native';

import BaseComponent from '../component/BaseComponent';
var {height, width} = Dimensions.get('window');
import * as fontAndColor  from '../constant/fontAndColor';
import  PixelUtil from '../utils/PixelUtil'
let Pixel = new PixelUtil();

export default class NonCreditScene extends BaseComponent {
    initFinish = () => {

    }


    render() {
        return (
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3,
            justifyContent:'center',paddingLeft:Pixel.getPixel(15),paddingRight:Pixel.getPixel(15)}}>
                <Text style={{fontSize: fontAndColor.TITLEFONT40}}>您好商户：{'\n'}{'\n'}您还未在我公司授信，
                 所以我们还不能为您提供金融服务，请拨打电话联系我司客服人员进行授信申请！
                </Text>
                <TouchableOpacity onPress={()=>{
                    Linking.openURL('tel:400-800-8888#');
                }} activeOpacity={0.8} style={{width:width-Pixel.getPixel(30),height:Pixel.getPixel(44),justifyContent:'center',
                alignItems:'center',backgroundColor: fontAndColor.COLORB0,marginTop:Pixel.getPixel(25)}}>
                    <Text style={{fontSize: fontAndColor.NAVIGATORFONT34,color:'#fff'}}>拨打400-800-8888</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parentStyle: {
        flex: 1
    },
    childStyle: {
        width: width,
        height: height
    },
});
