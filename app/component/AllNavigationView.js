/**
 * Created by zhengnan on 17/2/14.
 */

import React, {Component} from 'react';

import {

    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,

} from 'react-native';

import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();

export default class CarInfoNavigationView extends Component {


    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            navigationBackgroundColor:null,
            navigationTitleColor:null,

        };
      }

      setNavigationBackgroindColor=(color,titleColor)=>{

          this.setState({
              navigationBackgroundColor:color,
              navigationTitleColor:titleColor,
          });
      }

    render() {

        const {title, backIconClick, renderRihtFootView,wrapStyle,titleStyle} = this.props;

        return (
            <View style={[styles.navigation,wrapStyle,this.state.navigationBackgroundColor && {backgroundColor:this.state.navigationBackgroundColor}]}>
                <View style={styles.content}>
                    <TouchableOpacity style={{width: Pixel.getPixel(80), height: Pixel.getPixel(44),justifyContent:'center'}}
                                      onPress={backIconClick}>
                        {backIconClick && <Image style={styles.backIcon}  source={ wrapStyle? (wrapStyle.backgroundColor!='white'?require('../../images/mainImage/navigatorBack.png'):require('../../images/mainImage/fan.png')):require('../../images/mainImage/navigatorBack.png')}/>}
                    </TouchableOpacity>
                    <Text allowFontScaling={false}  style={[styles.titleText,titleStyle,this.state.navigationTitleColor && {color:this.state.navigationTitleColor}]}>{title}</Text>
                    <View style={styles.imageFoot}>
                        {
                            renderRihtFootView && renderRihtFootView()
                        }
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    content: {
        marginTop: Pixel.getTitlePixel(20),
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    backIcon: {

        marginLeft: Pixel.getPixel(12),
        height: Pixel.getPixel(20),
        width: Pixel.getPixel(20),
        // backgroundColor:'red'

    },

    titleText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
        textAlign: 'center',
        backgroundColor: 'transparent',
        marginLeft:Pixel.getPixel(12)
        // backgroundColor:'red'

    },
    imageFoot: {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor:'red',
        width: Pixel.getPixel(80),
        marginRight:Pixel.getPixel(15),


    },
    navigation: {
        height: Pixel.getTitlePixel(64),
        backgroundColor: fontAndColor.COLORB0,
        left: 0,
        right: 0,
        position: 'absolute',
        flex: 1
    }

})