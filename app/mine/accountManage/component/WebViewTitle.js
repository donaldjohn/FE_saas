/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
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
    Animated
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
export  default class WebViewTitle extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            fadeAnim: new Animated.Value(0),
        }
    }
    /**
     * from @zhaojian
     *
     * 添加采购贷车辆
     **/
    onPress = () => {
        Animated.timing(          // Uses easing functions
            this.state.fadeAnim,    // The value to drive
            {toValue: width-width/4},           // Configuration
        ).start(3000);                // Don't forget start!
    }

    render() {
        return (<Animated.View style={{width:this.state.fadeAnim,height:Pixel.getPixel(4),
        backgroundColor:'#1cef53',marginTop:Pixel.getTitlePixel(64)
        }}>

        </Animated.View>);
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