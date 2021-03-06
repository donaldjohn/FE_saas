/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class MyOrderCarIDItem extends PureComponent {

    constructor(props) {
        super(props);

    }

    render() {
        let shows = false;
        if(this.props.data.pledge_info.pledge_status==1 && this.props.data.pledge_info.pledge_type==1){
            shows=true;
        }
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                this.props.callBack();
            }} style={{width:width,height:Pixel.getPixel(45),backgroundColor:'#fff',flexDirection:'row'}}>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{color:'#666',fontSize:Pixel.getPixel(14),marginLeft:Pixel.getPixel(15)}}>{this.props.data.car_vin==''?'车架号':this.props.data.car_vin}</Text>
                </View>
                <View style={{flex:1, flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginRight:Pixel.getPixel(15)}}>
                    {shows?  <View style={{height:Pixel.getPixel(15),justifyContent:'center',alignItems:'center',borderRadius:10,
                        backgroundColor:'#FFE3DF', marginRight:Pixel.getPixel(18),width:Pixel.getPixel(50)}}>
                        <Text style={{fontSize:Pixel.getPixel(12),color:'#FA5741'}}>
                            待出库
                        </Text>
                    </View>:<View/>}
                    {this.props.data.car_vin_status==0?<Text style={{fontSize:Pixel.getPixel(14),color:'#333333',marginRight:Pixel.getPixel(16)}}>
                        待填写
                    </Text>:<Text style={{fontSize:Pixel.getPixel(14),color:'#3AC87E',marginRight:Pixel.getPixel(16)}}>
                        已完成
                    </Text>

                    }

                    <Image style={{width:Pixel.getPixel(9),height:Pixel.getPixel(15)}}
                           source={require('../../../../images/neworder/right.png')}/>
                </View>
            </TouchableOpacity>
        );
    }

}
const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        height: Pixel.getPixel(70),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderColor: '#00000000'
    }
})