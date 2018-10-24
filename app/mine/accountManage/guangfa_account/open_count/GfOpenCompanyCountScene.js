/*
* created by marongting on 2018/10/18
*
* */

import React, {Component} from 'react';

import {

    StyleSheet,
    View,
    Dimensions,
    StatusBar,
    Text,
    Image,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import *as fontAndColor from '../../../../constant/fontAndColor';
import PixelUtil from '../../../../utils/PixelUtil';
import BaseComponent from "../../../../component/BaseComponent";
import NavigationView from "../../../../component/AllNavigationView";
import LoginInputText from "../../../../login/component/LoginInputText";
import SubmitComponent from "../component/SubmitComponent";
const Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');

export default class GfOpenCompanyCountScene extends BaseComponent{

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank',
            topSize:-179
        }
    }

    initFinish(){
        this.setState({
            renderPlaceholderOnly:'success'
        })
    }

    renderPlaceholderView = () => {
        return(
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title='开通企业账户'
                    backIconClick={this.backPage}
                />
            </View>
            )

    }

    render() {
        if(this.state.renderPlaceholderOnly !== 'success'){
            return this.renderPlaceholderView();
        }
        return (
            <View style={{flex: 1,backgroundColor:fontAndColor.COLORA3}}>
                <NavigationView backIconClick={this.backPage} title='开通企业账户'
                                wrapStyle={{backgroundColor:'white'}} titleStyle={{color:fontAndColor.COLORA0}}/>
                <StatusBar barStyle="default"/>
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={this.state.topSize}>
                <ScrollView style={{marginTop:Pixel.getPixel(64)}}>
                <View style={{marginTop:Pixel.getPixel(15),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        textPlaceholder={'请输入企业名称'}
                        leftText = '企业名称'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(84),paddingLeft:0}}
                        foucsChange = {()=>{
                            if(this.state.topSize == 5){
                                this.setState({
                                    topSize:-179
                                })
                            }
                        }}/>
                    <LoginInputText
                        textPlaceholder={'请输入企业固定电话'}
                        leftText = '企业固定电话'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(56),paddingLeft:0}}/>
                    <LoginInputText
                        textPlaceholder={'请输入社会信用代码'}
                        leftText = '统一社会信用代码'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(28),paddingLeft:0}}/>
                </View>
                <View style={{marginTop:Pixel.getPixel(10),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        textPlaceholder={'请输入法人姓名'}
                        leftText = '法人代表姓名'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(56),paddingLeft:0}}/>
                    <LoginInputText
                        textPlaceholder={'请输入法人身份证号'}
                        leftText = '法人代表身份证号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(28),paddingLeft:0}}/>
                </View>
                <View style={{marginTop:Pixel.getPixel(10),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        textPlaceholder={'请输入联系人姓名'}
                        leftText = '企业联系人姓名'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(42),paddingLeft:0}}/>
                    <LoginInputText
                        textPlaceholder={'请输入联系人身份证号'}
                        leftText = '联系人身份证号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(43),paddingLeft:0}}/>
                    <LoginInputText
                        textPlaceholder={'请输入联系人手机号'}
                        leftText = '联系人手机号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(56),paddingLeft:0}}/>
                </View>
                <View style={{marginTop:Pixel.getPixel(10),backgroundColor:'#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15)}}>
                    <LoginInputText
                        textPlaceholder={'请输入银行账号'}
                        leftText = '银行账号'
                        leftIcon={false}
                        import={false}
                        clearValue={true}
                        rightIcon={false}
                        rightButton={false}
                        inputTextStyle = {{marginLeft:Pixel.getPixel(84),paddingLeft:0}}
                    />
                    <View style={{flexDirection: 'row',flex:1,alignItems:'center',width:Pixel.getPixel(345),height:Pixel.getPixel(45)}}>
                        <Text style={{color:fontAndColor.COLORA0,fontSize:Pixel.getFontPixel(14),justifyContent: 'flex-start'}}>银行</Text>
                        <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight: Pixel.getPixel(15),width:Pixel.getPixel(316)}}>
                            <Text allowFontScaling={false} style={{fontSize:Pixel.getFontPixel(14),color:'#AEAEAE',marginRight:Pixel.getPixel(20)}}>请选择银行</Text>
                            <Image source={require('../../../../../images/mine/guangfa_account/xiangqing.png')}/>
                        </View>
                    </View>
                </View>
                    <View style={{flexDirection:'row',width:width,height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(18),marginTop:Pixel.getPixel(19),alignItems:'flex-end' }}>
                        <Image source={require('../../../../../images/mine/guangfa_account/tishi.png')}/>
                        <Text allowFontScaling={false} style={{color:'#cccccc',fontSize:Pixel.getFontPixel(11),marginLeft:Pixel.getPixel(8),alignItems:'flex-end'}}>请确认信息的准确性，开户时间为7*24小时 </Text>
                    </View>
                    <SubmitComponent title="确认提交"/>
                </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
