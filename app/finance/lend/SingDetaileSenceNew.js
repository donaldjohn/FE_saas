/**
 * Created by lhc on 2017/2/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
} from 'react-native';

import {
    CommnetListItem,
    LendCarItemCell,
    CommenButtonNew,
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
import {ModifyBorrowing, LendSuccessAlert, ModalAlert} from './component/ModelComponent'
import  OrderCarDetailScene from './OrderCarDetailScene'
import  AllNavigationView from '../../component/AllNavigationView';
import BaseComponent from '../../component/BaseComponent';
import {request} from '../../utils/RequestUtil'
import *as apis from '../../constant/appUrls'
import ContractInfoScene from './ContractInfoScene';
import RecognizedGains from '../../login/RecognizedGains';


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
            api: apis.GET_APPLY_INFO,
            loan_code: this.props.loanNumber
        };
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    this.tempjson = response.mjson.data
                    let carNum = parseInt( this.tempjson.car_count)
                    controlCode.stateCode =  this.tempjson.status
                    controlCode.extendCode = this.tempjson.is_extend;
                    controlCode.lendType = this.tempjson.type;
                    controlCode.minLend = changeToMillion(this.tempjson.min_loanmny);
                    controlCode.loan_code = this.tempjson.loan_code;
                    controlCode.is_microchinese_contract = this.tempjson.is_microchinese_contract;
                    let Maxmum = parseFloat(this.tempjson.max_loanmny) + parseFloat(this.tempjson.payment_loanmny)
                    controlCode.maxLend = changeToMillion(Maxmum)
                    if (carNum > 0) {
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
            api: apis.GET_APPLY_CARLIST,
            loan_code: this.props.loanNumber
        }
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    let tempCarJson = response.mjson.data.list
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
                tempCarDate.push(
                    {
                        auto_id: item.auto_id,
                        model_name: item.model_name,
                        state: item.status_str,
                        order: item.frame_number,
                        price: item.loan_mny,//放款额
                        plate_number: item.plate_number,//车牌号
                        loan_number: item.loan_number,
                    }
                )

                tempCarDate.push(
                    {
                        auto_id: item.auto_id,
                        model_name: item.model_name,
                        state: item.status_str,
                        order: item.frame_number,
                        price: item.loan_mny,//放款额
                        plate_number: item.plate_number,//车牌号
                        loan_number: item.loan_number,
                    }
                )
            })
            dataSource['section2'] = tempCarDate;
        }
        return dataSource;
    }


    getControlTitleblob = (stateCode, extendCode, is_microchinese_contract) => {

        if (stateCode !== '' && extendCode !== '') {
            let tempTitle = []
            if (stateCode == '8') {
                tempTitle = ['资金方签署中']
            } else if (stateCode == '1') {
                tempTitle = ['取消借款']
            } else if (stateCode == '2') {
                tempTitle = ['签署合同', '取消借款']
            }
            else if (parseInt(stateCode) > 2 && stateCode != '5') {
                tempTitle = ['查看合同']
            } else if (stateCode == '5') {
                if (parseInt(extendCode) == 1) {
                    tempTitle = ['查看合同']
                } else {
                    tempTitle = ['查看合同']
                }
            }

            if (is_microchinese_contract == 1) {
                tempTitle = ['签署微单合同']
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
            case '签署微单合同':
                return styles.controlButton
            case '资金方签署中':
                return styles.cancelButton
            default:
                return styles.cancelButton
        }

    }

    //取消借款
    cancleLoad = (setModelVis) => {
        setModelVis(false);
        this.props.showModal(true);
        let maps = {
            api: apis.CANCEL_LOAN,
            loan_code: this.props.loanNumber
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

    controsButtonClick = (title) => {

        if (title === '取消借款') {
            this.canleAlert.setModelVisible(true);
        } else if (title === '签署合同') {
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
        } else if (title === '查看合同') {
            this.toNextPage({
                name: 'ContractInfoScene',
                component: ContractInfoScene,
                params: {loan_code: this.props.loanNumber, showButton: false}
            });
        } else if (title === '资金方签署中') {
            this.toNextPage({
                name: 'ContractInfoScene',
                component: ContractInfoScene,
                params: {loan_code: this.props.loanNumber, showButton: false}
            });
        } else if (title === "签署微单合同") {
            this.toNextPage({
                name: 'RecognizedGains', component: RecognizedGains, params: {
                    loan_code: controlCode.loan_code,
                    loan_number: '',
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

    //获取不同页面的颜色
    getStyle = (state) => {
        switch (state) {
            case '1':
                return PAGECOLOR.COLORB3
                break;
            case '2':
                return PAGECOLOR.COLORB0
                break;
            default:
                return PAGECOLOR.COLORA1
        }
    }

    getCarInfo = (rowData) => {
        let navigatorParams = {
            name: 'OrderCarDetailScene',
            component: OrderCarDetailScene,
            params: {
                auto_id: rowData.auto_id,
                type: '2'
            }
        }
        this.toNextPage(navigatorParams);
    }

    renderHeader = () => {
        return (
            <View style={{flexDirection:'column',backgroundColor:"#ffffff"}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{this.tempjson.loan_code}</Text>
                    <Text style={{}}>{this.tempjson.repayment_type}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'column',flex:1,alignItems:"center"}}>
                        <Text>{this.tempjson.payment_loanmny_str}</Text>
                        <Text>借款金额</Text>
                    </View>
                    <View style={{flexDirection:'column',flex:1,alignItems:"center"}}>
                        <Text> {this.tempjson.payment_rate_str}</Text>
                        <Text>综合费率</Text>
                    </View>
                    <View style={{flexDirection:'column',flex:1,alignItems:"center"}}>
                        <Text>{this.tempjson.loanperiodstr}</Text>
                        <Text>借款期限</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>申请日期</Text>
                    <Text>{this.tempjson.createtimestr}</Text>
                </View>
                <Text style={{backgroundColor:'#d8d8d8'}}>{'xxxxxxxxxxx'}</Text>
            </View>
        )
    }

    renderRow = (rowData, sectionID, rowId, highlightRow) => {
        // if (sectionID === 'section2') {
        //     return <LendCarItemCell onPress={()=>{this.getCarInfo(rowData)}} carName={rowData.model_name}
        //                             orderNum={rowData.loan_number} orderState={rowData.state} price={rowData.price}/>
        // }

        let tempButtons = [];
        let tempButtonTitles = this.getControlTitleblob(controlCode.stateCode, controlCode.extendCode, controlCode.is_microchinese_contract);
        tempButtonTitles.map((item) => {
                tempButtons.push(<CommenButtonNew buttonStyle={this.getButtonStyleWithTitle(item)}
                                               textStyle={styles.buttontextStyle}
                                               onPress={()=>{this.controsButtonClick(item)}}
                                               title={item}
                                               key={item}
                />)
            }
        )
        return <View style={{flexDirection:'column',backgroundColor:'#ffffff'}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{rowData.model_name}</Text>
                    <Text>{rowData.auto_id}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{rowData.loan_number}</Text>
                    <Text>{'订单状态'}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{'合同放款额度'}</Text>
                    <Text>{rowData.price}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{'放款日期'}</Text>
                    <Text>{rowData.loan_number}</Text>
                </View>
                <View style={[{flexDirection: 'row',justifyContent: 'flex-end',alignItems: 'center',paddingTop:10,paddingBottom:10}]}>
                        {tempButtons}
                </View>
        </View>
    }

    renderSectionHeader = (sectionData, sectionID) => {
        return (
            <View style={[sectionID !== 'section1' && {backgroundColor:PAGECOLOR.COLORA3, height: 0}]}></View>
        )
    }

    renderSeparator = (sectionID, rowId, adjacentRowHighlighted) => {
        return (
            <View key={`${sectionID}-${rowId}`}
                  style={{height:10, backgroundColor:PAGECOLOR.COLORA3}}></View>
        )
    }

    render() {
        if (this.state.renderPlaceholderOnly !== STATECODE.loadSuccess) {
            return (
                <View style={styles.container}>
                    {this.loadView()}
                    <AllNavigationView title='借款详情' backIconClick={()=> {
                        this.backPage();
                    }}/>
                </View>);
        }

        // let tempButtons = [];
        // let tempButtonTitles = this.getControlTitleblob(controlCode.stateCode, controlCode.extendCode, controlCode.is_microchinese_contract);
        // tempButtonTitles.map((item) => {
        //         tempButtons.push(<CommenButtonNew buttonStyle={this.getButtonStyleWithTitle(item)}
        //                                        textStyle={styles.buttontextStyle}
        //                                        onPress={()=>{this.controsButtonClick(item)}}
        //                                        title={item}
        //                                        key={item}
        //         />)
        //     }
        // )

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
                />
                {/*<View*/}
                    {/*style={[commnetStyle.bottomWarp,{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}]}>*/}
                    {/*{tempButtons}*/}
                {/*</View>*/}

                <ModifyBorrowing ref={(model)=>{this.modifyb=model}}
                                 onchangeText={(text)=>{controlCode.changeMoney=text}}
                                 minLend={controlCode.minLend}
                                 maxLend={controlCode.maxLend}
                                 confimClick={this.modifyLengNum}
                                 cancleClick={(callback)=>{callback(false)}}/>
                <LendSuccessAlert ref={(lend)=>{this.change=lend}} confimClick={()=>{
                    this.props.backRefresh();
                    this.backPage()}} title='修改成功' subtitle='恭喜您修改借款成功'/>
                <ModalAlert title='取消借款' subtitle="您确定要取消借款吗" ref={(cancle)=>{this.canleAlert=cancle}}
                            confimClick={this.cancleLoad} cancleClick={(setmodilVis)=>{setmodilVis(false)}}/>
                <LendSuccessAlert ref={(canleS)=>{this.successCancle=canleS}} confimClick={()=>{
                    this.props.backRefresh();
                    this.backPage()}} title='取消成功' subtitle='取消借款成功'/>
                <AllNavigationView
                    title="借款详情"
                    backIconClick={this.backPage}
                    renderRihtFootView={()=>{
                        if(controlCode.stateCode==='1'){
                            return (<ComentImageButton btnStyle={styles.imageButton} ImgSource={require('../../../images/financeImages/modif.png')}
                                                       onPress={()=>{this.modifyb.setModelVisible(true)}}/>)
                        }else {
                            return null;
                        }}}/>
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
        height: adapeSize(44),
        justifyContent: 'center',
        alignItems: 'center'
    }, canceledButton: {
        flex: 1,
        height: adapeSize(44),
        backgroundColor: PAGECOLOR.COLORA1,
        justifyContent: 'center',
        alignItems: 'center'
    }, controlButton: {
        flex: 1,
        height: adapeSize(44),
        backgroundColor: PAGECOLOR.COLORB0,
        justifyContent: 'center',
        alignItems: 'center'
    }, buttontextStyle: {
        fontSize: fontadapeSize(15),
        color: 'white',
    }
});


