import React, {Component} from "react";
import {
    AppRegistry,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableWithoutFeedback,
    InteractionManager,
    KeyboardAvoidingView
} from "react-native";
import BaseComponent from "../component/BaseComponent";
import MyButton from "../component/MyButton";
import * as FontAndColor from "../constant/fontAndColor";
import LoginInputText from "./component/LoginInputText";
import NavigationBar from "../component/NavigationBar";
import PixelUtil from "../utils/PixelUtil";
import ImagePicker from "react-native-image-picker";
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";
import md5 from "react-native-md5";
import LoginAndRegister from "./LoginAndRegister";

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Pixel = new PixelUtil();

var imgSrc: '';
var imgSid: '';
var smsCode: '';
var uid: '';
var idcardf: '';
var idcardback: '';
var businessid: '';
export default class Register extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            idcard: null,
            idcardBack: null,
            businessLicense: null,
            verifyCode: null,
            renderPlaceholderOnly: true,
        }
    }

    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
            this.Verifycode();
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return ( <TouchableWithoutFeedback style={{backgroundColor: FontAndColor.COLORA3}} onPress={() => {
                this.setState({
                    show: false,
                });
            }}>
                <NavigationBar
                    leftImageShow={false}
                    leftTextShow={true}
                    leftText={""}
                    rightText={""}
                />
            </TouchableWithoutFeedback>);
        }
        return (
            <View style={styles.container}>
                <NavigationBar
                    leftImageCallBack={this.backPage}
                    rightTextCallBack={this.register}
                />

                <ScrollView>
                    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={1}>
                        <View style={styles.inputTextLine}/>
                        <View style={styles.inputTextsStyle}>
                            <LoginInputText
                                ref="userName"
                                textPlaceholder={'请输入手机号'}
                                viewStytle={styles.itemStyel}
                                inputTextStyle={styles.inputTextStyle}
                                leftIcon={false}
                                maxLength={11}
                                rightIcon={false}/>
                            <LoginInputText
                                ref="verifycode"
                                textPlaceholder={'请输入验证码'}
                                viewStytle={styles.itemStyel}
                                inputTextStyle={styles.inputTextStyle}
                                leftIcon={false}
                                rightIconClick={this.Verifycode}
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
                        <View style={styles.inputTextLine}/>
                        <View style={styles.inputTextsStyle}>
                            <LoginInputText
                                ref="password"
                                textPlaceholder={'请输入密码'}
                                viewStytle={styles.itemStyel}
                                inputTextStyle={styles.inputTextStyle}
                                secureTextEntry={true}
                                leftIcon={false}
                                maxLength={16}
                                rightIcon={false}/>
                            <LoginInputText
                                ref="passwoedAgain"
                                textPlaceholder={'请再次输入密码'}
                                viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                                inputTextStyle={styles.inputTextStyle}
                                secureTextEntry={true}
                                maxLength={16}
                                leftIcon={false}
                                rightIcon={false}/>
                        </View>
                        <View style={styles.inputTextLine}/>
                        <View style={styles.inputTextsStyle}>
                            <LoginInputText
                                ref="name"
                                textPlaceholder={'请输入姓名'}
                                viewStytle={styles.itemStyel}
                                inputTextStyle={styles.inputTextStyle}
                                leftIcon={false}
                                rightIcon={false}/>
                            <LoginInputText
                                ref="businessName"
                                textPlaceholder={'请输入商家名称'}
                                viewStytle={[styles.itemStyel, {borderBottomWidth: 0}]}
                                inputTextStyle={styles.inputTextStyle}
                                leftIcon={false}
                                rightIcon={false}/>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.imageButtonsStyle}>
                        <Text
                            style={{
                                flex: 1,
                                color: FontAndColor.COLORA1,
                                fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                            }}>添加身份证照片</Text>
                        <MyButton buttonType={MyButton.IMAGEBUTTON}
                                  content={this.state.idcard === null ?
                                      require('../../images/login/idcard.png') : this.state.idcard
                                  }
                                  parentStyle={[styles.buttonStyle, {marginRight: Pixel.getPixel(10)}]}
                                  childStyle={styles.imageButtonStyle}
                                  mOnPress={this.selectPhotoTapped.bind(this, 'idcard')}/>

                        <MyButton buttonType={MyButton.IMAGEBUTTON}
                                  content={this.state.idcardBack === null ?
                                      require('../../images/login/idcard_back.png') : this.state.idcardBack
                                  }
                                  parentStyle={styles.buttonStyle}
                                  childStyle={styles.imageButtonStyle}
                                  mOnPress={this.selectPhotoTapped.bind(this, 'idcardBack')}/>
                    </View>
                    <View style={styles.inputTextLine}/>
                    <View style={styles.imageButtonsStyle}>
                        <Text style={{
                            flex: 1,
                            color: FontAndColor.COLORA1,
                            fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                        }}>添加营业执照</Text>
                        <MyButton buttonType={MyButton.IMAGEBUTTON}
                                  content={this.state.businessLicense === null ?
                                      require('../../images/login/idcard.png') : this.state.businessLicense
                                  }
                                  parentStyle={styles.buttonStyle}
                                  childStyle={styles.imageButtonStyle}
                                  mOnPress={this.selectPhotoTapped.bind(this, 'businessLicense')}/>
                    </View>
                </ScrollView>
            </View>
        );
    }

    register = () => {
        let userName = this.refs.userName.getInputTextValue();
        let smsCode = this.refs.smsCode.getInputTextValue();
        let password = this.refs.password.getInputTextValue();
        let passwoedAgain = this.refs.passwoedAgain.getInputTextValue();
        let name = this.refs.name.getInputTextValue();
        let businessName = this.refs.businessName.getInputTextValue();
        if (typeof(userName) == "undefined" || userName == "") {
            this.props.showToast("手机号码不能为空");
        } else if (userName.length != 11) {
            this.props.showToast("请输入正确的手机号");
        } else if (typeof(smsCode) == "undefined" || smsCode == "") {
            this.props.showToast("验证码不能为空");
        } else if (typeof(password) == "undefined" || password == "") {
            this.props.showToast("密码不能为空");
        } else if (typeof(password) == "undefined" || password == "") {
            this.props.showToast("密码不能为空");
        } else if (passwoedAgain.length < 8) {
            this.props.showToast("密码必须为8~16位");
        } else if (typeof(name) == "undefined" || name == "") {
            this.props.showToast("用户名不能为空");
        } else if (typeof(businessName) == "undefined" || businessName == "") {
            this.props.showToast("商家名称不能为空");
        } else if (password !== passwoedAgain) {
            this.props.showToast("两次密码输入不一致");
        } else if (typeof(idcardf) == "undefined" || idcardf == "") {
            this.props.showToast("身份证正面不能为空");
        } else if (typeof(idcardback) == "undefined" || idcardback == "") {
            this.props.showToast("身份证反面不能为空");
        } else if (typeof(businessid) == "undefined" || businessid == "") {
            this.props.showToast("营业执照不能为空");
        } else {
            let maps = {
                user_name: name,
                phone: userName,
                pwd: md5.hex_md5(password),
                confirm_pwd: md5.hex_md5(passwoedAgain),
                merchant_name: businessName,
                code: smsCode,
                device_code: "dycd_dms_manage_android",
                idcard_img: idcardf + "," + idcardback,
                license_img: businessid,
            };
            request(AppUrls.REGISTER, 'Post', maps)
                .then((response) => {
                    if (response.mjson.code == "1") {
                        uid = response.mjson.data.uid;
                        this.props.showToast("注册成功");
                        this.exitPage({name: 'LoginAndRegister', component: LoginAndRegister});
                    } else {
                        this.props.showToast(response.mjson.msg + "");
                    }
                }, (error) => {
                    if (error.mjson.code == -300 || error.mjson.code == -500) {
                        this.props.showToast("注册失败");
                    } else {
                        this.props.showToast(error.mjson.msg + "");
                    }
                });
        }
    }

    exitPage = (mProps) => {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.immediatelyResetRouteStack([{
                ...mProps
            }])
        }
    }

    //获取图形验证码
    Verifycode = () => {
        this.refs.verifycode.lodingStatus(true);
        let maps = {
            device_code: "dycd_dms_manage_android",
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
                if (error.mjson.code == -300 || error.mjson.code == -500) {
                    this.props.showToast("获取失败");
                } else {
                    this.props.showToast(error.mjson.msg + "");
                }
            });
    }

    //获取短信验证码
    sendSms = () => {
        let userName = this.refs.userName.getInputTextValue();
        let verifyCode = this.refs.verifycode.getInputTextValue();
        if (typeof(verifyCode) == "undefined" || verifyCode == "") {
            this.props.showToast("验证码不能为空");
        } else if (typeof(userName) == "undefined" || userName == "") {
            this.props.showToast("请输入手机号");
        } else {
            let maps = {
                device_code: "dycd_dms_manage_android",
                img_code: verifyCode,
                img_sid: imgSid,
                phone: userName,
                type: "1",
            };
            request(AppUrls.SEND_SMS, 'Post', maps)
                .then((response) => {
                    if (response.mjson.code == "1") {
                        this.refs.smsCode.StartCountDown();
                        this.props.showToast(response.mjson.data.code + "");
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    this.Verifycode();
                    if (error.mjson.code == -300 || error.mjson.code == -500) {
                        this.props.showToast("短信验证码获取失败");
                    } else {
                        this.props.showToast(error.mjson.msg + "");
                    }
                });
        }
    }

    selectPhotoTapped(id) {
        const options = {
            //弹出框选项
            title: '请选择',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择相册',
            allowsEditing: true,
            noData: true,
            quality: 0.5,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            }
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
            } else {
                this.imageUploadUtil(response, id);
            }
        });
    }

    imageUploadUtil(response, id) {
        let params = {
            device_code: "dycd_dms_manage_android",
            file_name: response.fileName,
            base64_file: 'data:image/jpeg;base64,' + encodeURI(response.data).replace(/\+/g, '%2B')
        };
        let source = {uri: response.uri};
        request(AppUrls.AUTH_UPLOAD_FILE, 'Post', params)
            .then((response) => {
                if (response.mjson.code == 1) {
                    if (id === 'idcard') {
                        idcardf = response.mjson.data.file_id;
                        if (idcardf != "") {
                            this.setState({
                                idcard: source
                            });
                            this.props.showToast("图片上传成功");
                        } else {
                            this.props.showToast("id 为空 图片上传失败");
                        }
                    } else if (id === 'idcardBack') {
                        idcardback = response.mjson.data.file_id;
                        if (idcardback != "") {
                            this.setState({
                                idcardBack: source
                            });
                            this.props.showToast("图片上传成功");
                        } else {
                            this.props.showToast("id 为空 图片上传失败");
                        }
                    } else if (id === 'businessLicense') {
                        businessid = response.mjson.data.file_id;
                        if (businessid != "") {
                            this.setState({
                                businessLicense: source
                            });
                            this.props.showToast("图片上传成功");
                        } else {
                            this.props.showToast("id 为空 图片上传失败");
                        }
                    }
                } else {
                    this.props.showToast(response.mjson.msg + "!");
                }
            }, (error) => {
                if (error.mjson.code == -300 || error.mjson.code == -500) {
                    this.props.showToast("图片上传失败");
                } else {
                    this.props.showToast(error.mjson.msg + "!");
                }
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: FontAndColor.COLORA3
    },
    buttonStyle: {},
    itemStyel: {},
    inputTextsStyle: {
        backgroundColor: '#ffffff',
        paddingLeft: Pixel.getPixel(15),
        paddingRight: Pixel.getPixel(15),
    },
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
    }
});