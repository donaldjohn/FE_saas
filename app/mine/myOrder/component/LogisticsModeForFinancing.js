/**
 * Created by hanmeng on 2018/1/8.
 */
import React, {PureComponent} from 'react'

import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image
} from  'react-native'

const {width, height} = Dimensions.get('window');
import * as fontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import TagSelectView from "./TagSelectView";
import ChooseModal from "./ChooseModal";
import BaseComponent from "../../../component/BaseComponent";
import SelectDestination from "../orderwuliu/SelectDestination";
const Pixel = new PixelUtil();

export default class LogisticsModeForFinancing extends BaseComponent {

    /**
     *  初始化
     * @param props
     **/
    constructor(props) {
        super(props);
        this.tagSelect = [{
            name: '使用物流',
            check: false,
            id: 0
        }, {
            name: '车已在店',
            check: false,
            id: 1
        }];
        this.state = {
            //useLogistics: 'al'
            ordersTrans: this.props.ordersTrans
        }
    }

    /**
     *  页面 Receive
     * @param nextProps new Props
     **/
    componentWillReceiveProps(nextProps) {

    }

    onTagClick = (dt, index) => {
        //单选
        /*        this.tagSelect.map((data) => {
         data.check = false;
         });
         this.tagSelect[index].check = !this.tagSelect[index].check;
         this.tagRef.refreshData(this.tagSelect);*/
        if (index === 0) {
            // 使用物流  跳转到选择目的地页
            this.toNextPage({
                name: 'SelectDestination',
                component: SelectDestination,
                params: {
                    orderId: this.props.orderDetail.id,
                    vType: this.props.orderDetail.orders_item_data[0].car_data.v_type,
                    callBack: this.updateOrdersTrans,
                    maxLoanmny: this.props.financeInfo.max_loanmny  // 订单融资最大可贷额度
                }

            });
        } else {
            // 车已在店
            this.refs.chooseModal.changeShowType(true, '取消', '确定', '选择车已在店需要风控人员后台审核确认，是否继续？',
                null);
        }
    };

    /**
     *    运单状态映射
     **/
    transStateMapping = (ordersTrans) => {
        switch (ordersTrans.status) {
            case 0:    // 0 是前端自己定义的状态 说明未生成运单
                return {'state': 0, 'waybillState': ''};
            case 1: //1 =>'填写完',
            case 100: // 100 =>'支付运单中',
            case 101: // 101 =>'支付运单失败',
            case 200: // 200 =>'支付运单成功生成运单失败',
                return {'state': 1, 'waybillState': '运费' + ordersTrans.total_amount + '元'};
            case 2:   // 2 =>'支付运单成功生成运单',
                return {'state': 2, 'waybillState': '已支付'};
            case 3:  //  3 =>'发运',
                return {'state': 3, 'waybillState': '已支付'};
            case 4:  // 4 =>'到店',
            case 5:  // 5 =>'到库',
                return {'state': 4, 'waybillState': '已交车'};
            case 6:
            case 7:
            case 8:
            case 9:
            case 11:
            case 10:
            case 12:
            case 13:
            case 14:
            case 15:
        }
    };

    /**
     *
     **/
    updateOrdersTrans = (newOrdersTrans) => {
        newOrdersTrans.status = newOrdersTrans.trans_status;
        this.props.updateOrdersTrans(newOrdersTrans);
        //this.ordersTrans = newOrdersTrans;
        this.setState({
            ordersTrans: newOrdersTrans
        });
    };

    /**
     *  render
     **/
    render() {
        let views = '';
        let alreadyChoose = this.transStateMapping(this.state.ordersTrans);  // 是否已经生成运单并支付完成
        if (alreadyChoose < 1) {  // 未选择
            views =
                <View style={{
                    height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center',
                    paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
                }}>
                    <Text >交车方式</Text>
                    <View style={{flex: 1}}/>
                    <TagSelectView
                        buttonWidth={Pixel.getPixel(80)}
                        textSize={Pixel.getPixel(15)}
                        paddingHorizontal={Pixel.getPixel(8)}
                        ref={(ref) => {
                            this.tagRef = ref;
                        }} onTagClick={this.onTagClick} cellData={this.tagSelect}/>
                </View>
        } else if (alreadyChoose > 0) {  // 选择物流
            views =
                <TouchableOpacity
                    onPress={() => {
                        // TODO 跳转到填写运单
                    }}>
                    <View style={{
                        height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center',
                        paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
                    }}>
                        <Text >填写运单</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{color: fontAndColor.COLORB0}}>{this.state.waybillState}</Text>
                        <Image source={require('../../../../images/mainImage/celljiantou.png')}/>
                    </View>
                </TouchableOpacity>
        } else {  // 选择 车已在店
            views =
                <View>
                    <View style={{
                        height: Pixel.getPixel(44), flexDirection: 'row', alignItems: 'center',
                        paddingLeft: Pixel.getPixel(15), paddingRight: Pixel.getPixel(15)
                    }}>
                        <Text >车已在店</Text>
                        <View style={{flex: 1}}/>
                        <Text style={{color: fontAndColor.COLORB2}}>审核中</Text>
                    </View>
                    <View style={styles.separatedLine}/>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                    }}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-start',margin: Pixel.getPixel(15)}}>
                            <Text style={{color: fontAndColor.COLORA1,
                                fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>审核地址</Text>
                            <View style={{flex: 1}}/>
                            <Text style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                textAlign: 'right', width: Pixel.getPixel(250)}}>
                                审核中审核中审核中审核中审核中审核中审核中审核中审核中审核中审核中
                            </Text>
                        </View>
                    </View>
                </View>
        }
        return (
            <View style={{backgroundColor: '#ffffff'}}>
                {views}
                <ChooseModal ref='chooseModal' title='提示'
                             negativeButtonStyle={styles.negativeButtonStyle}
                             negativeTextStyle={styles.negativeTextStyle} negativeText='取消'
                             positiveButtonStyle={styles.positiveButtonStyle}
                             positiveTextStyle={styles.positiveTextStyle} positiveText='确定'
                             buttonsMargin={Pixel.getPixel(20)}
                             positiveOperation={() => {
                             }}
                             content=''/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    positiveTextStyle: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: '#ffffff'
    },
    positiveButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Pixel.getPixel(15),
        backgroundColor: fontAndColor.COLORB0,
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    },
    negativeTextStyle: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB0
    },
    negativeButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    }
});