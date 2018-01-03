/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, TouchableOpacity, Dimensions, ScrollView, Image,
} from 'react-native';
import TagSelectView from '../component/TagSelectView';
import BaseComponent from '../../../component/BaseComponent';
import NavigatorView from '../../../component/AllNavigationView';
import InvoiceInfo from './InvoiceInfo';
import AccountModal from './AccountModal';

const agree_icon = require('../../../../images/agree_icon.png');
const disagree = require('../../../../images/disagree.png');
const collect_icon = require('../../../../images/collect_icon.png');
const depart_icon = require('../../../../images/depart_icon.png');
const imaginary_icon = require('../../../../images/imaginary_icon.png');
const {width} = Dimensions.get('window');
import * as FontAndColor from '../../../constant/fontAndColor';
import PixelUtil from '../../../utils/PixelUtil';
import MyButton from "../../../component/MyButton";

const cellJianTou = require('../../../../images/mainImage/celljiantou@2x.png');

const Pixel = new PixelUtil();
let tagViews = [{
    name: '大板',
    check: true,
    id: 0
}, {
    name: '救援',
    check: false,
    id: 1
}, {
    name: '代驾',
    check: false,
    id: 2
}];
let feeDatas = [{title: '物流费', value: '1000元'}, {title: '提验车费', value: '100元'}]
let accoutInfo = [{title: '联系人', value: '刘威'}, {title: '联系方式', value: '15911111111'}, {
    title: '收车地址',
    value: '湖北省武汉市武昌区'
}]
export default class FillWaybill extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            isAgree: true,
            renderPlaceholderOnly: false
        }
    }

    initFinish() {
        this.setState({
            renderPlaceholderOnly: 'success'
        });
    }

    _renderItem = () => {
        return (
            <View style={{flex: 1}}>
                <View style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    height: Pixel.getPixel(100),
                    backgroundColor: FontAndColor.COLORB0,
                    paddingTop: Pixel.getPixel(30),
                    marginBottom: Pixel.getPixel(10)
                }}>
                    <View style={{marginLeft: Pixel.getPixel(15)}}>
                        <View style={{flexDirection: 'row',alignItems:'center',marginBottom:Pixel.getPixel(7)}}>
                            <Image source={collect_icon} style={{marginRight: Pixel.getPixel(3),}}></Image>
                            <Text style={{color:'white',fontSize:Pixel.getPixel(16)}}>发车地</Text>
                        </View>
                        <Text style={{color:'white',fontSize:Pixel.getPixel(16)}}> 太原市锦江区</Text>
                    </View>
                    <View style={{alignItems:'center',marginBottom:Pixel.getPixel(5)}}>
                        <Text style={{color:'white',fontSize:Pixel.getPixel(16)}}>100公里</Text>
                        <Image source={imaginary_icon} style={{
                            width: Pixel.getPixel(120),
                            marginTop: Pixel.getPixel(5)
                        }}></Image>
                    </View>
                    <View style={{marginRight: Pixel.getPixel(15)}}>
                        <View style={{flexDirection: 'row',marginBottom:Pixel.getPixel(7),justifyContent:'flex-end',alignItems:'center'}}>
                            <Image source={depart_icon} style={{marginRight: Pixel.getPixel(3)}}></Image>

                            <Text style={{color:'white',fontSize:Pixel.getPixel(16)}}>发车地</Text>
                            <Image source={cellJianTou} style={{marginLeft: Pixel.getPixel(5)}}></Image>
                        </View>
                        <Text style={{color:'white',fontSize:Pixel.getPixel(16)}}> 太原市锦江区</Text>
                    </View>
                </View>

                <View style={{backgroundColor: 'white', marginBottom: Pixel.getPixel(10)}}>
                    <View style={styles.content_tag_wrap}>
                        <Text> 运输类型</Text>
                        <View style={{height:Pixel.getPixel(49),justifyContent: 'center',marginRight:Pixel.getPixel(5),}}>
                            <TagSelectView ref={(ref) => {
                                this.tagRef = ref;
                            }} onTagClick={this.onTagClick} cellData={tagViews}/>
                        </View>
                    </View>

                    {
                        feeDatas.map((data,index) => {
                            return (
                                <View key={index+'fee'} style={styles.content_title_text_wrap}>
                                    <Text style={styles.content_title_text}>{data.title}</Text>
                                    <Text style={styles.content_base_Right}>{data.value}</Text>
                                </View>
                            )
                        })
                    }

                </View>

                <View style={{
                    backgroundColor: 'white',
                    marginBottom: Pixel.getPixel(10),
                    paddingVertical: Pixel.getPixel(10)
                }}>
                    {
                        accoutInfo.map((data, index) => {
                            return (
                                <View key={index+'accoutInfo'} style={styles.content_title_text_wrap}>
                                    <Text style={styles.content_title_text}>{data.title}</Text>
                                    <Text style={styles.content_base_Right}>{data.value}</Text>
                                </View>
                            )
                        })
                    }

                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    this.toNextPage({
                            name: 'InvoiceInfo',
                            component: InvoiceInfo,
                            params: {}
                        }
                    );
                }}>
                    <View style={styles.content_base_wrap}>
                        <View style={styles.content_base_text_wrap}>
                            <Text style={styles.content_base_left}>发票</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.content_base_Right}>{'刘威车行'}</Text>
                                <Image source={cellJianTou} style={styles.image}></Image>
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    this.setState({
                        isAgree: !this.state.isAgree
                    });
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: Pixel.getPixel(10),
                        alignItems: 'center',
                        marginLeft: Pixel.getPixel(15)
                    }}>
                        <Image source={this.state.isAgree ? agree_icon : disagree}
                               style={{marginRight: Pixel.getPixel(3)}}></Image>
                        <Text style={{color: FontAndColor.COLORA1, fontSize: Pixel.getPixel(14)}}>我已同意签署物流协议</Text>
                    </View>
                </TouchableOpacity>
                <MyButton buttonType={MyButton.TEXTBUTTON}
                          content={'确定'}
                          parentStyle={styles.loginBtnStyle}
                          childStyle={styles.loginButtonTextStyle}
                          mOnPress={this.goPay}/>
            </View>
        );

    }
    backPg=()=>{
        this.refs.accountModal.changeShowType(true,
            '您确认选择放弃？' , '确认', '取消', () => {
                this.backPage();
            });
    }

    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return ( <View style={styles.container}>
                {this.loadView()}
                <NavigatorView title='填写运单' backIconClick={this.backPage}/>
            </View>);
        } else {
            return (<View style={styles.container}>
                <View style={{flex: 1, marginTop: Pixel.getTitlePixel(65),}}>
                    {
                        this._renderItem()
                    }
                </View>
                <AccountModal ref="accountModal"/>
                <NavigatorView title='填写运单' backIconClick={this.backPg}/>
            </View>)
        }

    }

    onTagClick = (dt, index) => {
        //单选
        tagViews.map((data) => {
            data.check = false;
        });

        tagViews[index].check = !tagViews[index].check;

        this.tagRef.refreshData(tagViews);
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: FontAndColor.all_background,
        flex: 1,
    },
    content_tag_wrap: {
        height: Pixel.getPixel(49),
        marginLeft:Pixel.getPixel(15),
        borderBottomWidth: Pixel.getPixel(1),
        borderColor: FontAndColor.COLORA4,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    content_title_wrap: {
        height: Pixel.getPixel(51),
        backgroundColor: FontAndColor.all_background,
    },
    content_title_text_wrap: {
        height:Pixel.getPixel(37),
        alignItems: 'center',
        flexDirection:'row'
    },
    content_title_text: {
        flex: 1,
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(14),
        color: FontAndColor.COLORA1,
    },
    content_base_wrap: {
        height: Pixel.getPixel(46),
        minHeight: Pixel.getPixel(46),
        backgroundColor: 'white'
    },
    content_base_text_wrap: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
    },
    content_base_left: {
        flex: 1,
        marginLeft: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(14),
        color: FontAndColor.COLORA1
    },
    content_base_Right: {
        marginRight: Pixel.getPixel(15),
        fontSize: Pixel.getFontPixel(14),
        color: FontAndColor.black,
        textAlign: 'right'
    },
    image: {
        marginRight: Pixel.getPixel(15),
    },
    topText: {
        color: 'white',
        fontSize: Pixel.getPixel(14)
    },
    loginBtnStyle: {
        height: Pixel.getPixel(44),
        width: width - Pixel.getPixel(30),
        backgroundColor: FontAndColor.COLORB0,
        marginTop: Pixel.getPixel(30),
        marginBottom: Pixel.getPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Pixel.getPixel(4),
        marginLeft: Pixel.getPixel(15)
    },
    loginButtonTextStyle: {
        color: FontAndColor.COLORA3,
        fontSize: Pixel.getFontPixel(FontAndColor.BUTTONFONT)
    },
});
