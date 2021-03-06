/**
 * Created by zhengnan on 2018/1/26.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    PanResponder,
} from 'react-native';

import *as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
var ScreenWidth = Dimensions.get('window').width;
import { observer } from 'mobx-react/native';
import  StringTransformUtil from  "../../utils/StringTransformUtil";
let stringTransform = new StringTransformUtil();

@observer
export default class CarShoppingCell extends Component{

    render(){
        let  {shopIndex,CarShoppingData} = this.props;

        return(
            <View style={styles.cellView}>
                <ShopView ref={(ref)=>{this.shopView = ref}}
                          shopTitle={this.props.data.enterprise_name}/>
                {
                    this.props.data.new_cars.map((cityData,index)=>{

                        return(
                            <View key={index} style={{borderTopColor:fontAndColor.COLORA3,borderTopWidth:index>0?Pixel.getPixel(1):0,paddingTop:Pixel.getPixel(20)}}>
                                <TouchableOpacity style={{alignItems:'center',flexDirection:'row',marginLeft:Pixel.getPixel(15),marginBottom:Pixel.getPixel(10)}}
                                                  activeOpacity={1}
                                                  onPress={()=>{
                                                      this.props.citySelectClick(shopIndex,index);
                                                  }}>
                                    <Image style={{width:Pixel.getPixel(18),height:Pixel.getPixel(18),marginRight:Pixel.getPixel(10)}}
                                           source={CarShoppingData.isEdit?(cityData.delectSelect? require('../../../images/carSourceImages/shopSelect.png'):require('../../../images/carSourceImages/shopNoSelect.png')):(cityData.select? require('../../../images/carSourceImages/shopSelect.png'):require('../../../images/carSourceImages/shopNoSelect.png')) }/>
                                    <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>{ cityData.provice_name + (cityData.provice_name === cityData.city_name ? " " : ("  " + cityData.city_name))}</Text>
                                </TouchableOpacity>
                                {
                                    cityData.cars.map((carData,subIndex)=>{
                                            return(
                                                <CarCell key={`${index}+${subIndex}`}
                                                         CarShoppingData={CarShoppingData}
                                                         editeNumberClick={(type)=>{this.props.carEditNumberClick(carData.id,type,shopIndex,index,subIndex)}}
                                                         isShowLine={subIndex<cityData.cars.length?true:false}
                                                         data={carData}
                                                         carSelectClick={()=>{
                                                             this.props.carSelectClick(shopIndex,index,subIndex);
                                                         }}
                                                         carDelectClick={()=>{this.props.carDelectClick(carData.id,this.props.shopIndex,index,subIndex)}}
                                                         carInfoScreenClick={()=>{this.props.carInfoScreenClick(carData)}}/>
                                            )
                                        })
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
    }



}

@observer
 class ShopView extends Component{

    render(){
        return(
            <View style={styles.shopView}>
                <Image source={require('../../../images/carSourceImages/shanghu.png')}/>
                <Text style={styles.shopTitle}>{this.props.shopTitle}</Text>
            </View>)
    }

}

@observer
class CarCell extends Component{
     // 构造
     constructor(props) {
         super(props);

         this.animationType = false;
         this.state = {
             leftGap: new Animated.Value(0),
         };


     }

     startAnimation =()=>{
         this.animationType = true;
         Animated.timing(
             this.state.leftGap,
             {
                 toValue:-Pixel.getPixel(85),
                 duration:100,


             }
         ).start();
     }

     stopAnimation =()=>{
         this.animationType = false;
         Animated.timing(
             this.state.leftGap,
             {
                 toValue:0,
                 duration:100,

             }
         ).start();
     }

     componentWillMount() {
         this.panResponder = PanResponder.create({
             onStartShouldSetPanResponder: (evt, gestureState) => false,
             onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
             onMoveShouldSetPanResponder: (evt, gestureState) => {

                 return true;
             },
             onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
             onPanResponderMove: (evt, gestureState) => {
                 if(gestureState.dx<-10 && !this.animationType){
                     this.openDelectBtn();
                 }else if(gestureState.dx>0 && this.animationType){
                     this.closeDelectBtn();
                 }
             },
             onPanResponderTerminationRequest: (evt, gestureState) => true,
             onShouldBlockNativeResponder: (evt, gestureState) => {
                 return true;
             },
         })
     }

     componentWillReceiveProps(nextProps) {
         this.state.select = nextProps.data.select;
     }


    render(){
         let {CarShoppingData,data} = this.props;
        return(
            <View style={{paddingHorizontal:Pixel.getPixel(15),backgroundColor:'white',width:ScreenWidth,height:Pixel.getPixel(132)}} /*{...this.panResponder.panHandlers}*/>
                <View  style={{flexDirection:'row', flex:1,borderBottomColor:fontAndColor.COLORA3, borderBottomWidth:this.props.isShowLine ?Pixel.getPixel(1):0}}>
                    <Animated.View style={[styles.carCell,{left:this.state.leftGap}]}>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{
                            if(this.animationType){
                                this.closeDelectBtn();
                            }else {
                                this.props.carInfoScreenClick();
                            }
                        }}>
                            <View style={{flexDirection:'row', flex:1,alignItems:'center',backgroundColor:'white',width:ScreenWidth-Pixel.getPixel(30)}}>
                                <TouchableOpacity style={{justifyContent:'center',width:Pixel.getPixel(28),height:Pixel.getPixel(80),backgroundColor:'white',}} onPress={this.props.carSelectClick}>
                                    <Image style={{width:Pixel.getPixel(18),height:Pixel.getPixel(18)}}
                                           source={CarShoppingData.isEdit?(this.props.data.delectSelect? require('../../../images/carSourceImages/shopSelect.png'):require('../../../images/carSourceImages/shopNoSelect.png')):(this.props.data.select? require('../../../images/carSourceImages/shopSelect.png'):require('../../../images/carSourceImages/shopNoSelect.png'))}/>
                                </TouchableOpacity>
                                <Image style={styles.carImage} source={data.imgs.length>0?{uri:data.imgs[0].url+'?x-oss-process=image/resize,w_'+320+',h_'+240}:require('../../../images/carSourceImages/car_null_img.png')}>
                                    <Image style={{top:0,left:0,bottom:0,right:0,position: 'absolute'}} source={data.v_type==1? require('../../../images/carSourceImages/userCarTypeIcon.png'):require('../../../images/carSourceImages/newCarTypeIcon.png')}/>
                                </Image>
                                <View style={styles.carTextView}>
                                    <Text style={{
                                            color:fontAndColor.COLORA0,
                                            fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                                    }}>{data.model_name}</Text>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={{
                                            color:fontAndColor.COLORA1,
                                            fontSize:Pixel.getFontPixel(fontAndColor.MARKFONT22),
                                        }}>{this.props.data.v_type==2?(data.trim_color_name):(stringTransform.dateReversal(data.manufacture+'000')+'/'+data.mileage+'万公里')}</Text>
                                        <Text style={{
                                            color:fontAndColor.COLORB2,
                                            fontSize:Pixel.getFontPixel(fontAndColor.MARKFONT22),
                                        }}>{data.contHint && data.contHint}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                            <Text style={{
                                                color:fontAndColor.COLORB2,
                                                fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                                                fontWeight:'bold'
                                            }}>{stringTransform.carMoneyChange(data.dealer_price)}</Text>
                                            <Text style={{
                                                color:fontAndColor.COLORB2,
                                                fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
                                            }}>万元</Text>
                                        </View>
                                        <Text style={{
                                                color:fontAndColor.COLORB2,
                                                fontSize:Pixel.getFontPixel(fontAndColor.MARKFONT22),
                                        }}>{data.stock==0&& '已售罄'}</Text>
                                    </View>
                                </View>
                                {
                                    (data.stock == 0)?
                                        (<Image style={{width:Pixel.getPixel(60),height:Pixel.getPixel(70),right:0,bottom:Pixel.getPixel(10), position: 'absolute',}}
                                    source={require('../../../images/carSourceImages/yishouxing.png')}/>) :( <CarNumberEditView editClick={(type)=>{this.props.editeNumberClick(type)}} number={data.car_count} maxNumber={data.stock}/>)
                                }

                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
                <DelectButton ref={(ref)=>{this.delectButton = ref}} delectClick={()=>{this.closeDelectBtn();this.props.carDelectClick();}}/>
            </View>)

    }

     openDelectBtn=()=>{
         this.startAnimation();
         this.delectButton && this.delectButton.startAnimation();
     }

     closeDelectBtn=()=>{
         this.stopAnimation();
         this.delectButton && this.delectButton.stopAnimation();
     }

}

class DelectButton extends Component{

    // 构造
      constructor(props) {
        super(props);

        this.defaultGap = -Pixel.getPixel(80);
        this.state = {
            rightGap: new Animated.Value(this.defaultGap)
        };
      }

      startAnimation = ()=>{
          Animated.timing(
              this.state.rightGap,
              {
                  toValue:0,
                  duration:300,
              }
          ).start();
      }

      stopAnimation =()=>{
          Animated.timing(
              this.state.rightGap,
              {
                  toValue:this.defaultGap,
                  duration:300,

              }
          ).start();
      }

    render(){
        return(
                <Animated.View style={[styles.delectBtn, {right:this.state.rightGap}]}>
                    <TouchableOpacity style={{flex:1, alignItems:'center',justifyContent:'center',width:Pixel.getPixel(80)}}
                                      onPress={this.props.delectClick}>
                    <Text style={{color:'white', fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>删除</Text>
                    </TouchableOpacity>
                </Animated.View>
        )
    }
}

@observer
class CarNumberEditView extends Component{

    render(){
        return(
            <View style={styles.carNumberEditView}>
                <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:Pixel.getPixel(25),height:Pixel.getPixel(28)}} activeOpacity={1}
                                  onPress={()=>{this.carNumberClick(1)}}>
                    <Image source={this.props.number==1? require('../../../images/carSourceImages/noMinusCarNumber.png'):require('../../../images/carSourceImages/minusCarNumber.png')}/>
                </TouchableOpacity>
                <View style={{alignItems:'center',justifyContent:'center',width:Pixel.getPixel(43),height:Pixel.getPixel(28),borderLeftColor:fontAndColor.COLORA3,borderLeftWidth:Pixel.getPixel(1),borderRightColor:fontAndColor.COLORA3,borderRightWidth:Pixel.getPixel(1)}}>
                    <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24)}}>{this.props.number}</Text>
                </View>
                <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:Pixel.getPixel(25),height:Pixel.getPixel(28)}} activeOpacity={1}
                                  onPress={()=>{this.carNumberClick(2)}}>
                    <Image source={(this.props.maxNumber>this.props.number)?require('../../../images/carSourceImages/addCarNumber.png'):require('../../../images/carSourceImages/noAddCarNumber.png')}/>
                </TouchableOpacity>
            </View>
        )
    }

    carNumberClick=(type)=>{
        this.props.editClick(type);
    }
}

const styles = StyleSheet.create({
    cellView:{
        width:ScreenWidth,
        backgroundColor:'white',
    },
    shopView:{
        alignItems:'center',
        height:Pixel.getPixel(40),
        width:ScreenWidth,
        borderBottomWidth:Pixel.getPixel(1),
        borderBottomColor:fontAndColor.COLORA3,
        paddingLeft:Pixel.getPixel(15),
        flexDirection:'row',
        backgroundColor:'white'
    },
    shopTitle:{
        marginLeft:Pixel.getPixel(8),
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color:fontAndColor.COLORA1,
    },
    circleView:{
        width:Pixel.getPixel(20),
        height:Pixel.getPixel(20),
        borderRadius:Pixel.getPixel(10),
        borderWidth:Pixel.getPixel(1),
        borderColor:fontAndColor.COLORA3,
    },
    carCell:{
        flexDirection:'row',
        paddingVertical:Pixel.getPixel(10),
        alignItems:'center',
        top:0,
        left:-Pixel.getPixel(85),
        bottom:0,
        position: 'absolute',
        width:ScreenWidth-Pixel.getPixel(30),
    },
    carImage:{
        width:Pixel.getPixel(110),
        height:Pixel.getPixel(80),
        backgroundColor:fontAndColor.COLORA3
    },
    carTextView:{
        marginLeft:Pixel.getPixel(10),
        height:Pixel.getPixel(80),
        flex:1,
        backgroundColor:'white',
        justifyContent:'space-between'
    },
    delectBtn:{
        top:0,
        right:0,
        bottom:Pixel.getPixel(1),
        position: 'absolute',
        backgroundColor:fontAndColor.COLORB2,
        alignItems:'center',
        justifyContent:'center',
        width:Pixel.getPixel(80),
    },
    carNumberEditView:{
        width:Pixel.getPixel(93),
        height:Pixel.getPixel(28),
        right:0,
        bottom:0,
        position: 'absolute',
        borderWidth:Pixel.getPixel(1),
        borderColor:fontAndColor.COLORA3,
        flexDirection:'row'

    }
})