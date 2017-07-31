/**
 * Created by hanmeng on 2017/5/8.
 * 采购订单
 */
import React, {Component, PropTypes} from 'react'
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Dimensions
} from  'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../component/BaseComponent";
import * as fontAndColor from '../constant/fontAndColor';
import NavigatorView from '../component/AllNavigationView';
import PixelUtil from '../utils/PixelUtil'
import * as AppUrls from "../constant/appUrls";
import {request} from "../utils/RequestUtil";
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";
import DailyReminderScene from "./dailyReminder/DailyReminderScene";

var Pixel = new PixelUtil();

export default class MessageList extends BaseComponent {

    /**
     *
     **/
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            renderPlaceholderOnly: 'blank'
        };
    }

    /**
     *
     **/
    initFinish = () => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            dataSource: ds.cloneWithRows(['0', '1', '2', '3', '4', '5']),
            renderPlaceholderOnly: 'success'
        });
        //this.loadData();
    };

    /**
     *
     **/
    loadData = () => {

    };

    /**
     *
     **/
    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            // 加载中....
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title='消息通知' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <NavigatorView title='消息通知' backIconClick={this.backPage}/>
                <ListView style={{backgroundColor: fontAndColor.COLORA3, marginTop: Pixel.getTitlePixel(80)}}
                          dataSource={this.state.dataSource}
                          removeClippedSubviews={false}
                          renderRow={this._renderRow}
                          enableEmptySections={true}
                          renderSeparator={this._renderSeperator}/>
            </View>);
        }

    }

    /**
     *
     **/
    _renderSeperator = (sectionID: number, rowID: number, adjacentRowHighlighted: bool) => {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(1)}}/>
        )
    }

    /**
     *
     **/
    _renderRow = (rowData, selectionID, rowID) => {
        if (rowData == '0') {
            return (<View style={styles.listItem}>
                <Text>待办事项</Text>
            </View>)
        } else if (rowData == '1') {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.toNextPage({
                            name: 'DailyReminderScene',
                            component: DailyReminderScene,
                            params: {

                            }
                        });
                    }}
                >
                    <View style={styles.listItem}>
                        <Text>每日提醒</Text>
                    </View>
                </TouchableOpacity>
            )
        } else if (rowData == '2') {
            return (<View style={styles.listItem}>
                <Text>互动消息</Text>
            </View>)
        } else if (rowData == '3') {
            return (<View style={styles.listItem}>
                <Text>系统消息</Text>
            </View>)
        } else if (rowData == '4') {
            return (<View style={styles.listItem}>
                <Text>车市头条</Text>
            </View>)
        } else if (rowData == '5') {
            return (<View style={styles.listItem}>
                <Text>系统消息</Text>
            </View>)
        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Pixel.getPixel(0),   //设置listView 顶在最上面
        backgroundColor: fontAndColor.COLORA3,
    },
    separatedLine: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15),
        height: 1,
        backgroundColor: fontAndColor.COLORA4
    },
    listItem: {
        height: Pixel.getPixel(75),
        backgroundColor: '#ffffff',
    }
});