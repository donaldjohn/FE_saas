/**
 * Created by lhc on 2017/2/17.
 */




import React, {PropTypes, PureComponent,Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    Dimensions,

} from 'react-native';

//ok

import PixelUtil from '../utils/PixelUtil';
const Pixel = new PixelUtil();


export  class FEColor{

    COLORA0 = "#000000";
    COLORA1 = "#9e9e9e";
    COLORA2 = "#90a1b5";
    COLORA3 = "#f0eff5";
    COLORA4 = "#d8d8d8";
    COLORB0 = "#05c5c2";
    COLORB1 = "#3ac87e";
    COLORB2 = "#fa5741";
    COLORB3 = "#ffbd2f";
    COLORB4 = "#2f9bfa";
    COLORB5 = "#69dcda";

}
const FontColor =new FEColor();

export const {width, height} = Dimensions.get('window');


export const adapeSize = (size)=> {

    return Pixel.getPixel(size);
}

export const fontdapeSize = (size)=> {

    return Pixel.getFontPixel(size);
}

export const dateFormat = (date,fmt) => {
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export class LendItem extends PureComponent {


    static propTypes ={

        leftTitle:PropTypes.string.isRequired,
        rightTitle:PropTypes.string,
        leftStyle:Text.propTypes.style,
        rightStyle:Text.propTypes.style,
    }
    render() {


        const {leftStyle,rightStyle,leftTitle,rightTitle}=this.props;

        return (
            <View style={styles.itemView}>
                <Text style={[styles.itemLeftText,leftStyle]}>{leftTitle}</Text>
                <Text style={[styles.itemRightText,rightStyle]}>{rightTitle}</Text>
            </View>
        )
    }
}

export class CommenButton extends PureComponent {

    static propTypes = {


        onPress: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,

    }
    render() {

        const {buttonStyle, textStyle, onPress, title}=this.props;

        return (

            <TouchableOpacity style={buttonStyle} onPress={onPress} activeOpacity={0.8}>

                <Text style={textStyle}>{title}</Text>

            </TouchableOpacity>
        )
    }

}

export class LendCarItemCell extends PureComponent{



    static propTypes={

        carName:PropTypes.string,
        orderState:PropTypes.string,
        orderNum:PropTypes.string,
        price:PropTypes.string,
    }


    render(){

        const {carName,orderState,orderNum,price}=this.props;

        return(

            <View style={styles.lendCarItemCellWarp}>

                <View style={styles.lendCarItemCellInstWarp}>

                   <Text style={styles.lendCarItemCarName} numberOfLines={2}>{carName}</Text>
                   <Text style={styles.lendCarItemOrderState}>{orderState}</Text>

                </View>
                <View style={styles.lendCarItemCellInstWarp}>

                    <Text style={styles.lendCarItemOrderNum} numberOfLines={2}>{orderNum}</Text>
                    <Text style={styles.lendCarItemPrice}>{price}</Text>
                </View>

            </View>

        )
    }


}


export class LendInputItem extends PureComponent {


    static propTypes = {

        ...Text.prototype.style,
        title: PropTypes.string.isRequired,
        placeholder: PropTypes.string.isRequired,
        unit:PropTypes.string,
    }

    render() {



        const {title,placeholder,unit,unitStyle}=this.props;

        return (
            <View style={styles.itemView}>

                <Text style={styles.itemLeftText}>{title}</Text>
                <TextInput underlineColorAndroid={"#00000000"} style={styles.itemInput} placeholder={placeholder} keyboardType={'decimal-pad'}/>
                <Text style={[styles.itemPlacehodel,unitStyle]}>{unit}</Text>
            </View>
        )
    }
}
export class LendDatePike extends PureComponent {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            value:'',
        };
    }

    onPress=()=>{

        const {onPress}=this.props;
        onPress(this.changeText);
    }
    changeText=(value)=>{


        this.setState({
            value:value,
        })
    }

    static propTypes={

        lefTitle:PropTypes.string.isRequired,
        placeholder:PropTypes.string.isRequired,
        imageSouce:PropTypes.number.isRequired,
    }

    render() {

        const {lefTitle,placeholder,imageSouce,imageStyle}=this.props

        return (
            <TouchableOpacity
                onPress={this.onPress}
                style={[styles.itemView, {borderBottomColor: '#d8d8d8', borderBottomWidth: adapeSize(0.5)}] }>
                <Text  style={styles.itemLeftText}>{lefTitle}</Text>

                <TextInput underlineColorAndroid={"#00000000"} ref='dateInput' editable={false} style={[styles.itemInput, {marginRight: adapeSize(17)}]}
                           placeholder={placeholder} value={this.state.value} />
                <Image style={[styles.itemPikerDate,imageStyle]} source={imageSouce}/>
            </TouchableOpacity>
        )
    }
}

export class LendUseful extends PureComponent {


    render() {

        return (
            <View style={styles.itemUserful}>
                <Text style={styles.itemLeftText}>用款用途</Text>
                <TextInput style={styles.itemUserfulInput} placeholder={'请简要描述借款用途'} multiline={true}/>
            </View>
        )
    }
}
export class LendRate extends PureComponent {

    render() {
        return (
            <View style={styles.itemRate}>
                <Image style={styles.itemRateThumb} source={require('../../images/financeImages/lendRate.png')}/>
                <Text style={styles.itemRateText}> 借款费率</Text>
                <Text style={styles.itRateNum}>12.0%</Text>
            </View>
        )
    }

}

export class CommnetListItem extends PureComponent{



   render(){

       const {leftTitle,showValue,textStyle}=this.props;
       return (

           <View style={styles.commentListItemView}>
               <Text style={styles.commentListItemLeft}>{leftTitle}</Text>
               <Text style={[styles.commentListItemRight,textStyle]}>{showValue}</Text>
           </View>

       )
   }

}


export class CGDCarItem extends PureComponent{


    render(){

        return(
            <View style={styles.CGDCarWarp}>

                <Image source={require('../../images/financeImages/car.png')} style={styles.CGDCarImage}/>
                <View style={styles.CGDInstWarpTop}>
                    <Text style={styles.CGDInstTitle} numberOfLines={2}>[北京]奥迪7(进口) 2014款 FSI fuck 技术型</Text>
                    <View style={styles.CGDInstWarpBooton}>
                        <Text style={styles.CGDInserDate}>2014-6-12</Text>
                        <Text style={styles.CGDInsetPrice}>12W</Text>
                    </View>
                </View>
            </View>

        )
    }



}


const styles = StyleSheet.create({

    itemView: {

        flexDirection: 'row',
        height: adapeSize(44),
        alignItems: 'center',
        borderBottomColor: '#f0eff5',
        borderBottomWidth: adapeSize(0.5),
        backgroundColor: 'white',
        marginTop:adapeSize(0.5),

    },
    itemLeftText: {

        marginLeft: adapeSize(15),
        flex: 0.5,
        textAlign: 'left',
        fontSize: fontdapeSize(14),

    },
    itemRightText: {

        marginRight: adapeSize(15),
        flex: 1,
        textAlign: 'right',
        fontSize: fontdapeSize(14),


    },

    itemInput: {

        flex: 1,
        textAlign: 'right',
        fontSize: fontdapeSize(14),
        marginRight: adapeSize(22),
    },
    itemPlacehodel: {

        fontSize: fontdapeSize(14),
        marginRight: adapeSize(15),


    },
    itemPikerDate: {

        marginRight: adapeSize(8),
        width: adapeSize(45 / 2),
        height: adapeSize(45 / 2),
    },
    itemUserful: {

        flexDirection: 'row',
        height: adapeSize(350 / 2),
        alignItems: 'flex-start',
        borderBottomColor: '#d8d8d8',
        borderBottomWidth: adapeSize(0.5),
        backgroundColor: 'white',
        paddingTop: adapeSize(15),
    },
    itemUserfulInput: {

        marginRight: adapeSize(15),
        flex: 0.4,
        textAlign: 'left',
        fontSize: fontdapeSize(14),

    },

    itemRate: {

        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: adapeSize(11)

    },
    itemRateThumb: {

        width: adapeSize(35 / 2),
        height: adapeSize(35 / 2),
        marginLeft: adapeSize(15)

    },

    itemRateText: {

        color: 'red',
        textAlign: 'center',
        marginLeft: adapeSize(7),
        fontSize: fontdapeSize(12),
    },
    itRateNum: {

        color: 'black',
        fontSize: fontdapeSize(12),
    },
    buttonStyle: {


        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        marginLeft: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: adapeSize(16),
        width:width-adapeSize(30),
    },
    textStyle: {

        fontSize: fontdapeSize(15),
        color: '#FFFFFF'

    },
    commentListItemView:{

        flex:1,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        height:adapeSize(44),
        backgroundColor: 'white',

    },
    commentListItemLeft:{

        paddingLeft:adapeSize(15),
        textAlign:'left',
        color:'#9e9e9e',
        flex:0.4,
    },
    commentListItemRight:{

        paddingRight:adapeSize(15),
        textAlign:'right',
        color:'black',
        flex:0.4,
    },
    lendCarItemCellWarp:{

        paddingLeft:adapeSize(15),
        paddingRight:adapeSize(15),
        backgroundColor:'white'

    },
    lendCarItemCellInstWarp:{

        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:adapeSize(10),
    },

    lendCarItemCarName:{

        fontSize:fontdapeSize(14),
        flex:0.8

    },
    lendCarItemOrderState:{

        fontSize:fontdapeSize(14),
        flex:0.2,
        marginLeft:5,
        textAlign:'right'
    },
    lendCarItemOrderNum:{
        flex:0.8,
        fontSize:fontdapeSize(14),
        paddingBottom:10,
        color:'darkgray'
    },
    lendCarItemPrice:{

        fontSize:fontdapeSize(14),
        flex:0.2,
        marginLeft:5,
        textAlign:'right',
        color:'red'
    },

    CGDCarWarp:{


        flexDirection:'row',
        justifyContent:'flex-start',

    },
    CGDCarImage:{

        marginLeft:adapeSize(15),
        marginTop:adapeSize(15),
        marginBottom:adapeSize(15),
        width:adapeSize(120),
        height:adapeSize(80)
    },
    CGDInstWarpTop:{

        marginLeft:adapeSize(10),
        marginRight:adapeSize(15),
        justifyContent:'flex-start',
        flex:1,
        marginTop:adapeSize(15),
        marginBottom:adapeSize(15)
    },

    CGDInstWarpBooton:{

        flex:1,
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'space-between',
    },



    CGDInstTitle:{

        fontSize:fontdapeSize(14),


    },
    CGDInserDate:{

        fontSize:fontdapeSize(12),
        color:FontColor.COLORA1,

    },

    CGDInsetPrice:{

        fontSize:fontdapeSize(14),
        color:FontColor.COLORB2,

    }




})