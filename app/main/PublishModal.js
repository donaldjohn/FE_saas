/**
 * Created by yujinzhong on 2017/2/8.
 */


import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Modal,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

import * as fontAndColor from '../constant/fontAndColor';
import  PixelUtil from '../utils/PixelUtil';
import BaseComponent from '../component/BaseComponent';
import NewCarScene from '../publish/NewCarScene';

const  publishReceive = require('../../images/mainImage/publishReceive.png');
const publishNew = require('../../images/mainImage/publishNew.png');
const publishClose = require('../../images/mainImage/publishClose.png');
const Pixel = new PixelUtil();
const { width,height } = Dimensions.get('window');

export default class PublishModal extends BaseComponent {

    initFinish=()=>{};

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    _receivePress = ()=>{
        this._closePress();
    };

    _closePress = ()=>{
        this.setState({
            modalVisible: false
        });
    };

    newCarParams = {
        name: 'NewCarScene',
        component: NewCarScene,
        params: {}
    };

    openModal = ()=>{
        this.setState({
            modalVisible: true
        });
    };

    _newPress = ()=>{
        this._closePress();
        this.props.callBack(this.newCarParams);
    };

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {}}>
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={()=>{this._newPress()}}
                            >
                                <View style={styles.rowCenter}>
                                    <Image style={styles.img} source={publishNew}/>
                                    <Text style={styles.fontMain}>发布新车源</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.fillSpace}/>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={()=>{this._receivePress()}}>
                                <View style={styles.rowCenter}>
                                    <Image style={styles.img} source={publishReceive}/>
                                    <Text style={styles.fontMain}>发布收车意向</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.splitLine}/>
                        <View style={styles.cancelView}>
                            <TouchableOpacity activeOpacity={0.6}
                                              onPress={()=>{this._closePress()}}>
                                <Image style={styles.cancelBtn} source={publishClose}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:width,
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.9)',
        justifyContent:'flex-end'
    },
    contentContainer:{
        width:width,
        alignItems:'center'
    },
    btnContainer:{
        flexDirection:'row',
        width:Pixel.getPixel(242)
    },
    img:{
        width:Pixel.getPixel(67),
        height:Pixel.getPixel(67),
        borderRadius:Pixel.getPixel(67/2)
    },
    fontMain:{
        fontSize:Pixel.getFontPixel(14),
        color:'#000000',
        marginTop:Pixel.getPixel(10)
    },
    rowCenter:{
        alignItems:'center'
    },
    fillSpace:{
        flex:1
    },
    splitLine:{
        borderWidth:0.5,
        borderColor:fontAndColor.COLORA4,
        marginTop:Pixel.getPixel(130)
    },
    cancelView:{
        width:width,
        height:Pixel.getPixel(49),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF'
    },
    cancelBtn:{
        width:Pixel.getPixel(22),
        height:Pixel.getPixel(22)
    }
});