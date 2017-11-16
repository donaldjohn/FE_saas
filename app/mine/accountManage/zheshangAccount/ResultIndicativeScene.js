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
    TouchableWithoutFeedback
} from "react-native";
import BaseComponent from "../../../component/BaseComponent";
import NavigationBar from "../../../component/NavigationBar";
import * as FontAndColor from "../../../constant/fontAndColor";
import PixelUtil from "../../../utils/PixelUtil";
import MyButton from "../../../component/MyButton";
import {request} from "../../../utils/RequestUtil";
import * as AppUrls from "../../../constant/appUrls";
import md5 from "react-native-md5";
import StorageUtil from "../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../constant/storageKeyNames";

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');


//type
//    0：个人开户
//    1：企业开户
//    2：充值
//    3：提现
//    4: 更换银行卡

// status;
//    0：处理中
//    1：成功
//    2：失败
//    3：提交资料 （开通企业账户ONLY）


export default class ResultIndicativeScene extends BaseComponent {

    constructor(props) {
        super(props)

        this.state = {
            renderPlaceholderOnly: true,
            type: this.props.type,
            status: this.props.status,
        }


    }

    initFinish() {
        this.setState({
            renderPlaceholderOnly: false,
            type: this.props.type,
            status: this.props.status,
        })
    }

    render() {

        let navi_title = '';
        if (this.state.type === 0) {
            navi_title = '个人开户';
        } else if (this.state.type === 1) {
            navi_title = '企业开户'
        } else if (this.state.type === 2) {
            navi_title = '充值'
        } else if (this.state.type === 3) {
            navi_title = '提现'
        }

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
                        centerText={navi_title}
                        rightText={""}

                    />
                </View>
            </TouchableWithoutFeedback>);
        }


        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={navi_title}
                    rightText={""}
                    leftImageCallBack={() => {
                        this.backPage();
                    }}
                />

                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Image style={{
                        width: this.state.status === 0 ? 80 : 180,
                        height: this.state.status === 0 ? 80 : 120,
                        marginBottom: 35
                    }} source={this.image()}/>
                    <Text allowFontScaling={false} style={{fontSize: 20, marginBottom: 10}}>{this.tips()}</Text>
                    {this.renderAnnotation()}
                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={this.buttonTitle()}
                        parentStyle={{
                            backgroundColor: FontAndColor.COLORB0,
                            borderRadius: 3,
                            marginTop: 25,
                            height: 35,
                            width: 100,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        childStyle={{color: 'white', fontSize: 16}}
                        mOnPress={this.buttonAction}
                    />
                </View>
                {this.renderFooter()}
            </View>

        )
    }

    buttonTitle = () => {
        switch (this.state.status) {
            case 0: {
                return '刷新试试'
            }
            case 1:
            case 3: {
                return '完成'
            }
            case 2: {
                return '再试一次'
            }
        }
    }

    buttonAction = () => {

        switch (this.state.type) {
            case 0:
            case 1: {
                switch (this.state.status) {
                    case 0: {
                        this.refreshOpenAccount()
                    } break
                    case 1: {
                        this.backN(3)
                    }break
                    case 2: {
                        this.backN(3)
                    }break
                    case 3: {
                       this.backN(3)
                    }break
                }
            }
                break;
            case 2: {
                switch (this.state.status) {
                    case 0: {
                       this.refreshDepositeAndWithdraw()
                    }break
                    case 1: {
                        this.backN(2)
                    }break
                    case 2: {
                        this.backPage()
                    }

                }
            }
                break;
            case 3: {
                switch (this.state.status) {
                    case 0: {
                        this.refreshDepositeAndWithdraw()
                    }break
                    case 1: {
                        this.backN(2)
                    }break
                    case 2: {
                        this.backPage()
                    }

                }
            }
                break;
            case 4: {
                switch (this.state.status) {
                    case 0: {
                        return '处理中'
                    }break
                    case 1: {
                        return '恭喜您更换成功'
                    }break
                    case 2: {
                        return '您的银行卡更换失败'
                    }break

                }
            }
        }

    }

    refreshDepositeAndWithdraw = ()=>{

    }
    refreshOpenAccount = ()=>{

    }

    backN = (n) => {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.popN(n);
        }
    }


    tips = () => {
        switch (this.state.type) {
            case 0:
            case 1: {
                switch (this.state.status) {
                    case 0: {
                        return '开户处理中'
                    }
                    case 1: {
                        return '恭喜您开户成功'
                    }
                    case 2: {
                        return '您的开户未成功'
                    }
                    case 3: {
                        return '提交资料成功'
                    }
                }
            }
                break;
            case 2: {
                switch (this.state.status) {
                    case 0: {
                        return '充值处理中'
                    }
                    case 1: {
                        return '恭喜您充值成功'
                    }
                    case 2: {
                        return '充值失败'
                    }

                }
            }
                break;
            case 3: {
                switch (this.state.status) {
                    case 0: {
                        return '提现处理中'
                    }
                    case 1: {
                        return '提现成功'
                    }
                    case 2: {
                        return '充值失败'
                    }

                }
            }
                break;
            case 4: {
                switch (this.state.status) {
                    case 0: {
                        return '处理中'
                    }
                    case 1: {
                        return '恭喜您更换成功'
                    }
                    case 2: {
                        return '您的银行卡更换失败'
                    }

                }
            }
        }
    }

    renderAnnotation = () => {

        if (this.state.type === 0 || this.state.type === 1) {
            if (this.state.status === 0) {
                return null;
            } else {

                let bank_no = this.props.account.acct_no.substr(this.props.account.acct_no.length - 4, 4);
                let bank_name = this.props.append;
                return <View style={{alignItems: 'center'}}>
                    <Text allowFontScaling={false}
                          style={{color: FontAndColor.COLORA1, marginBottom: 5}}>您已成功开通浙商银行存管账户</Text>
                    <Text allowFontScaling={false} style={{color: FontAndColor.COLORA1}}> 并已经绑定{bank_name}（尾号{bank_no}）的银行卡</Text>
                </View>
            }
        } else if (this.state.type === 2 || this.state.type === 3) {
            if (this.state.status === 1) {
                return <Text allowFontScaling={false} style={{fontSize: 18}}>￥{this.props.account.amount}</Text>
            } else {
                return <View style={{alignItems: 'center', marginHorizontal: 50}}>
                    <Text allowFontScaling={false} style={{
                        color: FontAndColor.COLORA1,
                        marginBottom: 5,
                        textAlign: 'center'
                    }}>{this.props.param.mjson.msg ? this.props.param.mjson.msg : '处理失败'}</Text>
                </View>
            }
        } else if (this.state.type === 4) {
            return <View style={{alignItems: 'center'}}>
                <Text allowFontScaling={false} style={{color: FontAndColor.COLORA1, marginBottom: 5}}>新银行卡为</Text>
                <Text allowFontScaling={false} style={{color: FontAndColor.COLORA1}}> 6282 9262 9292 229 220</Text>
            </View>
        }
    }

    image = () => {

        if (this.state.type === 0 || this.state.type === 1 || this.state.type === 4) { // 个人开户、企业开户、更换银行卡
            switch (this.state.status) {
                case 0: {
                    return require('../../../../images/account/processing.png')
                }
                case 1: {
                    return require('../../../../images/account/open_account_success.png')
                }
                case 2: {
                    return require('../../../../images/account/open_account_failure.png')
                }
                case 3: {
                    return require('../../../../images/account/commit_success.png')
                }
            }
        } else if (this.state.type === 2 || this.state.type === 3) { // 提现、充值
            switch (this.state.status) {
                case 0: {
                    return require('../../../../images/account/processing.png')
                }
                case 1: {
                    return require('../../../../images/account/withdraw_success.png')
                }
                case 2: {
                    return require('../../../../images/account/withdraw_failure.png')
                }
            }
        }
    }

    renderFooter = () => {
        switch (this.state.type) {
            case 0: {  // 个人开户
                return <View style={{alignItems: 'center', marginBottom: 35, marginTop: 150}}>
                    <Text allowFontScaling={false} style={{color: FontAndColor.COLORA1}}>温馨提示：此账户暂时仅支持SP业务</Text>
                </View>

            }
                break;
            case 1:
            case 4: {   // 企业开户、更换银行卡
                return <View style={{marginTop: 200}}/>
            }
                break;
            case 2 :
            case 3: {  //提现、充值

                return <View style={{marginHorizontal: 30, height: 180}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                        <View style={{height: 1, backgroundColor: FontAndColor.COLORA4, flex: 1, marginRight: 15}}/>
                        <Text allowFontScaling={false} style={{color: FontAndColor.COLORA1}}>温馨提示</Text>
                        <View style={{height: 1, backgroundColor: FontAndColor.COLORA4, flex: 1, marginLeft: 15}}/>
                    </View>
                    <Text allowFontScaling={false}
                          style={{color: FontAndColor.COLORA1, marginBottom: 5, lineHeight: 20}}>1
                        浙商银行及其它银行1000万以内的提现，实时到账，五分钟。</Text>

                    <Text allowFontScaling={false} style={{color: FontAndColor.COLORA1, lineHeight: 20}}>2
                        企业用户及其它个人用户提现大于1000万以上的，工作日走大小额，资金0.5-2小时即可到达。</Text>

                </View>
            }
                break;

        }
    }
}
