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
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
let movies = {};
import BaseComponent from '../../component/BaseComponent';
import NewRepaymentInfoTopItem from '../repayment/component/NewRepaymentInfoTopItem';
import MyButton from '../../component/MyButton';
import RepaymentInfoContentItem from '../repayment/component/RepaymentInfoContentItem';
import AllBottomItem from '../repayment/component/AllBottomItem';
import RepaymentCreditInfoScene from '../repayment/RepaymentCreditInfoScene';
import ServerMoneyListModal from '../../component/ServerMoneyListModal';
let moneyList = [];
let nameList = [];

import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
export  default class PurchaseRepaymentInfoPage extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        let mList = ['1', '2', '3', '4'];
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            source: ds.cloneWithRows(mList),
            renderPlaceholderOnly: 'blank'
        };
    }

    componentWillUnmount() {
        moneyList = [];
        nameList = [];
    }

    componentDidMount() {
        //InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
        //});
    }

    initFinish = () => {
        this.getData();
    }

    allRefresh = () => {
        moneyList = [];
        nameList = [];
        this.setState({renderPlaceholderOnly: 'loading'});
        this.getData();
    }

    getData = () => {
        let maps = {
            api: Urls.PREPAYMENT_REPAYMENT_DETAIL,
            loan_number: this.props.loan_number,
            loan_code:this.props.payment_number,
            type: '2',
        };
        request(Urls.FINANCE, 'Post', maps)
            .then((response) => {
                    movies = response.mjson.data.payment_info;
                    moneyList.push({name:'逾期情况',data:movies.payment_isoverdue_status});
                    moneyList.push({name: '利息总额', data: movies.test_coupon_info.interest_total});
                    moneyList.push({name: '已还利息', data: movies.test_coupon_info.interest});
                    moneyList.push({name: '待还利息', data: movies.test_coupon_info.interest_other});
                    moneyList.push({name: '使用优惠券数量', data: movies.test_coupon_info.coupon_info.coupon_number});
                    moneyList.push({name: '使用优惠券金额', data: movies.test_coupon_info.coupon_info.coupon_usable});
                    moneyList.push({name: '优惠券还息金额', data: movies.test_coupon_info.coupon_info.coupon_repayment});

                    nameList.push({name: '渠道名称', data: movies.test_coupon_info.qvdaoname});
                    nameList.push({name:'利息转换天数',data:movies.test_coupon_info.change_day});
                    nameList.push({name: '还款账户', data: movies.test_coupon_info.bank_info.repaymentaccount});
                    nameList.push({name: '开户行', data: movies.test_coupon_info.bank_info.bank});
                    nameList.push({name: '开户支行', data: movies.test_coupon_info.bank_info.branch});
                    nameList.push({name: '还款账号', data: movies.test_coupon_info.bank_info.repaymentnumber});
                    this.setState({renderPlaceholderOnly: 'success'});
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    buttonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: styles.parentStyle,
        childStyle: styles.childStyle,
        opacity: 0.9,
        content: '申请提前还款',
        mOnPress: () => {
            this.toNext();
            /* this.props.callBack({name:'RepaymentCreditInfoScene',component:RepaymentCreditInfoScene,params:{
                 loan_number:this.props.loan_number,from:'SingleRepaymentPage'
             }});*/
        }
    }

    toNext =() => {
        if(movies.apply_status.code == 0){
            this.props.callBack({name:'RepaymentCreditInfoScene',component:RepaymentCreditInfoScene,params:{
                loan_number:this.props.loan_number,payment_number:this.props.payment_number,from:'SingleRepaymentPage',
                loan_id:this.props.loan_id
            }});
        }else{
            this.props.showToast(movies.apply_status.msg);
        }
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <ListView
                    removeClippedSubviews={false}
                    style={{marginTop:Pixel.getPixel(5)}}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    showsVerticalScrollIndicator={false}
                />
                <MyButton {...this.buttonParams}/>
                <ServerMoneyListModal ref="servermoneylistmodal"/>
            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor:fontAndColor.COLORA3,alignItems: 'center'}}>
                {this.loadView()}
            </View>
        );
    }

    _renderRow = (movie, sectionId, rowId) => {
        if (rowId == 0) {
            return (
                <NewRepaymentInfoTopItem items={movies} loan_number={this.props.loan_number}/>
            )
        } else if(rowId == 1){
            return (
                <RepaymentInfoContentItem items={nameList}/>
            )
        }else if(rowId == 2){
            return (
                <RepaymentInfoContentItem items={moneyList} onPress={()=>{
                        this.refs.servermoneylistmodal.changeShowType(true,movies.list_fee);
                }}/>
            )
        }else{
            return (
                <AllBottomItem/>
            )
        }

    }

    _renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }

}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        height: Pixel.getPixel(10),
        backgroundColor: fontAndColor.COLORA3

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'},
    parentStyle: {
        height: Pixel.getPixel(44),
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: fontAndColor.COLORB0,
    },
    childStyle: {
        fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        color: '#ffffff',
    }
})