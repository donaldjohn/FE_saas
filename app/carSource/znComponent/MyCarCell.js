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

    cellClick=(carID)=>{

        this.props.cellClick(carID);

    };

    footButtonClick=(typeStr,carID)=>{

        this.props.footButtonClick(typeStr,carID);
    };


    getImage=(type)=>{

        switch(type) {
            case 1:
                return(require('../../../images/carSourceImages/audit.png'));
                break;
            case 2:
                return(require('../../../images/carSourceImages/soldOut.png'));
                break;
            case 3:
                return(require('../../../images/carSourceImages/accomplish.png'));
                break;
            default:
                break;
        }
    };

    dateReversal=(time)=>{

        const date = new Date();
        date.setTime(time);
        return(date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate());

    };

    render(){

        const {carCellData} = this.props;
        return(
            <TouchableOpacity onPress={()=>{this.cellClick(carCellData.id)}}>
                <View style={[styles.container,styles.lineBottom]} >

                    <View style={styles.cellContentView}>
                        <View style={styles.imageView}>
                            <Image style={styles.image}/>
                        </View>
                        <View style={[styles.textContainer]}>
                            <View style={{backgroundColor:'white'}}>
                                <Text style={styles.mainText}>{'['+carCellData.city_name+']'+carCellData.brand_name+carCellData.model_name}</Text>
                            </View>
                            <View style={{backgroundColor:'white'}}>
                                <Text style={styles.subTitleText}>{this.dateReversal(carCellData.create_time+'000')+'/'+carCellData.mileage+'万公里'}</Text>
                            </View>
                        </View>
                            <Image style={styles.tailImage} source={this.getImage(this.props.type)}/>
                    </View>
                    <View style={styles.cellFootView}>

                        <TouchableOpacity onPress={()=>{this.footButtonClick('编辑',carCellData.id)}}>
                            <View style={styles.cellFoot}>
                                <Text style={styles.cellFootText}>编辑</Text>
                            </View>
                        </TouchableOpacity>
                        {
                            this.props.type==0 &&
                            <TouchableOpacity onPress={()=>{this.footButtonClick('下架',carCellData.id)}}>
                                <View style={styles.cellFoot}>
                                    <Text style={styles.cellFootText}>下架</Text>
                                </View>
                            </TouchableOpacity>
                        }
                        {
                            this.props.type==1 &&
                            <TouchableOpacity onPress={()=>{this.footButtonClick('上架',carCellData.id)}}>
                                <View style={styles.cellFoot}>
                                    <Text style={styles.cellFootText}>上架</Text>
                                </View>
                            </TouchableOpacity>

                        }
                        {/*{*/}
                        {/*this.props.type!==2&&<View style={styles.cellFoot}>*/}
                        {/*<Text style={styles.cellFootText}>生产二维码</Text>*/}
                        {/*</View>*/}
                        {/*}*/}
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
        backgroundColor:'#FFF45C',

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