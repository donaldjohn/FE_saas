/**
 * Created by hanmeng on 2017/10/30.
 */
import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput
} from  'react-native'

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import BaseComponent from "../../../component/BaseComponent";
import AccountManageScene from "../AccountManageScene";
import BindCardScene from "../BindCardScene";
import WaitActivationAccountScene from "../WaitActivationAccountScene";
import AccountScene from "../AccountScene";
import StorageUtil from "../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../constant/storageKeyNames";
import {request} from "../../../utils/RequestUtil";
import * as Urls from '../../../constant/appUrls';
const Pixel = new PixelUtil();

const cellJianTou = require('../../../../images/mainImage/celljiantou.png');

export default class MyAccountItem extends BaseComponent {

    /**
     *  constructor
     **/
    constructor(props) {
        super(props);
        this.navigatorParams = {
            name: '',
            component: '',
            params: {}
        };
        this.state = {
            data: this.props.data
        };
    }

    /**
     *   跳转页面分发
     *   type 0恒丰 1浙商
     *   state 开户状态
     **/
    pageDispense = (type, state) => {
        if (type == '0') {
            switch (state) {
                case 0:
                    this.navigatorParams.name = 'AccountManageScene';
                    this.navigatorParams.component = AccountManageScene;
                    this.navigatorParams.params = {
                        callBack: () => {
                            this.props.callBack();
                        }
                    };
                    break;
                case 1:
                    this.navigatorParams.name = 'BindCardScene';
                    this.navigatorParams.component = BindCardScene;
                    this.navigatorParams.params = {
                        callBack: () => {
                            this.props.callBack();
                        }
                    };
                    break;
                case 2:
                    this.navigatorParams.name = 'WaitActivationAccountScene';
                    this.navigatorParams.component = WaitActivationAccountScene;
                    this.navigatorParams.params = {
                        callBack: () => {
                            this.props.callBack();
                        }
                    };
                    break;
                default:
                    this.navigatorParams.name = 'AccountScene';
                    this.navigatorParams.component = AccountScene;
                    this.navigatorParams.params = {
                        callBack: () => {
                            this.props.callBack();
                        }
                    };
                    break;
            }
        } else {
            //TODO 浙商页面跳转分发
        }
    };

    /**
     *   点击跳转方法
     *   type 0恒丰 1浙商
     **/
    jumpDetailPage = (type) => {
        this.props.showModal(true);
        if (type == '0') {
            StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
                if (data.code == 1) {
                    let datas = JSON.parse(data.result);
                    let maps = {
                        enter_base_ids: datas.company_base_id,
                        child_type: '1'
                    };
                    request(Urls.USER_ACCOUNT_INFO, 'Post', maps)
                        .then((response) => {
                            this.props.showModal(false);
                            this.pageDispense(type, response.mjson.data.account.status);
                            this.toNextPage(this.navigatorParams);
                        }, (error) => {
                            this.props.showModal(false);
                            this.props.showToast('用户信息查询失败');
                        });
                } else {
                    this.props.showModal(false);
                    this.props.showToast('用户信息查询失败');
                }
            });
        } else {

        }
    };

    /**
     *  render
     **/
    render() {
        let back = ''; //背景图
        let bank = ''; //银行图标
        let bankName = ''; //账户类型名称
        let accountState = ''; //账户状态
        if (this.props.type == '0') {
            back = require('../../../../images/account/hengfengback.png');
            bank = require('../../../../images/account/hengfengbank.png');
            bankName = '恒丰银行';
            if (this.state.data.status === 0) {
                accountState = '未开户';
            } else if (this.state.data.status === 1) {
                accountState = '未绑卡';
            } else if (this.state.data.status === 2) {
                accountState = '未激活';
            }
        } else {
            back = require('../../../../images/account/zheshangback.png');
            bank = require('../../../../images/account/zheshangbank.png');
            bankName = '浙商银行';
        }
        return (
            <View style={{alignItems: 'center'}}>
                <Image source={back}>
                    <TouchableOpacity
                        onPress={() => {
                            this.jumpDetailPage(this.props.type);
                        }}
                        activeOpacity={0.9}>
                        <View style={{
                            flexDirection: 'row',
                            marginLeft: Pixel.getPixel(20),
                            marginRight: Pixel.getPixel(20),
                            marginTop: Pixel.getPixel(45),
                            alignItems: 'center'
                        }}>
                            <Image source={bank}/>
                            <View style={{
                                width: Pixel.getPixel(120),
                                alignItems: 'flex-start',
                                marginLeft: Pixel.getPixel(12),
                                justifyContent: 'center',
                                backgroundColor: '#ffffff'
                            }}>
                                <Text style={{
                                    textAlign: 'left',
                                    fontSize: Pixel.getPixel(15),
                                    color: fontAndColor.COLORA0
                                }}>{bankName}</Text>
                                <Text style={{
                                    marginTop: Pixel.getPixel(3),
                                    textAlign: 'left',
                                    fontSize: Pixel.getPixel(12),
                                    color: fontAndColor.COLORA1
                                }}>{this.state.data.bind_bank_name}</Text>
                            </View>
                            {this.state.data.status === 0 || this.state.data.status === 1 || this.state.data.status === 2 ?
                                <Text style={{
                                    flex: 1,
                                    backgroundColor: '#ffffff',
                                    marginRight: Pixel.getPixel(10),
                                    textAlign: 'right',
                                    fontSize: Pixel.getPixel(15),
                                    color: fontAndColor.COLORB2
                                }}>{accountState}</Text> :
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-end',
                                    marginRight: Pixel.getPixel(10),
                                    justifyContent: 'center',
                                    backgroundColor: '#ffffff'
                                }}>
                                    <Text style={{
                                        textAlign: 'right',
                                        fontSize: Pixel.getPixel(15),
                                        color: fontAndColor.COLORA0
                                    }}>{this.state.data.balance}</Text>
                                    <Text style={{
                                        marginTop: Pixel.getPixel(3),
                                        textAlign: 'right',
                                        fontSize: Pixel.getPixel(12),
                                        color: fontAndColor.COLORA1
                                    }}>账户总额</Text>
                                </View>
                            }
                            <Image source={cellJianTou}/>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        backgroundColor: fontAndColor.COLORA4,
                        height: Pixel.getPixel(1),
                        marginLeft: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(20),
                        marginTop: Pixel.getPixel(12)
                    }}/>
                    <View style={{
                        marginTop: Pixel.getPixel(18),
                        alignItems: 'flex-start',
                        marginLeft: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(20),
                        justifyContent: 'center',
                        backgroundColor: 'transparent'
                    }}>
                        <Text style={{
                            textAlign: 'left',
                            fontSize: Pixel.getPixel(12),
                            color: fontAndColor.COLORA1
                        }}>资金账号</Text>
                        <Text style={{
                            marginTop: Pixel.getPixel(3),
                            textAlign: 'left',
                            fontSize: Pixel.getPixel(20),
                            color: fontAndColor.COLORA0
                        }}>{this.state.data.bank_card_no}</Text>
                    </View>
                    <View style={{
                        marginTop: Pixel.getPixel(25),
                        alignItems: 'flex-start',
                        marginLeft: Pixel.getPixel(20),
                        marginRight: Pixel.getPixel(20),
                        justifyContent: 'center',
                        backgroundColor: 'transparent'
                    }}>
                        <Text style={{
                            textAlign: 'left',
                            fontSize: Pixel.getPixel(12),
                            color: fontAndColor.COLORA1
                        }}>开通时间</Text>
                        <Text style={{
                            marginTop: Pixel.getPixel(3),
                            textAlign: 'left',
                            fontSize: Pixel.getPixel(15),
                            color: fontAndColor.COLORA0
                        }}>2017-10-10</Text>
                    </View>
                </Image>
            </View>
        )
    }

}

const styles = StyleSheet.create({});