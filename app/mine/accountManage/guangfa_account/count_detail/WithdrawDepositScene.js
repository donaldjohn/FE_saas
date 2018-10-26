/**
 * Created by dingyonggang on 2017/10/27.
 */

import React, {Component} from "react";
import {
    View,
    Text, Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback,
    ScrollView,
    Button, StatusBar
} from "react-native";
import BaseComponent from "../../../../component/BaseComponent";
import * as FontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";
const Pixel = new PixelUtil();
import MyButton from "../../../../component/MyButton";
import {request} from "../../../../utils/RequestUtil";
import * as AppUrls from "../../../../constant/appUrls";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import SText from '../../zheshangAccount/component/SaasText'
import SmsFillScene from '../../zheshangAccount/depositAndWithdraw/SmsFillScene'
import ResultIndicativeScene from '../../zheshangAccount/ResultIndicativeScene'
import ZSBaseComponent from '../../zheshangAccount/component/ZSBaseComponent';
import NavigationView from "../../../../component/AllNavigationView";

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');

let Platform = require('Platform');

export default class WithdrawScene extends ZSBaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            renderPlaceholderOnly: true,
        }
    }

    initFinish() {
        this.setState({
            renderPlaceholderOnly: false,
        })
    }
    render() {
        if (this.state.renderPlaceholderOnly) {
            return (
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <StatusBar barStyle='dark-content'/>
                    <NavigationView backIconClick={this.backPage} title='提现'
                                    wrapStyle={{backgroundColor:'white'}} titleStyle={{color:FontAndColor.COLORA0}}/>
                </View>
            )
        }


        return (
            <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                <StatusBar barStyle='dark-content'/>
                <NavigationView backIconClick={this.backPage} title='提现'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:FontAndColor.COLORA0}}/>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        marginTop: Pixel.getPixel(79),
                        height:Pixel.getPixel(77),
                        paddingLeft: Pixel.getPixel(15),
                        paddingRight: Pixel.getPixel(15),
                        justifyContent:'space-between'
                    }}>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../../../../../images/mine/guangfa_account/工商银行 copy.png')} style={{width:Pixel.getPixel(35),height:Pixel.getPixel(35)}}/>
                            <View style={{marginLeft: Pixel.getPixel(13)}}>
                                <Text
                                    style={{fontSize: Pixel.getFontPixel(15),color:FontAndColor.COLORA0}}>中国工商银行</Text>
                                <Text
                                    style={{color: '#666666',fontSize: Pixel.getFontPixel(14),marginTop:4}}>6212 ***** 3456</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:FontAndColor.COLORA1}}>更换银行</Text>
                            <Image style={{marginLeft:Pixel.getPixel(9)}} source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                        </View>

                    </View>

                    <View style={{backgroundColor: 'white', marginTop: Pixel.getPixel(10)}}>
                        <View >
                            <View style={{
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                borderBottomColor: FontAndColor.COLORA4
                            }}>
                                <SText style={{marginVertical: 15, fontSize: 15}}>提现金额（元）</SText>
                                <View style={{flexDirection: 'row',}}>
                                    <SText style={{marginRight: 5, marginTop: 5, fontSize: 14}}>￥</SText>
                                    <TextInput
                                        style={{
                                            height: 40,
                                            fontSize: Pixel.getPixel(35),
                                            flex: 1,
                                            marginBottom: 15,
                                            padding: 0
                                        }}
                                        keyboardType={'numeric'}
                                        underlineColorAndroid={"#00000000"}
                                    />
                                </View>
                            </View>
                        </View>

                    </View>

                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'确认提现'}
                        parentStyle={styles.next_button_parent}
                        childStyle={{fontSize: 18, color: 'white'}}
                    />

                    <View style={{marginHorizontal: 30, marginVertical: 40}}>
                        <SText style={{
                            color: FontAndColor.COLORA1,
                            lineHeight: 20
                        }}>银行受理及到账时间</SText>

                    </View>

                </ScrollView>
            </View>

        )
    }

}
const styles = StyleSheet.create({
    deposit_container_selected: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: FontAndColor.COLORB0,
        borderBottomWidth: 1,
        height: 50
    },
    deposit_container_deselected: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: FontAndColor.COLORA4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 50
    },

    deposit_title_selected: {
        color: FontAndColor.COLORB0,
        fontSize: 16,
    },
    deposit_title_deselected: {
        color: 'black',
        fontSize: 16,
    },
    next_button_parent: {
        backgroundColor: FontAndColor.COLORB0,
        marginTop: 50,
        height: 50,
        width: width - 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        borderRadius: 3,
    }
})