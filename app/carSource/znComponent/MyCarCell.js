/**
 * Created by zhengnan on 17/2/8.
 */


import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

var screenWidth = Dimensions.get('window').width;

import * as fontAndColor from '../../constant/fontAndColor';


export default class MyCarCell extends Component {

    cellClick=(carData)=>{

        this.props.cellClick(carData);

    };

    footButtonClick=(typeStr,groupStr,carID)=>{

        this.props.footButtonClick(typeStr,this.props.type,carID);
    };


    getImage=(type)=>{

        switch(type) {
            case 1:
                return(require('../../../images/carSourceImages/audit.png')); // 审核中
                break;
            case 3:
                return(require('../../../images/carSourceImages/soldOut.png')); // 已下架
                break;
            case 4:
                return(require('../../../images/carSourceImages/accomplish.png')); //已成交
                break;
            default:
                break;
        }
    };

    dateReversal=(time)=>{

        const date = new Date();
        date.setTime(time);
        return(date.getFullYear()+"年"+(date.getMonth()+1)+"月");

    };

    render(){

        const {carCellData} = this.props;
        const  carType = carCellData.status;
        return(
            <TouchableOpacity onPress={()=>{this.cellClick(carCellData)}}>
                <View style={[styles.container,styles.lineBottom]} >

                    <View style={styles.cellContentView}>
                        <View style={styles.imageView} >
                            <Image style={styles.image}
                                   source={carCellData.img?{uri:carCellData.img+'?x-oss-process=image/resize,w_'+120+',h_'+80}:require('../../../images/carSourceImages/car_null_img.png')}/>
                        </View>
                        <View style={[styles.textContainer]}>
                            <View style={{backgroundColor:'white'}}>
                                <Text style={styles.mainText}>{'['+carCellData.city_name+']'+carCellData.model_name}</Text>
                            </View>
                            <View style={{backgroundColor:'white'}}>
                                <Text style={styles.subTitleText}>{this.dateReversal(carCellData.manufacture+'000')+'/'+carCellData.mileage+'万公里'}</Text>
                            </View>
                        </View>
                            <Image style={styles.tailImage} source={this.getImage(carType)}/>
                    </View>
                    <View style={styles.cellFootView}>
                        <TouchableOpacity onPress={()=>{this.footButtonClick('编辑',this.props.type,carCellData)}}>
                            <View style={styles.cellFoot}>
                                <Text style={styles.cellFootText}>编辑</Text>
                            </View>
                        </TouchableOpacity>
                        {
                            carType==2 &&
                            <TouchableOpacity onPress={()=>{this.footButtonClick('下架',this.props.type,carCellData)}}>
                                <View style={styles.cellFoot}>
                                    <Text style={styles.cellFootText}>下架</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        {
                            (carType==1||carType==3 ) &&
                            <TouchableOpacity onPress={()=>{this.footButtonClick('上架',this.props.type,carCellData)}}>
                                <View style={styles.cellFoot}>
                                    <Text style={styles.cellFootText}>上架</Text>
                                </View>
                            </TouchableOpacity>

                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


}
const styles = StyleSheet.create({

    container:{

        flex:1,
        height:160,
        backgroundColor:'white',
    },

    cellContentView:{

        flex:1,
        height:110,
        flexDirection:'row',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:fontAndColor.COLORA4,
        overflow:'hidden',

    },
    cellFootView:{

        height:50,
        width:screenWidth,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',

    },
    cellFoot:{

        paddingHorizontal:10,
        paddingVertical:5,
        borderColor:fontAndColor.COLORA2,
        borderWidth:StyleSheet.hairlineWidth,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:2,
        overflow:'hidden',
        marginRight:15,

    },
    cellFootText:{

        color:fontAndColor.COLORA2,
        fontSize:fontAndColor.LITTLEFONT,
    },
    lineBottom:{

        borderBottomWidth:10,
        borderColor:fontAndColor.COLORA4,

    },

    imageView:{

        width:147,
        justifyContent:'center',

    },
    image:{

        marginLeft:15,
        width:120,
        height:80,
        resizeMode: 'stretch',

    },
    tailImage:{

        bottom:5,
        right:0,
        position:'absolute',
    },

    textContainer:{

        // backgroundColor:'#FF0067',
        flex:1,
        justifyContent:'space-around',
        marginRight:15,
    },

    mainText:{

        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.LITTLEFONT,
    },

    subTitleText:{

        color:fontAndColor.COLORA1,
        fontSize:fontAndColor.CONTENTFONT,
    },


});