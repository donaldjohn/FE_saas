/**
 * Created by hanmeng on 2017/5/8.
 * 订单类型选择页
 */
import  React, {Component, PropTypes} from  'react'
import  {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    ListView,
    Image
} from  'react-native'

import * as fontAndColor from '../../constant/fontAndColor';
import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
const cellJianTou = require('../../../images/mainImage/celljiantou.png');
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import {request} from '../../utils/RequestUtil';
import MyOrderItem from "./component/MyOrderItem";
import MyOrderListScene from "./MyOrderListScene";
import MyOrderCarIDItem from "./component/MyOrderCarIDItem";
import MyOrderCarIDScene from "./MyOrderCarIDScene";
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
export default class MyOrderChangeDataScene extends BaseComponent {
    initFinish = () => {

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(this.props.data.models[this.props.index].car_items),
            renderPlaceholderOnly: 'success'
        });
    }
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            dataSource: {},
            renderPlaceholderOnly: 'blank',
            isRefreshing: false,

        };
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>

                {this.loadView()}
                <NavigatorView title='车架号列表' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <NavigatorView title='车架号列表' backIconClick={this.backPage}/>
                <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(74)}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          enableEmptySections={true}
                          renderSeparator={this._renderSeperator}
                />

            </View>);
        }
    }

    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(10)}}/>
        )
    }


    // 每一行中的数据
    _renderRow = (rowData, selectionID, rowID) => {
        return (
          <MyOrderCarIDItem data={rowData} callBack={()=>{
              this.toNextPage({
                  name:'MyOrderCarIDScene',
                  component:MyOrderCarIDScene,
                  params:{order_id:this.props.order_id,data:this.props.data,index:this.props.index,id:rowID,callBack:()=>{
                      this.props.callBack();
                      this.backPage();
                      }}
              })
          }}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3
    },
    listStyle: {
        marginTop: Pixel.getPixel(15)
    },
    itemsView: {
        marginTop: Pixel.getPixel(80),
        height: Pixel.getPixel(121),
        backgroundColor: 'white'
    },
    itemView: {
        height: Pixel.getPixel(40)
    },
    rowView: {
        height: Pixel.getPixel(44),
        alignItems: 'center',
        flexDirection: 'row'
    },
    rowLeftTitle: {
        marginLeft: Pixel.getPixel(55),
        flex: 1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORA2
    },
    rowLeft: {
        marginLeft: Pixel.getPixel(15),
        flex: 1,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
    rowRightTitle: {
        marginRight: Pixel.getPixel(10),
        color: fontAndColor.COLORA2,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    },
    image: {
        marginRight: Pixel.getPixel(15)
    }

});