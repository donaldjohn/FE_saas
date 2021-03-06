import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

let {height, width} = Dimensions.get('window');
import  PixelUtil from '../../utils/PixelUtil'
import  * as fontAndColor from '../../constant/fontAndColor'
var Pixel = new PixelUtil();
export default class FinanceButton extends PureComponent {


    render() {
        return (
            <View style={{backgroundColor:'white',width:width,justifyContent:'center',
            alignItems:'center',paddingBottom:Pixel.getPixel(20)}}>
                <View
                    style={{backgroundColor:'white',width:Pixel.getPixel(306),flexDirection: 'row'}}>
                    <TouchableOpacity activeOpacity={0.8} style={{flex:1,justifyContent:'center',alignItems: 'center'}}
                                      onPress={this.props.borrowBt}>
                        <View style={{backgroundColor:fontAndColor.COLORB0,width:Pixel.getPixel(120),
                    height:Pixel.getPixel(36),justifyContent:'center',alignItems: 'center'}}>
                            <Text style={{backgroundColor:'#00000000',fontSize: Pixel.getFontPixel(15),
                        color: '#fff'}}>借款</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={{flex:1,justifyContent:'center',alignItems: 'center'}} onPress={this.props.payBt}>
                        <View style={{backgroundColor:'#fff',width:Pixel.getPixel(120),
                    height:Pixel.getPixel(36),justifyContent:'center',alignItems: 'center',
                    borderColor:fontAndColor.COLORB0,borderWidth:StyleSheet.hairlineWidth}}>
                            <Text style={{backgroundColor:'#00000000',fontSize: Pixel.getFontPixel(15),
                        color: fontAndColor.COLORB0}}>还款</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
