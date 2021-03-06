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
import MyOrderListItem from './component/MyOrderListItem';
import {request} from '../../utils/RequestUtil';
import * as Urls from "../../constant/appUrls";
import MyOrderInfoScene from "./MyOrderInfoScene";
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');
export default class MyOrderListScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.page = 1;
        this.allPage = 1;
        this.allData = [];
        this.state = {
            dataSource: {},
            renderPlaceholderOnly: 'blank',
            isRefreshing: false
        };
    }
    initFinish = () => {
        this.getData();
    }

    getData=()=>{
        let maps = {
            business:this.props.business,
            company_id:global.companyBaseID,
            rows:5,
            page:this.page,
            status:this.props.status

        };
        request(Urls.ORDER_HOME_LISTS, 'Post', maps)
            .then((response) => {
                if(this.isNull(response.mjson.data)){
                    this.setState({
                        renderPlaceholderOnly: 'null'
                    });
                }else{
                    this.allData.push(...response.mjson.data.info_list);
                    this.allPage = Math.ceil(response.mjson.data.total/5);
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        dataSource: ds.cloneWithRows(this.allData),
                        renderPlaceholderOnly: 'success'
                    });
                }
                },
                (error) => {
                    if (error.mycode == '-2100045'||error.mycode == '-1') {
                        this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                    } else {
                        this.setState({renderPlaceholderOnly: 'error', isRefreshing: false});
                    }
                });
    }
    // 构造


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>

                {this.loadView()}
                <NavigatorView title={this.props.title} backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <NavigatorView title={this.props.title} backIconClick={this.backPage}/>
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
          <MyOrderListItem data={rowData} callBack={()=>{
              this.toNextPage({
                  name:'MyOrderInfoScene',
                  component:MyOrderInfoScene,
                  params:{order_id:rowData.order_id,from:this.props.business}
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