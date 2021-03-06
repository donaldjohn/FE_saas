/**
 * Created by dingyonggang on 2018/04/27/11.
 */

import React, {Component, PropTypes} from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    PixelRatio
} from "react-native";
import * as FontAndColor from "../../../constant/fontAndColor";
import SendMmsCountDown from "../../../login/component/SendMmsCountDown";
import PixelUtil from "../../../utils/PixelUtil";
import MyButton from "../../../component/MyButton";

let Pixel = new PixelUtil();
let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let onePT = 1 / PixelRatio.get(); //一个像素
import SText from './../../accountManage/zheshangAccount/component/SaasText'



export default class InformationInputItem extends Component{

    constructor(props){
        super(props)
        this.state = {
            value: this.props.value
        }
    }

    static defaultProps = {
        rightIcon:false,
        loading:false,
        editable:true,
        value:null,
        title:'标题',
        clearValue: false,
        maxLength: 100,
        textPlaceholder: null,
        keyboardType: 'default',
        separator:true,
        onChangeText:null,
        rightCallBack:null,

    };

    static propTypes = {

        rightIcon:PropTypes.bool,
        loading:PropTypes.bool,
        onChangeText:PropTypes.func,
        editable:PropTypes.bool,
        value:PropTypes.string,
        title:PropTypes.string,
        separator:PropTypes.bool,
        clearValue: PropTypes.bool,//清除输入框内容
        maxLength: PropTypes.number,//限制文本输入框最大的输入字符长度
        textPlaceholder: PropTypes.string,
        keyboardType: PropTypes.string,  //键盘类型：用来选择默认弹出键盘类型
        inputTextStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        viewStytle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        titleStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
        rightCallBack:PropTypes.func,
    }

    StartCountDown = () => {
        if (this.props.rightButton) {
            this.refs.sendMms.StartCountDown();
        } else {
            alert("您没有开启此功能哦")
        }
    }
    getInputTextValue() {
        return this.state.value;
    }

    componentWillReceiveProps(props) {
        // this.setState({
        //     value: props.value
        // });
    }

    setInputTextValue = (text) => {
        this.setState({
            value: text
        });
    }

    render(){
        return(

            <View style = {{backgroundColor:'white'}}>
                <TouchableOpacity
                    activeOpacity={this.props.rightIcon?.6:1}
                    onPress={()=>{
                        this.props.rightCallBack()
                    }}
                >
                    <View style = {[styles.container, this.props.separator?{borderBottomColor: FontAndColor.COLORA4}:{borderBottomColor:'white'}]}>
                        <SText
                            style={[styles.title, this.props.titleStyle]}
                        >{this.props.title}</SText>

                        {
                            !this.props.rightIcon?
                            <TextInput
                                ref="inputText"
                                underlineColorAndroid={"#00000000"}
                                keyboardType = {this.props.keyboardType}
                                placeholder = {this.props.textPlaceholder ===''?'请输入':'请输入'+this.props.textPlaceholder}
                                style={[styles.textInputStyle, this.props.inputTextStyle]}
                                maxLength={this.props.maxLength}
                                secureTextEntry={this.props.secureTextEntry}
                                value={this.state.value}
                                editable = {this.props.editable}
                                onChangeText={(text) => {
                                    let t = this.props.onChangeText(text)
                                    console.log(typeof t);
                                    if(typeof t === 'undefined'){
                                        this.setState({
                                            value: text
                                        });
                                    }else {
                                        this.setState({
                                            value: t
                                        });
                                    }

                                }}
                            />
                            :<SText
                                style={styles.annotation}
                            >{this.props.value}</SText>
                        }

                        {
                            this.props.rightIcon?
                                <Image source = {require('../../../../images/mainImage/celljiantou.png')}/>
                                :null
                        }
                        {
                            this.props.annotation?
                                <SText
                                    style={styles.annotation}
                                >{this.props.annotation}</SText> : null
                        }

                    </View>


                </TouchableOpacity>


            </View>

        )
    }
}


const styles = StyleSheet.create({

    title:{
        fontSize:15,
        color:FontAndColor.COLORA0,
        fontWeight:'200'
    },
    container: {
        marginHorizontal:15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: onePT,
        borderBottomColor: FontAndColor.COLORA4,
        height: Pixel.getPixel(50),

    },
    textInputStyle: {

        flex: 1,
        height: Pixel.getPixel(44),
        textAlign: 'right',
        alignSelf: 'center',
        fontSize: 14,
        paddingLeft: Pixel.getPixel(15),
        paddingTop: 0,
        paddingBottom: 0,
        color: FontAndColor.COLORA0,
    },

    annotation:{
        fontSize:15,
        color:FontAndColor.COLORA2,
        flex:1,
        textAlign:'right'
    }

});

