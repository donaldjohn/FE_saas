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
import MyOrderListCarItem from "./MyOrderListCarItem";
export  default class MyOederItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state={
            zk:false
        }
    }

    render() {
        let itemList = [];
        for (let i = 0;i<this.props.data.car_item.length;i++){
            if(i>1&&this.state.zk==false){
                break;
            }
            itemList.push(<MyOrderListCarItem key={i+'123'} data={this.props.data.car_item[i]}/>);
        }

        return (
            <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                this.props.callBack();
            }} style={{width:width,backgroundColor:'#fff'}}>
                <View style={{width:width,height:Pixel.getPixel(40), flexDirection:'row'}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:'#666666',marginLeft:Pixel.getPixel(16)}}>
                            {this.props.data.seller_company_name}
                        </Text>
                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                        <Text style={{fontSize:Pixel.getPixel(14),color:'red',marginRight:Pixel.getPixel(16)}}>
                            {this.props.data.status}
                        </Text>
                    </View>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#d8d8d8'}}></View>
                {itemList}
                {
                    this.props.data.car_item.length>2?<TouchableOpacity activeOpacity={0.9} onPress={()=>{
                        this.setState({zk:!this.state.zk});
                    }} style={{width:width,height:Pixel.getPixel(42),justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                        <View style={{width:Pixel.getPixel(11),height:Pixel.getPixel(7)}}>

                        </View>
                        <Text style={{fontSize:Pixel.getPixel(13),color:'#666',marginLeft:Pixel.getPixel(9)}}>
                            {this.state.zk?'收起':'查看全部'}
                        </Text>
                        <Image style={{width:Pixel.getPixel(11),height:Pixel.getPixel(7),marginLeft:Pixel.getPixel(9)}}
                               source={this.state.zk?require('../../../../images/neworder/shang.png'):require('../../../../images/neworder/xia.png')}>

                        </Image>
                    </TouchableOpacity>:<View/>
                }
                {
                    this.props.data.car_item.length>2?<View style={{width:width,height:1,backgroundColor:'#d8d8d8'}}></View>:<View/>
                }

                <View style={{width:width,height:Pixel.getPixel(72)}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:8,justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(12),color:'#666'}}>
                                订金合计：
                            </Text>
                        </View>
                        <View style={{flex:3,justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(12),color:'#666',marginRight:Pixel.getPixel(16)}}>
                                <Text style={{fontSize:Pixel.getPixel(15),color:'#666', fontWeight:'bold'}}>
                                    {this.props.data.deposit_amount/10000}
                                </Text>万元
                            </Text>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:8,justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(12),color:'#666'}}>
                                成交价合计：
                            </Text>
                        </View>
                        <View style={{flex:3,justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(12),color:'#666',marginRight:Pixel.getPixel(16)}}>
                                <Text style={{fontSize:Pixel.getPixel(15),color:'#666', fontWeight:'bold'}}>
                                    {this.props.data.transaction_amount/10000}
                                </Text>万元
                            </Text>
                        </View>
                    </View>
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