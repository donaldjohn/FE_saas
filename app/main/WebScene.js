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
    InteractionManager,
    WebView,
    BackAndroid,
    StatusBar
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../utils/PixelUtil';

const Pixel = new PixelUtil();
import NavigationView from '../component/AllNavigationView';
import * as fontAndColor from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';

let oldUrl = '';
import WebViewTitle from '../mine/accountManage/component/WebViewTitle';
import CarInfoScene from '../carSource/CarInfoScene';
import MainPage from './MainPage'
import SuishoujiIndicativeScene from './SuishoujiIndicativeScene';
import  ZNSharedView from '../component/ZNSharedView';
import {request} from "../utils/RequestUtil";
import * as AppUrls from "../constant/appUrls";

export default class WebScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: true,
            StatusBarStyle:'default'
        };
    }

    componentDidMount() {
        oldUrl = this.props.webUrl;
        try {
            BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        } catch (e) {

        } finally {
            //InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
            //});
        }
    }

    componentWillMount() {
        this.setState({
            StatusBarStyle:'default'
        });
    }

    componentWillUnmount(){
        this.setState({
            StatusBarStyle:'light-content'
        });
    }



    handleBack = () => {
        this.props.showModal(false);
        if (oldUrl == this.props.webUrl) {
            this.backPage();
        } else {
            this.refs.www.goBack();
        }
        return true;
    }



    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <StatusBar barStyle={this.state.StatusBarStyle}/>
                <WebViewTitle ref="webviewtitle"/>
                <WebView
                    ref="www"
                    style={{
                        width: width, height: height, backgroundColor:
                        fontAndColor.COLORA3
                    }}
                    source={{uri: this.props.webUrl, method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                    onLoadStart={() => {
                        this.refs.webviewtitle.firstProgress();
                    }}
                    onLoadEnd={() => {
                        this.refs.webviewtitle.lastProgress();
                    }}
                    onMessage={(event)=>{this.onMessage(event.nativeEvent.data)}}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                />
                <ZNSharedView ref={(ref)=>{this.sharedView=ref}} sharedFaultAction={(msg)=>{this.props.showToast(msg)}}/>
                <NavigationView
                    titleStyle={{color:fontAndColor.COLORA0}}
                    wrapStyle={{backgroundColor:'white'}}
                    title={this.props.title ? this.props.title : '公告'}
                    backIconClick={() => {
                        this.props.showModal(false);
                        if(this.props.title === '随手记'){
                            this.backPage();
                            return;
                        }
                        if (oldUrl == this.props.webUrl || this.props.webUrl === '' || oldUrl.indexOf('http')==-1) {
                            this.backPage();
                        } else {
                            this.refs.www.goBack();
                        }
                    }}
                />
            </View>
        );
    }

    onNavigationStateChange = (navState) => {

        oldUrl = navState.url;
        let urls = oldUrl.split('?');
        console.log(navState);
        if (urls[0] == 'http://dycd.tocarsource.com/') {
            let id = urls[1].replace('id=', '');
            let navigatorParams = {
                name: "CarInfoScene",
                component: CarInfoScene,
                params: {
                    carID: id,
                    from: 'webview',
                    isPoPo:true,
                }
            };
            let mainParams = {
                name: "MainPage",
                component: MainPage,
                params: {}
            };
            this.loginPage(navigatorParams, mainParams)
        }

        if (oldUrl.indexOf('https://gatewayapi.dycd.com')==0) {
            this.backPage();
            return;
            if(oldUrl.indexOf('message')>0){
                let msg = oldUrl.split('=');
                const navigator = this.props.navigator;
                if (navigator) {
                    navigator.replace({
                        component: SuishoujiIndicativeScene,
                        name: 'SuishoujiIndicativeScene',
                        params: {
                            type: 1,
                            status: 0,
                            msg:msg[msg.length-1]

                        }

                    });
                }
            }
            if(oldUrl.indexOf('params')>0){

                let msg = oldUrl.split('=');
                const navigator = this.props.navigator;
                if (navigator) {
                    navigator.replace({
                        component: SuishoujiIndicativeScene,
                        name: 'SuishoujiIndicativeScene',
                        params: {
                            type: 1,
                            status: 0,
                            msg:msg[msg.length-1]

                        }

                    });
                }

            }
        }

    }

    onMessage=(data)=>{
        if(data == 1){
            this.getSharedData();
        }
    }

    loginPage = (mProps, mainParams) => {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.immediatelyResetRouteStack([{...mainParams}, {
                ...mProps
            }])
        }
    }


    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height, backgroundColor: fontAndColor.COLORA3}}>
                <NavigationView
                    title="公告"
                    backIconClick={() => {
                        this.props.showModal(false);
                        this.backPage();
                    }}
                />
            </View>
        );
    }


    // 获取分享数据
    getSharedData=()=>{
        this.refs.webviewtitle.lastProgress();

        request(AppUrls.GET_ACTIVITY_SHARED,'POST',{
          id:1
      }).then((response)=>{

          let parameter = oldUrl.split('?')[1];

          let url = AppUrls.SHARE_USER_ACTIVITY_INVITE+'?'+parameter;

          this.props.showModal(false);
          let data = response.mjson.data;
            this.sharedView.isVisible(true,{
                title:data.enjoy_title,
                content:data.enjoy_body,
                image:data.icon,
                url:url,
            });


        },(error)=>{
            this.props.showModal(false);
            this.props.showToast('获取分享数据失败');
        })
    }
}



const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(10),

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})