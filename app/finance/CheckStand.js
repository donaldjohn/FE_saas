/**
 * Created by hanmeng on 2017/5/13.
 * 收银台
 */

import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    BackAndroid,
    TouchableOpacity,
    InteractionManager,
    Dimensions,
    TextInput
} from 'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../component/BaseComponent";
import NavigatorView from '../component/AllNavigationView';
import * as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';
import MyButton from "../component/MyButton";
import ExplainModal from "../mine/myOrder/component/ExplainModal";
import * as AppUrls from "../constant/appUrls";
import {request} from "../utils/RequestUtil";
import AccountScene from "../mine/accountManage/RechargeScene";
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import * as webBackUrl from "../constant/webBackUrl";
import AccountWebScene from "../mine/accountManage/AccountWebScene";
import DDApplyLendScene from "./lend/DDApplyLendScene";
const Pixel = new PixelUtil();

export default class CheckStand extends BaseComponent {

    constructor(props) {
        super(props);
        this.accountInfo = '';
        this.transSerialNo = '';
        this.isDoneCredit = 0;
        this.creditBalanceMny = 0;
        this.state = {
            renderPlaceholderOnly: 'blank',
            isRefreshing: false
        }
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        });
    }

    initFinish = () => {
        /*        this.setState({
         dataSource: this.state.dataSource.cloneWithRows(['', '', '']),
         renderPlaceholderOnly: 'success'
         });*/
        this.loadData();
    };

    loadData = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                this.isDoneCredit = datas.is_done_credit;
                this.creditBalanceMny = datas.credit_balance_mny;
                let maps = {
                    enter_base_ids: datas.company_base_id,
                };
                let url = AppUrls.USER_ACCOUNT_INFO;
                request(url, 'post', maps).then((response) => {
                    this.props.showModal(false);
                    this.accountInfo = response.mjson.data.account;
                    if (this.accountInfo) {
                        this.setState({
                            isRefreshing: false,
                            renderPlaceholderOnly: 'success'
                        });
                    } else {
                        this.props.showToast('用户信息查询失败');
                        this.setState({
                            isRefreshing: false,
                            renderPlaceholderOnly: 'null'
                        });
                    }
                }, (error) => {
                    this.props.showToast('用户信息查询失败');
                    this.setState({
                        isRefreshing: false,
                        renderPlaceholderOnly: 'error'
                    });
                });
            } else {
                this.props.showToast('用户信息查询失败');
            }
        });
    };

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title='收银台' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (
                <View style={styles.container}>
                    <NavigatorView title='收银台' backIconClick={this.backPage}/>
                    {/*                    <View style={styles.tradingCountdown}>
                     <Text style={{marginRight: Pixel.getPixel(15), marginLeft: Pixel.getPixel(15)}}>
                     <Text style={{
                     marginLeft: Pixel.getPixel(15),
                     fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                     color: fontAndColor.COLORB2,
                     fontWeight: 'bold'
                     }}>重要提示：</Text>
                     <Text style={{
                     lineHeight: Pixel.getPixel(20),
                     marginLeft: Pixel.getPixel(15),
                     fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                     color: fontAndColor.COLORB2
                     }}>您申请的订单融资贷款已到账，请向卖家支付，支付后卖家可提现到账资金。</Text>
                     </Text>
                     </View>
                     <View style={{backgroundColor: fontAndColor.COLORB8, height: 1}}/>*/}
                    <View style={{backgroundColor: 'white', marginTop: Pixel.getTitlePixel(65)}}>
                        <View style={styles.needPayBar}>
                            <Text style={{
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                marginTop: Pixel.getPixel(25)
                            }}>需支付金额</Text>
                            <Text style={{
                                marginTop: Pixel.getPixel(6),
                                //fontWeight: 'bold',
                                fontSize: Pixel.getFontPixel(38)
                            }}>{this.props.payAmount}元</Text>
                        </View>
                        <View style={styles.separatedLine}/>
                        <View style={styles.accountBar}>
                            <Text style={styles.title}>账户：</Text>
                            <Text
                                style={styles.content}>{this.accountInfo.bank_card_name + ' ' + this.accountInfo.bank_card_no}</Text>
                        </View>
                        <View style={styles.separatedLine}/>
                        <View style={styles.accountBar}>
                            <Text style={styles.title}>账户可用金额：</Text>
                            <Text style={styles.content}>{this.accountInfo.balance}元</Text>
                            <View style={{flex: 1}}/>
                            <TouchableOpacity
                                onPress={() => {
                                    this.toNextPage({
                                        name: 'AccountScene',
                                        component: AccountScene,
                                        params: {}
                                    });
                                }}>
                                <View style={{
                                    height: Pixel.getPixel(27),
                                    width: Pixel.getPixel(70),
                                    borderRadius: Pixel.getPixel(2),
                                    borderWidth: Pixel.getPixel(1),
                                    borderColor: fontAndColor.COLORB0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: Pixel.getPixel(15)
                                }}>
                                    <Text style={{
                                        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                        color: fontAndColor.COLORB0
                                    }}>充值</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <MyButton buttonType={MyButton.TEXTBUTTON}
                              content={'账户支付'}
                              parentStyle={styles.loginBtnStyle}
                              childStyle={styles.loginButtonTextStyle}
                              mOnPress={this.goPay}/>
                    {/*---订单融资---*/}
                    {<View>
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            //marginTop: Pixel.getPixel(35)
                        }}>
                            <View style={{
                                marginRight: Pixel.getPixel(15),
                                marginLeft: Pixel.getPixel(15),
                                backgroundColor: fontAndColor.COLORA1,
                                height: 1,
                                flex: 1
                            }}/>
                            <Text style={{
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                color: fontAndColor.COLORA1
                            }}>可选融资方案</Text>
                            <View style={{
                                marginRight: Pixel.getPixel(15),
                                marginLeft: Pixel.getPixel(15),
                                backgroundColor: fontAndColor.COLORA1,
                                height: 1,
                                flex: 1
                            }}/>
                        </View>
                        <MyButton
                            mOnPress={this.goApplyLoan}
                            buttonType={MyButton.TEXTBUTTON}
                            content={'订单融资'}
                            parentStyle={styles.loginBtnStyle1}
                            childStyle={styles.loginButtonTextStyle}/>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: Pixel.getPixel(21),
                            marginLeft: Pixel.getPixel(15)
                        }}>
                            <Text style={{
                                fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                color: fontAndColor.COLORA1
                            }}>授信可用额度：</Text>
                            <Text style={{
                                fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30)
                            }}>{this.creditBalanceMny}</Text>
                        </View>
                        <Text style={{
                            marginLeft: Pixel.getPixel(15),
                            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                            color: fontAndColor.COLORA1,
                            marginTop: Pixel.getPixel(10)
                        }}>申请订单融资额度请联系客服</Text>
                    </View> }
                    <ExplainModal ref='expModal' title='提示' buttonStyle={styles.expButton} textStyle={styles.expText}
                                  text='确定' content='您的余额不足请充值'/>
                </View>
            )
        }
    }

    checkPay = () => {
        this.props.showModal(true);
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.props.orderId,
                    type: this.props.payType,
                    trans_serial_no: this.transSerialNo
                };
                let url = AppUrls.ORDER_CHECK_PAY;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        if (response.mjson.data.pay_status == 3) {
                            this.props.showToast('支付成功');
                            this.props.callBack();
                            this.backPage();
                        } else {
                            this.props.showToast('支付失败');
                        }
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    //this.props.showToast('账户支付检查失败');
                    this.props.showToast(error.mjson.msg);
                });
            } else {
                this.props.showToast('账户支付检查失败');
            }
        });
    };

    goApplyLoan = () => {
        this.toNextPage({
            name: 'DDApplyLendScene',
            component: DDApplyLendScene,
            params: {
                orderNo: this.props.orderNo
            }
        });
    };

    goPay = () => {
        this.props.showModal(true);
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.props.orderId,
                    type: this.props.payType,
                    reback_url: webBackUrl.PAY
                };
                let url = AppUrls.ORDER_PAY;
                request(url, 'post', maps).then((response) => {
                    //this.loadData();
                    //this.props.showToast('支付成功');
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.props.showModal(false);
                        this.transSerialNo = response.mjson.data.trans_serial_no;
                        this.toNextPage({
                            name: 'AccountWebScene',
                            component: AccountWebScene,
                            params: {
                                title: '支付',
                                webUrl: response.mjson.data.auth_url + '?authTokenId=' + response.mjson.data.auth_token,
                                callBack: () => {
                                    this.checkPay()
                                },// 这个callBack就是点击webview容器页面的返回按钮后"收银台"执行的动作
                                backUrl: webBackUrl.PAY
                            }
                        });
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    //this.props.showToast('账户支付失败');
                    this.props.showToast(error.mjson.msg);
                });
            } else {
                this.props.showToast('账户支付失败');
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3
    },
    needPayBar: {
        alignItems: 'center',
        height: Pixel.getPixel(110),
        backgroundColor: 'white'
    },
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    accountBar: {
        flexDirection: 'row',
        height: Pixel.getPixel(43),
        backgroundColor: 'white',
        alignItems: 'center'
    },
    title: {
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA1
    },
    content: {
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: fontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15)
    },
    loginButtonTextStyle: {
        color: fontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT)
    },
    loginBtnStyle1: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: fontAndColor.COLORB1,
        marginTop: Pixel.getPixel(20),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15)
    },
    expButton: {
        marginBottom: Pixel.getPixel(20),
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        marginTop: Pixel.getPixel(32),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        borderWidth: 1,
        backgroundColor: fontAndColor.COLORB0,
        borderColor: fontAndColor.COLORB0
    },
    expText: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: '#ffffff'
    },
    tradingCountdown: {
        marginTop: Pixel.getTitlePixel(65),
        flexDirection: 'row',
        alignItems: 'center',
        height: Pixel.getPixel(70),
        backgroundColor: fontAndColor.COLORB6
    }
});