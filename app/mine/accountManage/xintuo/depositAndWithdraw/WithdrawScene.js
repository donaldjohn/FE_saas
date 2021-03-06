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
    Button
} from "react-native";
import BaseComponent from "../../../../component/BaseComponent";
import NavigationBar from "../../../../component/NavigationBar";
import * as FontAndColor from "../../../../constant/fontAndColor";
import PixelUtil from "../../../../utils/PixelUtil";
import MyButton from "../../../../component/MyButton";
import {request} from "../../../../utils/RequestUtil";
import * as AppUrls from "../../../../constant/appUrls";
import StorageUtil from "../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../constant/storageKeyNames";
import SText from '../component/SaasText'
import SmsFillScene from './SmsFillScene'
import ZSBaseComponent from  '../component/ZSBaseComponent'
import  ResultIndicativeScene from '../ResultIndicativeScene'
import SaasText from "../../zheshangAccount/component/SaasText";
import TrustAccountContractScene from "../../trustAccount/TrustAccountContractScene";
import SelectButton from "../../component/SelectButton";


let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');

export default class WithdrawScene extends ZSBaseComponent {
    constructor(props) {
        super(props)
        this.check_contact = true
        this.state = {
            renderPlaceholderOnly: true,
            sms_pad: false,
            money_input: '',
            allow_withdraw_amount: '',
            isShowContact:false,
        }
        this.contractList = []
        this.contract = []
    }

    initFinish() {
        this.loadContact()
        this.setState({
            renderPlaceholderOnly: false,
        })
    }

    openContractScene = (name, url) => {
        this.toNextPage({
            name: 'TrustAccountContractScene',
            component: TrustAccountContractScene,
            params: {
                title: name,
                webUrl: url
            }
        })
    };

    loadContact = () => {

        this.props.showModal(true);
        let maps = {
            source_type: '3',
            fund_channel: '信托'
        };
        request(AppUrls.AGREEMENT_LISTS, 'Post', maps)
            .then((response) => {
                this.props.showModal(false);
                this.contractList = response.mjson.data.list;

                for (let i = 0; i < this.contractList.length; i++) {

                    if (this.contractList[i].name==='信托利益分配申请' ){
                        this.contract.push(<Text
                            key={i + 'contractList'}
                            allowFontScaling={false}
                            onPress={() => {
                                this.openContractScene('合同', this.contractList[i].url)
                                console.log(this.contractList[i].url)
                            }}
                            style={{
                                fontSize: Pixel.getFontPixel(FontAndColor.CONTENTFONT24),
                                color: FontAndColor.COLORB4,
                                lineHeight: Pixel.getPixel(20)
                            }}>
                            《{this.contractList[i].name}》
                        </Text>);

                    }
                }

                this.setState({
                    isShowContact:true
                })

            }, (error) => {
                this.props.showModal(false);
                this.props.showToast(error.mjson.msg);
            });
    }


    render() {



        if (this.state.renderPlaceholderOnly) {
            return (
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={'粮票提现'}
                        rightText={""}

                    />
                </View>
            )
        }
        let s = this.props.account.bind_bank_card_no.replace(/^(....).*(....)$/, "$1****$2")

        return (
            <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'粮票提现'}
                    rightText={''}
                    leftImageCallBack={() => {
                        this.props.callBack()
                        this.backPage();
                    }}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                >

                    <View style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        marginTop: 15,
                        paddingVertical: 20,
                    }}>
                        <Image source={require('../../../../../images/account/zheshang_bank.png')}
                               style={{width: 55, height: 55, marginHorizontal: 15}}/>
                        <View style={{flex:1}}>

                            <SText style={{fontSize: 17, marginBottom: 10, marginRight:20}}>{this.props.account.bind_sub_bank_name}</SText>
                            <SText
                                style={{color: FontAndColor.COLORA1}}>{s}</SText>
                        </View>
                    </View>

                    <View style={{backgroundColor: 'white', marginTop: 10}}>
                        <View style={{marginHorizontal: 15,}}>
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
                                        onChangeText={(text) => {
                                                this.setState({
                                                    money_input: text
                                                })
                                        }}
                                        value={this.state.money_input}
                                    />
                                </View>
                            </View>
                            <View style={{paddingVertical: 15, flexDirection:"row"}}>

                                <View style={{flexDirection: 'row'}}>
                                    <SText style={{color: FontAndColor.COLORA1}}>可用余额:</SText>
                                    <SText>{this.props.account.balance}元</SText>
                                </View>

                                    <SText
                                        style={{color: FontAndColor.COLORB4, fontSize: 16, textAlign: 'right', flex: 1}}
                                        onPress={() => {

                                            this.setState({
                                                money_input: this.props.account.balance,
                                            })
                                        }}
                                    >全部提现</SText>

                            </View>
                        </View>

                    </View>

                    <MyButton
                        buttonType={MyButton.TEXTBUTTON}
                        content={'粮票提现'}
                        parentStyle={styles.next_button_parent}
                        childStyle={{fontSize: 18, color: 'white'}}
                        mOnPress={() => {

                            if (parseFloat( this.props.account.balance) < parseFloat(this.state.money_input)) {
                                this.props.showToast('可提余额不足');
                                return;
                            }
                            let money = parseFloat(this.state.money_input)
                            if (money <= 0 || this.state.money_input === null || this.state.money_input === '') {
                                this.props.showToast('请输入金额')
                                return;
                            }
                            if(!this.check_contact){
                                this.props.showToast('请输同意信托利益分配申请')
                                return;
                            }


                            this.withdraw();


                        }}

                    />



                    {this.state.isShowContact?
                        <View style={{ flexDirection:'row',alignItems:'center', marginTop:Pixel.getPixel(20), alignSelf:'center'}}>


                            <SelectButton onPress={(flag)=>{
                                this.check_contact = flag;
                            }}/>
                            {this.contract}
                        </View>


                        :null}


                </ScrollView>

                {this.out_of_service()}
            </View>

        )
    }

    withdraw = () => {

        this.props.showModal(true)
        this.dismissKeyboard();
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code === 1) {
                let result = JSON.parse(data.result)
                let params = {
                    account_type_id:this.props.account.account_id,
                    amount: parseFloat(this.state.money_input),
                    enter_base_id: result.company_base_id,
                    bank_id:'zsyxt'
                }

                request(AppUrls.XINTUO_WITHDRAW, 'POST', params).then((response) => {
                    this.props.showModal(false)
                    this.setState({
                        sms_pad: false
                    })

                    this.toNextPage({
                        component: ResultIndicativeScene,
                        name: 'ResultIndicativeScene',
                        params: {
                            type: 3,
                            status: 1,
                            params: params,
                            callBack:this.props.callBack,
                        }
                    })
                }, (error) => {

                    this.props.showModal(false)
                    this.setState({
                        sms_pad: false
                    })

                    if (error.mycode === 8010007) {  // 存疑
                        this.toNextPage({
                            component: ResultIndicativeScene,
                            name: 'ResultIndicativeScene',
                            params: {
                                type: 3,
                                status: 0,
                                params: params,
                                error:error.mjson,
                                callBack:this.props.callBack,
                            }
                        })

                    }else if(error.mycode === -300 || error.mycode === -500){
                        this.props.showToast(error.mjson.msg)
                    }else {
                        this.toNextPage({
                            component: ResultIndicativeScene,
                            name: 'ResultIndicativeScene',
                            params: {
                                type: 3,
                                status: 2,
                                params: params,
                                error:error.mjson,
                                callBack:this.props.callBack,
                            }
                        })
                    }
                })
            }
        })
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