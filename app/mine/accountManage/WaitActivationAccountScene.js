/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager,
    KeyboardAvoidingView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import LoginInputText from "../../login/component/LoginInputText";
const childItems = [];
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
export  default class WaitActivationAccountScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
        };
    }

    initFinish = () => {
        this.setState({
            renderPlaceholderOnly: 'success',
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <View style={{width:width,height:Pixel.getPixel(146),backgroundColor: '#fff',paddingLeft:Pixel.getPixel(15),
                paddingRight:Pixel.getPixel(15),marginTop:Pixel.getTitlePixel(79)}}>
                    <View style={{width:width-Pixel.getPixel(30),height:Pixel.getPixel(44),justifyContent:'center',
                    }}>
                        <Text style={{color: '#000',fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28)}}>
                            账户号码：43753098044859890
                        </Text>
                    </View>
                    <View style={{width:width-Pixel.getPixel(30),height:Pixel.getPixel(1),justifyContent:'center',
                    alignItems: 'center',backgroundColor: fontAndColor.COLORA3}}></View>
                    <View style={{width:width-Pixel.getPixel(30),height:Pixel.getPixel(102),justifyContent:'center',
                    }}>
                        <Text style={{color: '#000',fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),marginTop:Pixel.getPixel(7)}}>
                            您的企业账户已经绑定，请进行激活，激活方式如下：
                        </Text>
                        <Text style={{color: '#000',fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),marginTop:Pixel.getPixel(7)}}>
                            1.用您的企业绑定账户向先进账户转账0.1元
                        </Text>
                        <Text style={{color: '#000',fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),marginTop:Pixel.getPixel(7)}}>
                            2.恒丰银行对转账金额进行确认，确认无误账户激活
                        </Text>
                    </View>
                </View>
                <NavigationView
                    title="账户管理"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="账户管理"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },
    buttonStyle: {
        marginTop: Pixel.getPixel(10),
        marginBottom: Pixel.getPixel(10),
        marginLeft: Pixel.getPixel(10),
    },
    itemStyel: {},
    inputTextsStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        marginTop: Pixel.getTitlePixel(79)
    },
    inputTextStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
    },
    inputTextLine: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(10),
        width: width,
    },
    imageButtonsStyle: {
        width: width,
        height: Pixel.getPixel(88),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),

    },
    imageButtonStyle: {
        width: Pixel.getPixel(80),
        height: Pixel.getPixel(60),
        resizeMode: 'contain'
    },
    imageClearButtonStyle: {
        width: Pixel.getPixel(17),
        height: Pixel.getPixel(17),
    },
    imagebuttonok: {
        width: width,
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(130),
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
        paddingTop: Pixel.getPixel(25)
    }
});