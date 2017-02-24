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
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import BaseComponent from '../../component/BaseComponent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from '../../finance/repayment/component/RepaymenyTabBar';
import NavigationView from '../../component/AllNavigationView';
import NoneSineScene from '../contractManage/NoneSineScene';
import SingleSignManageScene from '../contractManage/SingleSignManageScene';
import CompleteSignScene from '../contractManage/CompleteSignScene';
export  default class SignContractScene extends BaseComponent {

    initFinish = () => {
    }

    render() {

        return (
        <View style={{width:width,height:height}}>
            <NavigationView
                title="合同管理"
                backIconClick={this.backPage}
            />
            <ScrollableTabView
                style={{marginTop: Pixel.getTitlePixel(64),flex:1}}
                initialPage={0}
                renderTabBar={() => <RepaymenyTabBar tabName={["未签署", "单方签署", "已签署"]}/>}
            >
                <NoneSineScene tabLabel="ios-paper"  navigator={this.props.navigator}/>

                <SingleSignManageScene tabLabel="ios-people" navigator={this.props.navigator}/>

                <CompleteSignScene tabLabel="ios-chatboxes" navigator={this.props.navigator}/>
            </ScrollableTabView>
        </View>
        );
    }
}
const styles = StyleSheet.create({

    image: {

        width: 43,
        height: 43,
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'red',
    }
})