/**
 * Created by lhc on 2017/2/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import {
    CommnetListItem,
    LendCarItemCell,
    CommenButtonNew,
    CommenButton,
    commnetStyle,
    ComentImageButton
} from './component/ComponentBlob'
import {
    width,
    height,
    fontadapeSize,
    adapeSize,
    STATECODE,
    PAGECOLOR,
    getRowData,
    getSectionData,
    changeToMillion
} from './component/MethodComponent'
import {ModifyBorrowing, ModifyBorrowingNew, LendSuccessAlert, ModalAlert, MMSModalAlert} from './component/ModelComponent'
import  OrderCarDetailSceneNew from './OrderCarDetailSceneNew'
import  AllNavigationView from '../../component/AllNavigationView';
import BaseComponent from '../../component/BaseComponent';
import {request} from '../../utils/RequestUtil'
import *as apis from '../../constant/appUrls'
import ContractInfoScene from './ContractInfoScene';
// import ContractInfoSceneChildren from './ContractInfoSceneChildren';
import ContractInfoSceneChildren from './ContractListScene';
import RecognizedGains from '../../login/RecognizedGains';

const cellJianTou = require('../../../images/mainImage/celljiantou.png');
const controlCode = {
    stateCode: '',
    extendCode: '',
    lendType: '',
    maxLend: '',
    minLend: '',
    changeMoney: '',
    loan_code: '',
    is_microchinese_contract: ''
}


export  default  class SingDetaileSenceNew extends BaseComponent {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource(
            {
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }
        )
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.titleNameBlob({}, [])),
            renderPlaceholderOnly: STATECODE.loading
        }
    }

    initFinish() {
        this.getLendinfo();
    }

    //借款信息
    getLendinfo = () => {
        let maps = {
            api: apis.GET_APPLY_INFO_NEW,
            payment_number: this.props.loanNumber
        };
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    this.tempjson = response.mjson.data
                    this.stateCode =  this.tempjson.logic_status;
                    this.minLend =  this.tempjson.loanmny;
                    this.maxLend = changeToMillion( parseFloat(this.tempjson.loanmny) + parseFloat(this.tempjson.loanperiod));
                    // controlCode.stateCode =  this.tempjson.data.response.logic_status;
                    // controlCode.extendCode = this.tempjson.is_extend;  查看合同
                    // controlCode.lendType = this.tempjson.type;
                    // controlCode.minLend = changeToMillion(this.tempjson.min_loanmny);
                    // controlCode.loan_code = this.tempjson.loan_code;
                    // controlCode.is_microchinese_contract = this.tempjson.is_microchinese_contract;
                    // let Maxmum = parseFloat(this.tempjson.max_loanmny) + parseFloat(this.tempjson.payment_loanmny)
                    // controlCode.maxLend = changeToMillion(Maxmum)
                    if (this.stateCode != 10 && this.stateCode != 20 && this.stateCode != 0) {
                        this.getOrderCarInfo()
                    } else {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRowsAndSections([]),
                            renderPlaceholderOnly: STATECODE.loadSuccess
                        })
                    }
                }, (error) => {
                    this.setState({
                        renderPlaceholderOnly: STATECODE.loadError
                    })
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast('服务器连接有问题')
                    } else {
                        this.props.showToast(error.mjson.msg);
                    }
                });
    }

    //车辆信息
    getOrderCarInfo = () => {
        let maps = {
            api: apis.GET_APPLY_CARLIST_NEW,
            payment_number: this.props.loanNumber
        }
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    let tempCarJson = response.mjson.data
                    // let xxx = {
                    //     "token": "",
                    //     "code": 1,
                    //     "msg": "ok",
                    //     "data": {
                    //         "request": {
                    //             "device_code": "dycd_platform_finance_pc",
                    //             "user_ip": "1",
                    //             "payment_number": 201710180010
                    //         },
                    //         "response": [
                    //             {
                    //                 "model_name": "2017款 宝马5系 535Li 行政型 豪华设计套装",
                    //                 "frame_number": "43434343233346666",
                    //                 "loan_number": "201706080012",
                    //                 "loan_mny": "17000.00",
                    //                 "loan_time": "2017-09-01",
                    //                 "assess_time": "2017-10-18",
                    //                 "assess_user_name": "admin",
                    //                 "plate_number": "0",
                    //                 "hq_assess_mny": 3.5,
                    //                 "storage": "工行烫晚祁有限公司",
                    //                 "lending_methods": "线下放款",
                    //                 "channel_name": null,
                    //                 "finish_time": null,
                    //                 "child_loan_status": 60,
                    //                 "child_loan_status_str": "渠道审核中",
                    //                 "is_confirm_iou": 1,
                    //                 "is_sign_contract": 1,
                    //                 "is_cancel_loan": 1
                    //             },
                    //             {
                    //                 "model_name": "2017款 奥迪A6L TFSI 技术型",
                    //                 "frame_number": "34343434444555555",
                    //                 "loan_number": "32906",
                    //                 "loan_mny": "24000.00",
                    //                 "loan_time": "2017-09-01",
                    //                 "assess_time": "2017-10-18",
                    //                 "assess_user_name": "admin",
                    //                 "plate_number": "0",
                    //                 "hq_assess_mny": 3,
                    //                 "storage": "工行烫晚祁有限公司",
                    //                 "lending_methods": "线下放款",
                    //                 "channel_name": null,
                    //                 "finish_time": null,
                    //                 "child_loan_status": 40,
                    //                 "child_loan_status_str": "渠道审核中",
                    //                 "is_confirm_iou": 1,
                    //                 "is_sign_contract": 1,
                    //                 "is_cancel_loan": 1
                    //             },
                    //             {
                    //                 "model_name": "2017款 宝马5系 535Li 行政型 豪华设计套装",
                    //                 "frame_number": "43434343233346666",
                    //                 "loan_number": "201706080012",
                    //                 "loan_mny": "17000.00",
                    //                 "loan_time": "2017-09-01",
                    //                 "assess_time": "2017-10-18",
                    //                 "assess_user_name": "admin",
                    //                 "plate_number": "0",
                    //                 "hq_assess_mny": 3.5,
                    //                 "storage": "工行烫晚祁有限公司",
                    //                 "lending_methods": "线下放款",
                    //                 "channel_name": null,
                    //                 "finish_time": null,
                    //                 "child_loan_status": 50,
                    //                 "child_loan_status_str": "渠道审核中",
                    //                 "is_confirm_iou": 1,
                    //                 "is_sign_contract": 1,
                    //                 "is_cancel_loan": 1
                    //             },
                    //
                    //         ]
                    //     }
                    // }
                    // let tempCarJson = xxx.data.response

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.titleNameBlob(tempCarJson)),
                        renderPlaceholderOnly: STATECODE.loadSuccess
                    })
                }, (error) => {
                    this.setState({
                        renderPlaceholderOnly: STATECODE.loadError
                    })
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast('服务器连接有问题')
                    } else {
                        this.props.showToast(error.mjson.msg);
                    }
                });
    }

    // 数据初始化方法
    titleNameBlob = ( carData) => {
        let dataSource = {};
        if (carData.length > 0) {
            let tempCarDate = [];
            carData.map((item) => {
                tempCarDate.push(item)
            })
            dataSource['section2'] = tempCarDate;
        }
        return dataSource;
    }


    getControlTitleblob = (stateCode) => {
        if (stateCode !== '') {
            let tempTitle = []
            if (stateCode == '10') {
                tempTitle = ['评估监管中']
            } else if (stateCode == '20') {
                tempTitle = ['审核中']
            } else if (stateCode == '30') {
                // tempTitle = ['渠道审核中']
                tempTitle = ['取消借款']
            }else if (stateCode == '40') {
                // tempTitle = ['待签合同']
                tempTitle = ['取消借款','签署合同']
            }else if (stateCode == '50') {
                // tempTitle = ['待确认借据']
                tempTitle = ['确认借据']
            }else if (stateCode == '60') {
                // tempTitle = ['处理中']
                tempTitle = ['查看合同']
            }else if (stateCode == '70') {
                // tempTitle = ['已放款']
                tempTitle = ['查看合同']
            }else if (stateCode == '80') {
                // tempTitle = ['已还清']
                tempTitle = ['查看合同']
            }else if (stateCode == '21') {
                // tempTitle = ['审核未通过']
            }else if (stateCode == '0') {
                // tempTitle = ['已取消']
            }
            return tempTitle;
        }
    }

    getStatusStr = (stateCode) => {
        if (stateCode !== '') {
            let tempTitle = []
            if (stateCode == '10') {
                tempTitle = ['评估监管中']
            } else if (stateCode == '20') {
                tempTitle = ['审核中']
            } else if (stateCode == '30') {
                tempTitle = ['渠道审核中']
            }else if (stateCode == '40') {
                tempTitle = ['待签合同']
            }else if (stateCode == '50') {
                tempTitle = ['待确认借据']
            }else if (stateCode == '60') {
                tempTitle = ['处理中']
            }else if (stateCode == '70') {
                tempTitle = ['已放款']
            }else if (stateCode == '80') {
                tempTitle = ['已还清']
            }else if (stateCode == '21') {
                tempTitle = ['审核未通过']
            }else if (stateCode == '0') {
                tempTitle = ['已取消']
            }
            return tempTitle;
        }
    }

    getStatusStrs = (stateCode) => {
        if (stateCode !== '') {
            let tempTitle = []
            if (stateCode == '10') {
                // tempTitle = ['评估监管中']
            } else if (stateCode == '20') {
                // tempTitle = ['审核中']
            } else if (stateCode == '30') {
                tempTitle = ['资金渠道正在对您的借款进行审核，请耐心等待。']
            }else if (stateCode == '40') {
                tempTitle = ['您有待签署的合同，请尽快签署。']
            }else if (stateCode == '50') {
                tempTitle = ['您有待确认的借据，请尽快确认。']
            }else if (stateCode == '60') {
                tempTitle = ['当前您的借款处于处理中的状态，请耐心等待。']
            }else if (stateCode == '70') {
                // tempTitle = ['已放款']
            }else if (stateCode == '80') {
                // tempTitle = ['已还清']
            }else if (stateCode == '21') {
                // tempTitle = ['审核未通过']
            }else if (stateCode == '0') {
                // tempTitle = ['已取消']
            }
            return tempTitle;
        }
    }

    getButtonStyleWithTitle = (title) => {

        switch (title) {

            case '取消借款':
                return styles.cancelButton
            case '签署合同':
                return styles.controlButton
            case '查看合同':
                return styles.cancelButton
            case '已取消借款':
                return styles.canceledButton
            case '确认借据'://签署微单合同
                return styles.controlButton
            case '资金方签署中':
                return styles.cancelButton
            default:
                return styles.cancelButton
        }

    }

    //取消借款  子单
    cancleLoadC = (imgSid,code) => {
        this.props.showModal(true);
        let maps = {
            api: apis.CANCEL_CHILD_LOAN,
            payment_number : this.props.loanNumber, //主单号
            loan_number :this.loan_number,
            img_sid : imgSid,
            img_code : code,
        }
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                this.props.showModal(false);
                this.successCancle.setModelVisible(true)
            }, (error) => {
                this.props.showModal(false);
                if (error.mycode == -300 || error.mycode == -500) {
                    this.props.showToast('服务器连接有问题')
                } else {
                    this.props.showToast(error.mjson.msg);
                }
            });
    }

    //取消借款  主单
    cancleLoad = (imgSid,code) => {
        this.props.showModal(true);
        let maps = {
            api: apis.CANCEL_LOAN,
            loan_code: this.props.loanNumber,
            img_sid : imgSid,
            img_code : code,
        }
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    this.props.showModal(false);
                    this.successCancle.setModelVisible(true)
                }, (error) => {
                    this.props.showModal(false);
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast('服务器连接有问题')
                    } else {
                        this.props.showToast(error.mjson.msg);
                    }
                });
    }

    controsButtonClick = (title,loan_number) => {

        if (title === '取消借款') {
            this.loan_number = loan_number;
            this.cancleFlag = '取消子单'
            this.canleAlert.setModelVisible(true);
        } else if (title === '签署合同') {
            this.toNextPage({
                name: 'ContractInfoSceneChildren',
                component: ContractInfoSceneChildren,
                params: {
                    loan_code: this.props.loanNumber,
                    showButton: true,
                    callbackfresh:() => {
                        this.initFinish();
                        this.props.backRefresh();
                    }
                }
            });
        } else if (title === '查看合同') {
            this.toNextPage({
                name: 'ContractInfoSceneChildren',
                component: ContractInfoSceneChildren,
                params: {loan_code: this.props.loanNumber, showButton: false}
            });
        } else if (title === '资金方签署中') {
            this.toNextPage({
                name: 'ContractInfoSceneChildren',
                component: ContractInfoSceneChildren,
                params: {loan_code: this.props.loanNumber, showButton: false}
            });
        } else if (title === "确认借据") {//签署微单合同
            this.toNextPage({
                name: 'RecognizedGains', component: RecognizedGains, params: {
                    loan_code: this.props.loanNumber, //主单号,
                    loan_number: loan_number,
                    isShow: true,
                    callBack: () => {
                        this.setState({
                            renderPlaceholderOnly: 'loading'
                        });
                        this.getLendinfo();
                    }
                }
            });
        }
    }

    modifyLengNum = (callback) => {
        if (controlCode.changeMoney !== '') {
            let maps = {
                api: apis.SET_APPLY_MNY,
                loan_code: this.props.loanNumber,
                loan_mny: controlCode.changeMoney,
            };
            callback(false);
            this.props.showModal(true);
            request(apis.FINANCE, 'Post', maps)
                .then((response) => {
                        this.props.showModal(false);
                        this.change.setModelVisible(true)
                    }, (error) => {
                        this.props.showModal(false);
                        if (error.mycode != -300 || error.mycode != -500) {

                            this.props.showToast(error.mjson.msg);
                        } else {

                            this.props.showToast('服务器连接有问题')
                        }
                    });

        } else {
            this.props.showToast('请输入借款金额')
        }
    }

    getCarInfo = (rowData) => {
        let navigatorParams = {
            name: 'OrderCarDetailSceneNew',
            component: OrderCarDetailSceneNew,
            params: {
                rowData: rowData,
                type: '2'
            }
        }
        this.toNextPage(navigatorParams);
    }

    renderHeader = () => {
        return (
            <View style={{flexDirection:'column',backgroundColor:"#ffffff"}}>
                <View style={{flexDirection:'row',paddingLeft:adapeSize(10),paddingRight:adapeSize(10),paddingTop:adapeSize(10),paddingBottom:adapeSize(10),alignItems:'center'}}>
                    <Text style={{backgroundColor:'#05c5c2',color:'#ffffff',fontSize:adapeSize(12),borderRadius:adapeSize(1),paddingLeft:adapeSize(3),paddingRight:adapeSize(3),height:adapeSize(16)}}>单</Text>
                    <Text style={{flex:1,fontSize:adapeSize(14),marginLeft:adapeSize(5)}}>{ this.tempjson.payment_number}</Text>
                    <Text style={{fontSize:adapeSize(14),color:"#FA5741"}}>{this.getStatusStr(this.stateCode)}</Text>
                </View>
                <View style={{width:width,height:1,backgroundColor:'#D8D8D8'}}/>
                <View style={{flexDirection:'row',paddingLeft:adapeSize(10),paddingRight:adapeSize(10),paddingTop:adapeSize(10),paddingBottom:adapeSize(10)}}>
                    <View style={{flexDirection:'column',flex:1,alignItems:"flex-start"}}>
                        <Text style={{fontSize:adapeSize(20),color:"#FA5741"}}>{parseFloat(this.tempjson.loanmny)}<Text style={{fontSize:adapeSize(12)}}>万</Text></Text>
                        <Text style={{fontSize:adapeSize(12),color:"#9E9E9E"}}>借款金额</Text>
                    </View>
                    <View style={{flexDirection:'column',flex:1,alignItems:"center"}}>
                        <Text style={{fontSize:adapeSize(20),color:"#000000"}}>{this.tempjson.loanperiod}<Text style={{fontSize:adapeSize(12)}}>天</Text></Text>
                        <Text style={{fontSize:adapeSize(12),color:"#9E9E9E"}}>借款期限</Text>
                    </View>
                    <View style={{flexDirection:'column',flex:1,alignItems:"flex-end"}}>
                        <Text style={{fontSize:adapeSize(20),color:"#000000"}}> {parseFloat(this.tempjson.rate)}<Text style={{fontSize:adapeSize(12)}}>%</Text></Text>
                        <Text style={{fontSize:adapeSize(12),color:"#9E9E9E"}}>综合费率</Text>
                    </View>
                </View>
                <View style={{width:width-adapeSize(10),height:1,backgroundColor:'#D8D8D8',marginLeft:adapeSize(5),marginRight:adapeSize(5)}}/>
                <View style={{flexDirection:'row',paddingLeft:adapeSize(10),paddingRight:adapeSize(10),paddingTop:adapeSize(10),paddingBottom:adapeSize(10)}}>
                    <Text style={{fontSize:adapeSize(13),color:"#9E9E9E"}}>{this.tempjson.paymenttype}</Text>
                    {
                        this.stateCode != 0 ?
                            <Text style={{fontSize:adapeSize(13),color:"#9E9E9E"}}>| 申请日期:{this.tempjson.loan_time}</Text> :null
                    }

                </View>
                {
                    this.stateCode == 0 ?
                    <View style={{flexDirection:'column'}}>
                        <View style={{width:width-adapeSize(10),height:1,backgroundColor:'#D8D8D8',marginLeft:adapeSize(5),marginRight:adapeSize(5)}}/>
                        <View style={{flexDirection:'row',padding:adapeSize(10)}}>
                            <Text style={{fontSize:adapeSize(13),color:"#000000",flex:1}}>{'借款日期'}</Text>
                            <Text style={{fontSize:adapeSize(13),color:"#000000"}}>{this.tempjson.loan_time}</Text>
                        </View>
                        <View style={{width:width-adapeSize(10),height:1,backgroundColor:'#D8D8D8',marginLeft:adapeSize(5),marginRight:adapeSize(5)}}/>
                        <View style={{flexDirection:'row',padding:adapeSize(10)}}>
                            <Text style={{fontSize:adapeSize(13),color:"#000000",flex:1}}>{'取消日期'}</Text>
                            <Text style={{fontSize:adapeSize(13),color:"#000000"}}>{this.tempjson.channel_time}</Text>
                        </View>
                    </View>:null
                }
                {
                    this.getStatusStr(this.stateCode) != []?
                    <Text style={{fontSize:adapeSize(12),color:"#846545",backgroundColor:'#FFF8EA',paddingLeft:adapeSize(10),paddingRight:adapeSize(10),paddingTop:adapeSize(10),paddingBottom:adapeSize(10)}}>
                        {this.getStatusStrs(this.stateCode)}
                    </Text>:null
                }
            </View>
        )
    }

    renderRow = (rowData, sectionID, rowId, highlightRow) => {
        let tempButtons = [];
        let tempButtonTitles = this.getControlTitleblob(rowData.child_loan_status);
        tempButtonTitles.map((item) => {
                tempButtons.push(<CommenButtonNew buttonStyle={this.getButtonStyleWithTitle(item)}
                                               textStyle={styles.buttontextStyle}
                                               onPress={()=>{this.controsButtonClick(item,rowData.loan_number)}}
                                               title={item}
                                               key={item}
                />)
            }
        )
        return <View style={{flexDirection:'column',backgroundColor:'#ffffff'}}>
                <TouchableOpacity onPress={()=>{   this.getCarInfo(rowData) }} >
                    <View style={{flexDirection:'row',paddingLeft:adapeSize(10),paddingRight:adapeSize(10),paddingTop:adapeSize(10),paddingBottom:adapeSize(10),alignItems:'center'}}>
                        <View style={{flexDirection:'column',flex:1}}>
                            <Text style={{fontSize:adapeSize(12),color:'#9B9B9B'}}>{rowData.model_name}</Text>
                            <Text style={{fontSize:adapeSize(12),color:'#9B9B9B'}}>{rowData.frame_number}</Text>
                        </View>
                        <Text style={{fontSize:adapeSize(14),color:'#05C5C2'}}>{rowData.child_loan_status_str}</Text>
                        <Image source={cellJianTou} style={{ width: adapeSize(15), height: adapeSize(15)}}/>
                    </View>
                </TouchableOpacity>
                <View style={{width:width,height:1,backgroundColor:'#D8D8D8'}}/>
                <View style={{flexDirection:"column",paddingLeft:adapeSize(10),paddingRight:adapeSize(10),paddingTop:adapeSize(10),paddingBottom:adapeSize(10)}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontSize:adapeSize(20),color:'#FA5741',width:adapeSize(100)}}>{rowData.loan_mny}</Text>
                        <Text style={{fontSize:adapeSize(14),color:'#000000',width:adapeSize(100)}}>{rowData.loan_time}</Text>
                        <Text style={{fontSize:adapeSize(14),color:'#000000'}}>{rowData.loan_number}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(100)}}>{'合同放款额度'}</Text>
                        <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(100)}}>{'放款日期'}</Text>
                        <Text style={{fontSize:adapeSize(12),color:'#9E9E9E'}}>{'资产编号'}</Text>
                    </View>
                </View>
                {
                    rowData.child_loan_status == 70 ?
                    <View style={{flexDirection:"column",paddingLeft:adapeSize(10),paddingRight:adapeSize(10),paddingTop:adapeSize(10),paddingBottom:adapeSize(10)}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:adapeSize(14),color:'#000000',width:adapeSize(100)}}>{rowData.lending_methods}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(100)}}>{rowData.channel_name}</Text>
                        </View>
                    </View>:null
                }
                {
                    rowData.child_loan_status == 80 ?
                    <View style={{flexDirection:"column",paddingLeft:adapeSize(10),paddingRight:adapeSize(10),paddingTop:adapeSize(10),paddingBottom:adapeSize(10)}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontSize:adapeSize(14),color:'#000000',width:adapeSize(100)}}>{rowData.lending_methods}</Text>
                            <Text style={{fontSize:adapeSize(14),color:'#000000',width:adapeSize(100)}}>{rowData.finish_time}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(100)}}>{rowData.channel_name}</Text>
                            <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(100)}}>{'结清日期'}</Text>
                        </View>
                    </View>:null
                }
                <View style={{width:width,height:1,backgroundColor:'#D8D8D8'}}/>
                <View style={[{flexDirection: 'row',justifyContent: 'flex-end',alignItems: 'center',paddingLeft:adapeSize(10),paddingRight:adapeSize(10),paddingTop:adapeSize(10),paddingBottom:adapeSize(10)}]}>
                        {tempButtons}
                </View>
        </View>
    }

    renderFooter = () => {
        return (
            <View style={{flexDirection:'column',height:40}}>

            </View>
        )
    }

    renderSectionHeader = (sectionData, sectionID) => {
        return (
            <View style={[sectionID != 'section1' && {backgroundColor:PAGECOLOR.COLORA3, height: 10}]}></View>
        )
    }

    renderSeparator = (sectionID, rowId, adjacentRowHighlighted) => {
        return (
            <View key={`${sectionID}-${rowId}`} style={{height:10, backgroundColor:PAGECOLOR.COLORA3}}></View>
        )
    }

    render() {
        if (this.state.renderPlaceholderOnly !== STATECODE.loadSuccess) {
            return (
                <View style={styles.container}>
                    {this.loadView()}
                    <AllNavigationView title='借款详情' backIconClick={()=> { this.backPage(); }}/>
                </View>);
        }

        return (
            <View style={commnetStyle.container}>
                <ListView
                    removeClippedSubviews={false}
                    style={[commnetStyle.ListWarp,{bottom: 0}]}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderHeader={this.renderHeader}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSeparator={this.renderSeparator}
                    renderFooter={this.renderFooter}
                />
                <ModifyBorrowingNew ref={(model)=>{this.modifyb=model}}
                                 onchangeText={(text)=>{controlCode.changeMoney=text}}
                                 minLend={this.minLend}
                                 maxLend={this.maxLend}
                                 confimClick={this.modifyLengNum}
                                 cancleClick={(callback)=>{callback(false)}}/>

                <LendSuccessAlert ref={(lend)=>{this.change=lend}}
                                  confimClick={()=>{
                                      this.props.backRefresh();
                                      this.getLendinfo();
                                  }}
                                  title='修改成功' subtitle='恭喜您修改借款成功'/>

                <ModalAlert title='' subtitle="您确定要取消借款吗？"
                               ref={(cancle)=>{this.canleAlert = cancle}}
                               confimClick={(setmodilVis)=>{
                                   setmodilVis(false)
                                   this.MMScanleAlert.setModelVisible(true);
                               }}
                               cancleClick={(setmodilVis)=>{setmodilVis(false)}}/>

                <MMSModalAlert ref={(cancle)=>{this.MMScanleAlert = cancle}}
                               confimClick={(setModelVis,imgSid,code)=>{
                                   setModelVis(false);
                                   if(this.cancleFlag =='取消主单'){
                                        this.cancleLoad(imgSid,code)
                                   } else {
                                        this.cancleLoadC(imgSid,code)
                                   }
                               }}
                               cancleClick={(setmodilVis)=>{setmodilVis(false)}}/>

                <LendSuccessAlert ref={(canleS)=>{this.successCancle=canleS}}
                                  confimClick={()=>{
                                      this.props.backRefresh();
                                      if(this.cancleFlag == '取消主单'){
                                        this.backPage()
                                      }else {
                                        this.getOrderCarInfo()
                                      }
                                  }}
                                  title='取消成功' subtitle='取消借款成功'/>

                <AllNavigationView
                    title="借款详情"
                    backIconClick={this.backPage}/>
                <View style={{position: 'absolute',bottom: 0,justifyContent:'center',alignItems:'center',flexDirection:'row',width:width}}>

                    {
                        this.tempjson.logic_status == 10?
                            <TouchableOpacity  style={{height:40,flex:1,backgroundColor:'#90A1B5',justifyContent:'center',alignItems:'center'}}
                                           onPress={()=>{
                                               this.cancleFlag = '取消主单'
                                               this.canleAlert.setModelVisible(true);
                                           }}>
                                <Text style={{fontSize:adapeSize(15),color:'#ffffff'}}>取消借款</Text>
                            </TouchableOpacity>:null
                    }
                    {
                        this.stateCode == '10'?
                            <TouchableOpacity style={{height:40,flex:1,backgroundColor:'#05C5C2',justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{ this.modifyb.setModelVisible(true)  }}>
                                <Text style={{fontSize:adapeSize(15),color:'#ffffff'}}>修改借款金额</Text>
                            </TouchableOpacity>:null
                    }
                    {
                        this.tempjson.is_sign_contract == 1?
                            <TouchableOpacity style={{height:40,flex:1,backgroundColor:'#05C5C2',justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{
                                                   this.toNextPage({
                                                        name: 'ContractInfoScene',
                                                        component: ContractInfoScene,
                                                        params: {
                                                            loan_code: this.props.loanNumber, showButton: true, callbackfresh: () => {
                                                                this.initFinish();
                                                                this.props.backRefresh();
                                                            }
                                                        }
                                                    });
                                              }}>
                                <Text style={{fontSize:adapeSize(15),color:'#ffffff'}}>批量签署</Text>
                            </TouchableOpacity>:null
                    }
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PAGECOLOR.COLORA3
    }, buttonStyle: {
        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: adapeSize(1),
        width: width,
    }, textStyle: {
        fontSize: fontadapeSize(15),
        color: '#FFFFFF'
    }, imageButton: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    }, cancelButton: {
        flex: 1,
        backgroundColor: PAGECOLOR.COLORA2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:adapeSize(3),
        marginLeft:adapeSize(10),
    }, canceledButton: {
        flex: 1,
        backgroundColor: PAGECOLOR.COLORA1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:adapeSize(3),
        marginLeft:adapeSize(10),
    }, controlButton: {
        flex: 1,
        backgroundColor: PAGECOLOR.COLORB0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:adapeSize(3),
        marginLeft:adapeSize(10),
    }, buttontextStyle: {
        fontSize: fontadapeSize(12),
        color: 'white',
        padding:adapeSize(5),
    }
});


