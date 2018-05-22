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
    PixelRatio,
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import RepaymenyTabBar from './SCBZJTabBar';
import NavigationView from '../../component/AllNavigationView';
import SCBJZChildScene from '../shuchebaozhengjin/SCBJZChildScene';
import {request} from '../../utils/RequestUtil';
import * as Urls from '../../constant/appUrls';
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
var onePT = 1 / PixelRatio.get(); //一个像素
export  default class SCBZJScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: 'blank',
            details:'open'
        };
    }

    initFinish = () => {
        this.getData();
    }

    getData = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    enter_base_ids: datas.company_base_id,
                };
                request(Urls.GET_USER_ACCOUNT_DETAIL, 'Post', maps)
                    .then((response) => {
                        if (response.mjson.data != null) {
                        }
                        this.setState({renderPlaceholderOnly: 'success'});
                    }, (error) => {
                        this.setState({renderPlaceholderOnly: 'success'});
                    });
            } else {
                this.setState({
                    renderPlaceholderOnly: 'error',
                });
            }
        })
    }

    /**
     * from @zhaojian
     *
     * 加载页面
     **/
    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{width:width,height:height,backgroundColor: fontAndColor.COLORA3,flexDirection:'column'}}>
                <View style={{flexDirection:'row',marginTop: Pixel.getTitlePixel(64),height:Pixel.getPixel(45),paddingLeft:Pixel.getPixel(15),paddingRight:Pixel.getPixel(15),backgroundColor:'#ffffff',alignItems:'center'}}>
                    <Text style={{fontSize:Pixel.getFontPixel(14),color:'#333333'}}>保证金总额: </Text>
                    <Text style={{fontSize:Pixel.getFontPixel(12),color:'#FA5741',flex:1}}>245.75元</Text>
                    <TouchableOpacity  onPress={()=>{
                        if(this.state.details =='open'){
                            this.setState({details: 'close'});
                        }else {
                            this.setState({details: 'open'});
                        }
                    }}>
                        <View style={{backgroundColor:'#05C5C2',width:Pixel.getPixel(90),borderRadius:Pixel.getPixel(9),height:Pixel.getPixel(19),flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                            <Text style={{fontSize:Pixel.getFontPixel(12),color:'#010101'}}>
                            { this.state.details =='open'  ?'收起详情 ':'展开详情 '}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{width:width,height:onePT,backgroundColor:'#D8D8D8'}}/>
                {
                    this.state.details =='open' && <Text style={{color:'#999999',fontSize:Pixel.getFontPixel(12),backgroundColor:'#ffffff'
                        ,paddingTop:Pixel.getPixel(11),paddingBottom:Pixel.getPixel(11),paddingLeft:Pixel.getPixel(15),paddingRight:Pixel.getPixel(15)}}>
                        保证金总额=赎车保证金+保证金可用金额
                    </Text>
                }
                {
                    this.state.details =='open' && <View style={{backgroundColor:'#ffffff',width:width,alignItems:'center',justifyContent:'center'}}>
                        <Image resizeMode={'cover'} source={require('../../../images/xu_line.png')} style={{width:width-Pixel.getPixel(30),height:onePT}} />
                    </View>
                }
                {
                    this.state.details =='open' && <View style={{flexDirection:'row',height:Pixel.getPixel(54),backgroundColor:'#ffffff',marginBottom:Pixel.getPixel(10),alignItems:'center'}}>
                        <Text style={{color:'#000000',fontSize:Pixel.getFontPixel(12),flex:1,textAlign:'center'}}>{'赎车保证金 \n245.75元'}</Text>
                        <View style={{width:onePT,height:Pixel.getPixel(25),backgroundColor:'#D8D8D8'}}/>
                        <Text style={{color:'#000000',fontSize:Pixel.getFontPixel(12),flex:1,textAlign:'center'}}>{'保证金可用金额 \n89.96元'}</Text>
                    </View>
                }
                <ScrollableTabView
                    style={{flex:1}}
                    initialPage={0}
                    locked={true}
                    scrollWithoutAnimation={true}
                    renderTabBar={() => <RepaymenyTabBar tabName={["未支付", "已支付"]}/>}>
                    <SCBJZChildScene tabLabel="ios-paper1" opt_user_id={'11383'} navigator={this.props.navigator} page={'未支付'}/>
                    <SCBJZChildScene tabLabel="ios-paper2" opt_user_id={'11383'} navigator={this.props.navigator} page={'已支付'}/>
                </ScrollableTabView>
                <NavigationView title="合同管理" backIconClick={this.backPage}/>
            </View>
        );
    }

    /**
     * from @zhaojian
     *
     * 加载完成
     **/
    componentDidUpdate() {
        if (this.state.renderPlaceholderOnly == 'success') {

        }
    }

    /**
     * from @zhaojian
     *
     * 页面加载完成前的loading
     **/
    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView title="合同管理" backIconClick={this.backPage}/>
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