import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    InteractionManager,
    ScrollView,
    Image
} from "react-native";
import BaseComponent from "../component/BaseComponent";
import NavigationBar from "../component/NavigationBar";
import * as FontAndColor from "../constant/fontAndColor";
import PixelUtil from "../utils/PixelUtil";
import LoginInputText from './component/LoginInputText';
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
import MyButton from "../component/MyButton";
import RecognizedGains from './RecognizedGains';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();
var Platform = require('Platform');

var imgSrc: '';
var imgSid: '';

var itemWidth = width;

export default class QuotaApplication extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true,
            agree: false,
            name: "",
            idcard: "",
            phone: "",
            agreement: "",
        };
    }

    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
            this.Verifycode();
            this.getWZInfo();
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return ( <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    show: false,
                });
            }}>
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={"微众额度申请"}
                        rightText={""}
                    />
                </View>
            </TouchableWithoutFeedback>);
        }
        return (
            <View style={styles.containerStyle}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={"微众额度申请"}
                    rightText={"  "}
                    leftImageCallBack={this.backPage}
                />
                <ScrollView>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.inputTextsStyle}>
                        <View style={{
                            height: Pixel.getPixel(45),
                            borderBottomWidth: Pixel.getPixel(0.6),
                            borderColor: FontAndColor.COLORA4,
                            justifyContent: "center",
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{color: FontAndColor.COLORA0, fontSize: Pixel.getPixel(14), flex: 1}}>借款人</Text>
                            <Text>{this.state.name}</Text>
                        </View>
                        <View style={{
                            height: Pixel.getPixel(45),
                            borderBottomWidth: Pixel.getPixel(0.6),
                            borderColor: FontAndColor.COLORA4,
                            justifyContent: "center",
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{color: FontAndColor.COLORA0, fontSize: Pixel.getPixel(14), flex: 1}}>身份证号</Text>
                            <Text>{this.state.idcard}</Text>
                        </View>
                        <View style={{
                            height: Pixel.getPixel(45),
                            justifyContent: "center",
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{color: FontAndColor.COLORA0, fontSize: Pixel.getPixel(14), flex: 1}}>联系电话</Text>
                            <Text>{this.state.phone}</Text>
                        </View>
                    </View>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="bank_id"
                            textPlaceholder={'请输入银行卡号'}
                            leftText={'银行卡号'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={[styles.inputTextStyle, {textAlign: 'right'}]}
                            leftIcon={false}
                            rightIcon={false}/>
                        <LoginInputText
                            ref="bank_phone"
                            textPlaceholder={'请输入银行预留手机号'}
                            leftText={'银行预留手机号'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={[styles.inputTextStyle, {textAlign: 'right'}]}
                            leftIcon={false}
                            rightIcon={false}/>
                    </View>
                    <Text style={{
                        color: FontAndColor.COLORA0,
                        paddingLeft: Pixel.getPixel(15),
                        paddingRight: Pixel.getPixel(15),
                        fontSize: Pixel.getPixel(FontAndColor.CONTENTFONT24),
                        paddingTop: Pixel.getPixel(10),
                        paddingBottom: Pixel.getPixel(10),
                    }}>注意：<Text style={{color: FontAndColor.COLORA1}}>请确保银行预留手机号码准确,短信验证码将发送给您银行银行预留手机号码。</Text></Text>
                    <View style={styles.inputTextsStyle}>
                        <LoginInputText
                            ref="verifycode"
                            textPlaceholder={'请输入验证码'}
                            viewStytle={styles.itemStyel}
                            inputTextStyle={styles.inputTextStyle}
                            leftIcon={false}
                            keyboardType={'phone-pad'}
                            rightIconClick={this.Verifycode}
                            rightIconStyle={{width: Pixel.getPixel(100)}}
                            rightIconSource={this.state.verifyCode ? this.state.verifyCode : null}/>
                        <LoginInputText
                            ref="smsCode"
                            textPlaceholder={'请输入短信验证码'}
                            viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                            inputTextStyle={styles.inputTextStyle}
                            rightButton={true}
                            rightIcon={false}
                            callBackSms={this.sendSms}
                            keyboardType={'phone-pad'}
                            leftIcon={false}/>
                    </View>

                    <TouchableWithoutFeedback onPress={() => {
                        if (this.state.agree) {
                            this.setState({
                                agree: false,
                            });
                        } else {
                            this.setState({
                                agree: true,
                            });
                        }
                    }}>
                        <View style={{
                            width: width,
                            paddingTop: Pixel.getPixel(15),
                            paddingBottom: Pixel.getPixel(15),
                            paddingLeft: Pixel.getPixel(15),
                            paddingRight: Pixel.getPixel(15),
                        }}>
                            <Text style={{
                                fontSize: Pixel.getFontPixel(12),
                                color: FontAndColor.COLORA2,
                            }}>
                                <Image style={{
                                    width: Pixel.getPixel(1),
                                    height: Pixel.getPixel(75),
                                }}
                                       source={require('./../../images/publish/car-plate.png')}/>
                                我已详细阅读并同意《信息使用授权书》 《微众银行个人电子账户服务协议》 《征信授权书》
                            </Text>
                            {this.state.agree == true ?
                                <Image style={{
                                    position: 'absolute',
                                    width: Pixel.getPixel(17),
                                    height: Pixel.getPixel(17),
                                    marginTop: Pixel.getPixel(14),
                                    marginLeft: Pixel.getPixel(20)
                                }}
                                       source={require('./../../images/login/amou_choose.png')}/> :
                                <Image style={{
                                    position: 'absolute',
                                    width: Pixel.getPixel(17),
                                    height: Pixel.getPixel(17),
                                    marginTop: Pixel.getPixel(14),
                                    marginLeft: Pixel.getPixel(20)
                                }}
                                       source={require('./../../images/login/amou_unchoose.png')}/>}

                        </View>
                    </TouchableWithoutFeedback>

                    <MyButton buttonType={MyButton.TEXTBUTTON}
                              content={'确认申请'}
                              parentStyle={styles.loginBtnStyle}
                              childStyle={styles.loginButtonTextStyle}
                              mOnPress={this.getWZMoney}/>
                </ScrollView>
            </View>
        );
    }


    //获取图形验证码
    Verifycode = () => {
        this.refs.verifycode.lodingStatus(true);
        let device_code = '';
        if (Platform.OS === 'android') {
            device_code = 'dycd_platform_android';
        } else {
            device_code = 'dycd_platform_ios';
        }
        let maps = {
            device_code: device_code,
        };
        request(AppUrls.IDENTIFYING, 'Post', maps)
            .then((response) => {
                this.refs.verifycode.lodingStatus(false);
                imgSrc = response.mjson.data.img_src;
                imgSid = response.mjson.data.img_sid;

                this.setState({
                    verifyCode: {uri: imgSrc},
                });
            }, (error) => {
                this.refs.verifycode.lodingStatus(false);
                this.setState({
                    verifyCode: null,
                });
                if (error.mycode == -300 || error.mycode == -500) {
                    this.props.showToast("获取失败");
                } else {
                    this.props.showToast(error.mjson.msg + "");
                }
            });
    }

    //获取短信验证码
    sendSms = () => {
        let userName = this.refs.bank_phone.getInputTextValue();
        let verifyCode = this.refs.verifycode.getInputTextValue();
        if (typeof(verifyCode) == "undefined" || verifyCode == "") {
            this.props.showToast("验证码不能为空");
        } else if (typeof(userName) == "undefined" || userName == "") {
            this.props.showToast("请输入手机号");
        } else {
            let maps = {
                api: AppUrls.GET_SMS_VERIFY_CODE,
                img_code: verifyCode,
                img_sid: imgSid,
                phone: userName,
                sms_type: "microchinese_mny_apply"
            };
            this.props.showModal(true);
            request(AppUrls.FINANCE, 'Post', maps)
                .then((response) => {
                    this.props.showModal(false);
                    if (response.mjson.code == "1") {
                        this.refs.smsCode.StartCountDown();
                        // this.refs.smsCode.setInputTextValue(response.mjson.data.code + "");
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    this.props.showModal(false);
                    this.Verifycode();
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast("短信验证码获取失败");
                    } else if (error.mycode == 7040012) {
                        this.Verifycode();
                        this.props.showToast(error.mjson.msg + "");
                    } else {
                        this.props.showToast(error.mjson.msg + "");
                    }
                });
        }
    }


    //获取微众申请页面数据
    getWZInfo = () => {
        let maps = {
            api: AppUrls.GETAPPLYDATA,
        };
        this.props.showModal(true);
        request(AppUrls.FINANCE, 'Post', maps)
            .then((response) => {
                this.props.showModal(false);
                this.setState({
                    name: response.mjson.data.username,
                    idcard: response.mjson.data.idcard_number,
                    phone: response.mjson.data.phone,
                    agreement: response.mjson.data.agreement,
                });
            }, (error) => {
                this.props.showModal(false);
                if (error.mycode == -300 || error.mycode == -500) {
                    this.props.showToast("获取失败");
                } else {
                    this.props.showToast(error.mjson.msg + "");
                }
            });
    }

    //微众额度申请
    getWZMoney = () => {
        let bank_phone = this.refs.bank_phone.getInputTextValue();
        let bank_id = this.refs.bank_id.getInputTextValue();
        let smsCode = this.refs.smsCode.getInputTextValue();
        if (typeof(bank_phone) == "undefined" || bank_phone == "" || bank_phone.length != 11) {
            this.props.showToast("请输入正确的手机号码");
        } else if (typeof(bank_id) == "undefined" || bank_id == "") {
            this.props.showToast("银行卡号不能为空");
        } else if (typeof(smsCode) == "undefined" || smsCode == "") {
            this.props.showToast("短信验证码不能为空");
        } else if (!this.state.agree) {
            this.props.showToast("请选择相关协议");
        } else {
            let maps = {
                api: AppUrls.APPLY_MNY,
                bank_reserve_phone: bank_phone,
                bank_card: bank_id,
                phone_code: smsCode,
                contract_base: this.state.agreement,
            };
            this.props.showModal(true);
            request(AppUrls.FINANCE, 'Post', maps)
                .then((response) => {
                    this.props.showModal(false);
                    this.toNextPage({
                        name: 'RecognizedGains',
                        component: RecognizedGains,
                        params: {loan_code: '1234566'},
                    })
                }, (error) => {
                    this.props.showModal(false);
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast("获取失败");
                    } else {
                        this.props.showToast(error.mjson.msg + "");
                        this.toNextPage({
                            name: 'RecognizedGains',
                            component: RecognizedGains,
                            params: {loan_code: '1234566'},
                        })
                    }
                });
        }
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: FontAndColor.COLORA3
    },
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: FontAndColor.COLORA4,
    },
    itemStyel: {},
    inputTextStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: 0,
        paddingRight: 0,
        margin: 0,
    },
    inputTextLine: {
        backgroundColor: FontAndColor.COLORA3,
        height: Pixel.getPixel(10),
        width: width,
    },
    inputTextsStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: itemWidth - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        alignSelf: 'center'
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
});