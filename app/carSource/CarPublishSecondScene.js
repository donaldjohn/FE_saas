/**
 * Created by zhengnan on 2017/5/12.
 */
import React,    {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
}   from 'react-native';

import BaseComponent from '../component/BaseComponent';
import AllNavigationView from '../component/AllNavigationView';
import {CellView,CellSelectView} from './znComponent/CarPublishCell';
import CarSelectRegisterPersonScene from './CarSelectRegisterPersonScene';
import CarlicenseTagScene from  './carPublish/CarlicenseTagScene';
import CarUpImageScene   from './CarUpImageScene';
import CityListScene from  './CityListScene';
import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';
import StorageUtil from "../utils/StorageUtil";

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;


export default class CarPublishSecondScene extends BaseComponent{

    initFinish=()=>{

    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.carData = this.props.carData;

        this.nature_use ='非营运';

        if(this.carData.nature_use==1)
        {
            this.nature_use ='营运';

        }else if(this.carData.nature_use==3)
        {
            this.nature_use ='租赁非营运';

        }

        if(this.carData.v_type==2){
            this.carData['nature_use']=2;
            this.carData['transfer_times']='0';
            this.carData['mileage']='0';
        }else {
            this.carData['transfer_times']=this.carData.transfer_times ? String(this.carData.transfer_times):'0';
            this.carData['mileage']=this.carData.mileage ? String(this.carData.mileage):'0';
        }


        this.titleData1 = [
            [
                {
                    title:'使用性质',
                    isShowTag:false,
                    isShowTail:true,
                    selectDict:{current:this.nature_use,data:[{title:'营运',value:1},{title:'非营运',value:2},{title:'租赁非营运',value:3}]},
                },
                {
                    title:'过户次数',
                    isShowTag:true,
                    isShowTail:true,
                    tailView:()=>{
                        return(
                            <TextInput
                                style={styles.textInput}
                                placeholder='请输入'
                                defaultValue={this.carData.transfer_times}
                                onEndEditing={()=>{this.saveCarData();}}
                                onChangeText={(text)=>{this.carData['transfer_times'] = text}}
                            />
                        )
                    }
                },
                {
                    title:'车牌号',
                    isShowTag:true,
                    isShowTail:true,
                    value:this.carData.plate_number?this.carData.plate_number:'请选择'
                },
                {
                    title:'表显里程',
                    isShowTag:true,
                    isShowTail:true,
                    tailView:()=>{
                        return(
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='请输入'
                                    defaultValue={this.carData.mileage}
                                    onEndEditing={()=>{this.saveCarData();}}
                                    onChangeText={(text)=>{this.carData['mileage'] = text}}
                                />
                                <Text style={styles.textInputTitle}>万公里</Text>
                            </View>
                        )
                    }
                },

            ],
            [   {
                title:'参考价',
                isShowTag:false,
                value:'查看',
                isShowTail:true,
            },
                {
                    title:'分销批发价',
                    subTitle:'针对同行的分销价格，合理定价可以更快售出',
                    isShowTag:true,
                    isShowTail:true,
                    tailView:()=>{
                        return(
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       placeholder='请输入'
                                       defaultValue={this.carData.dealer_price?this.carData.dealer_price:''}
                                       onEndEditing={()=>{this.saveCarData();}}
                                       onChangeText={(text)=>{this.carData['dealer_price']=text}}/>
                            <Text style={styles.textInputTitle}>万元</Text>
                        </View>)
                    }
                },
                {
                    title:'低价',
                    subTitle:'仅做内部销售参考',
                    isShowTag:false,
                    isShowTail:true,
                    tailView:()=>{
                        return(
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       placeholder='请输入'
                                       defaultValue={this.carData.low_price?this.carData.low_price:''}
                                       onEndEditing={()=>{this.saveCarData();}}
                                       onChangeText={(text)=>{this.carData['low_price']=text}}/>
                            <Text style={styles.textInputTitle}>万元</Text>
                        </View>)
                    }
                },
                {
                    title:'会员价',
                    subTitle:'给本店高级客户的优惠价格，暂不对外展示',
                    isShowTag:false,
                    isShowTail:true,
                    tailView:()=>{
                        return(
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       placeholder='请输入'
                                       defaultValue={this.carData.member_price?this.carData.member_price:''}
                                       onEndEditing={()=>{this.saveCarData();}}
                                       onChangeText={(text)=>{this.carData['member_price']=text}}/>
                            <Text style={styles.textInputTitle}>万元</Text>
                        </View>)
                    }
                },

            ],
            [   {
                title:'车辆所在地',
                isShowTag:true,
                value:this.carData.city_name ? this.carData.city_name:'请选择',
                isShowTail:true,
            },{
                title:'登记人',
                isShowTag:true,
                value:'请选择',
                isShowTail:true,
            },
                {
                    title:'车况描述',
                    isShowTag:false,
                    isShowTail:false,
                    tailView:()=>{
                        return(
                            <TextInput
                                style={[styles.textInput,{width:sceneWidth-Pixel.getPixel(100),height:Pixel.getPixel(50)}]}
                                placeholder='请填写'
                                maxLength={50}
                                defaultValue={this.carData.describe?this.carData.describe:''}
                                onEndEditing={()=>{this.saveCarData();}}
                                onChangeText={(text)=>{this.carData['describe']=text}}/>
                        )
                    }

                },
            ]

        ];

        this.titleData2 = [
            [
                {
                    title:'过户次数',
                    isShowTag:true,
                    value:'0',
                    isShowTail:false,
                },
                {
                    title:'车牌号',
                    isShowTag:true,
                    isShowTail:true,
                    value:this.carData.plate_number?this.carData.plate_number:'请选择'
                },
                {
                    title:'表显里程',
                    isShowTag:true,
                    isShowTail:false,
                    value:'0 万公里',
                },

            ],
            [   {
                title:'参考价',
                isShowTag:false,
                value:'查看',
                isShowTail:true,
            },
                {
                    title:'分销批发价',
                    subTitle:'针对同行的分销价格，合理定价可以更快售出',
                    isShowTag:true,
                    isShowTail:true,
                    tailView:()=>{
                        return(
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       placeholder='请输入'
                                       defaultValue={this.carData.dealer_price?this.carMoneyChange(this.carData.dealer_price):''}
                                       onChangeText={(text)=>{this.carData['dealer_price']=text}}
                                       onEndEditing={()=>{this.saveCarData();}}
                            />

                            <Text style={styles.textInputTitle}>万元</Text>
                        </View>)
                    }
                },
                {
                    title:'低价',
                    subTitle:'仅做内部销售参考',
                    isShowTag:false,
                    isShowTail:true,
                    tailView:()=>{
                        return(
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput style={styles.textInput}
                                       placeholder='请输入'
                                       defaultValue={this.carData.low_price?this.carMoneyChange(this.carData.low_price):''}
                                       onChangeText={(text)=>{this.carData['low_price']=text}}
                                       onEndEditing={()=>{this.saveCarData();}}
                            />
                            <Text style={styles.textInputTitle}>万元</Text>
                        </View>)
                    }
                },
                {
                    title:'会员价',
                    subTitle:'给本店高级客户的优惠价格，暂不对外展示',
                    isShowTag:false,
                    isShowTail:true,
                    tailView:()=>{
                        return(
                            <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                            <TextInput
                                style={styles.textInput}
                                placeholder='请输入'
                                defaultValue={this.carData.member_price?this.carMoneyChange(this.carData.member_price):''}
                                onChangeText={(text)=>{this.carData['member_price']=text}}
                                onEndEditing={()=>{this.saveCarData();}}
                            />

                                <Text style={styles.textInputTitle}>万元</Text>
                        </View>)
                    }
                },
            ],
            [   {
                title:'车辆所在地',
                isShowTag:true,
                value:this.carData.city_name ? this.carData.city_name:'请选择',
                isShowTail:true,
            },
                {
                    title:'车况描述',
                    isShowTag:false,
                    isShowTail:false,
                    tailView:()=>{
                        return(
                            <TextInput
                                style={[styles.textInput,{width:sceneWidth-Pixel.getPixel(100),height:Pixel.getPixel(50)}]}
                                placeholder='请填写'
                                maxLength={50}
                                defaultValue={this.carData.describe?this.carMoneyChange(this.carData.describe):''}
                                onEndEditing={()=>{this.saveCarData();}}
                                onChangeText={(text)=>{this.carData['describe']=text}}/>
                        )
                    }
                },
            ]

        ];
        this.state = {
            titleData:this.props.carData.v_type==1? this.titleData1 :this.titleData2,
        };
    }

    render(){
        return(
            <View style={styles.rootContainer}>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Pixel.getTitlePixel(-64)}>
                    <ScrollView style={{width:sceneWidth,height:Dimensions.get('window').height - Pixel.getTitlePixel(64)}}>
                        {
                            this.state.titleData.map((data,index)=>{
                                return(
                                    <View style={{marginTop:10,backgroundColor:'white'}} key={index}>
                                        {
                                            data.map((rowData,subIndex)=>{
                                                return( rowData.selectDict?
                                                        (
                                                    <TouchableOpacity
                                                        key={subIndex}
                                                        activeOpacity={1}
                                                        onPress={()=>this.cellCilck(rowData.title)}>
                                                        <CellSelectView
                                                            currentTitle={rowData.selectDict.current}
                                                            cellData={rowData}
                                                            cellSelectAction={this.cellSelectAction} />
                                                    </TouchableOpacity>):
                                                    (
                                                        <TouchableOpacity key={subIndex}
                                                                          activeOpacity={1}
                                                                          onPress={()=>this.cellCilck(rowData.title)}>
                                                        <CellView cellData={rowData}/>
                                                        </TouchableOpacity>)
                                                    )
                                            })
                                        }
                                    </View>
                                )
                            })
                        }
                        <View style={styles.footContainer}>
                            <TouchableOpacity onPress={this.nextAction}>
                                <View style={styles.footView}>
                                    <Text style={styles.footText}>下一步</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <AllNavigationView title="车辆基本信息" backIconClick={this.backPage}/>
            </View>
        )
    }

    cellSelectAction=(selectDict)=>{
       this.carData['nature_use'] = selectDict.value;
       this.titleData1[0][0].selectDict.current = selectDict.value;
       this.saveCarData();

    }


    updateUI=()=>{

        if(this.props.carData.v_type==1){
            this.setState({
                titleData:this.titleData1,
            });
        }else {
            this.setState({
                titleData:this.titleData2,
            });
        }
        this.saveCarData();

    }

    saveCarData=()=>{
            if (this.carData.show_shop_id && !this.carData.id) {
                StorageUtil.mSetItem(String(this.carData.show_shop_id), JSON.stringify(this.carData));
            }
    }


    cellCilck=(cellTitle)=>{

        if(cellTitle=='登记人')
        {
           this.pushSelectRegisterPersonScene();

        }else if(cellTitle=='车牌号'){

            this.pushCarIicenseTagScene();

        }else if(cellTitle=='车辆所在地'){

            this.pushCityListScene();
        }
    }

    nextAction=()=>{

        if(this.carData.transfer_times==''||!this.carData.transfer_times)
        {
            this.props.showToast('请输入过户次数');
            return;
        }
        if(this.carData.plate_number==''||!this.carData.plate_number)
        {
            this.props.showToast('请输入正确的车牌号');
            return;
        }
        if(this.carData.mileage==''||!this.carData.mileage)
        {
            this.props.showToast('请输入里程');
            return;
        }

        if(this.carData.transfer_times==''||!this.carData.transfer_times)
        {
            this.props.showToast('请输入分销批发价');
            return;
        }
        if(this.carData.city_id==''||!this.carData.city_id)
        {
            this.props.showToast('请选择车辆所在地');
            return;
        }

        let navigatorParams = {
            name: "CarUpImageScene",
            component: CarUpImageScene,
            params: {
                carData:this.carData,
            }
        };
        this.toNextPage(navigatorParams);
        console.log(this.carData);
    }

    pushSelectRegisterPersonScene=()=>{
        let navigatorParams = {
            name: "CarSelectRegisterPersonScene",
            component: CarSelectRegisterPersonScene,
            params: {
                selectPersonClick:this.selectPersonClick,
                currentPerson:this.titleData1[2][1].value,
            }
        };
        this.toNextPage(navigatorParams);
    }
    selectPersonClick=(data)=>{

       this.titleData1[2][1].value = data;
        this.updateUI();
    }

    pushCarIicenseTagScene=()=>{
        let navigatorParams = {
            name: "CarlicenseTagScene",
            component: CarlicenseTagScene,
            params: {
                checkedCarlicenseTagClick:this._checkedCarlicenseTagClick,
                currentChecked:this.titleData1[0][2].value,
            }
        };
        this.toNextPage(navigatorParams);
    }

    _checkedCarlicenseTagClick=(title)=>{
           this.titleData1[0][2].value = title;
           this.titleData2[0][1].value = title;
           this.carData['plate_number'] = title;
            this.updateUI();
    }
    pushCityListScene=()=>{
        let navigatorParams = {
            name: "CityListScene",
            component: CityListScene,
            params: {
                checkedCityClick:this.checkedCityClick,
            }
        };
        this.toNextPage(navigatorParams);
    }

    checkedCityClick=(city)=>{
           this.titleData1[2][0].value = city.city_name;
           this.titleData2[2][0].value = city.city_name;
           this.carData['city_name'] = city.city_name;
           this.carData['city_id'] = city.city_id;
            this.updateUI();
    }

    carMoneyChange=(carMoney)=>{

        let newCarMoney = parseFloat(carMoney);
        let carMoneyStr = newCarMoney.toFixed(2);
        let moneyArray = carMoneyStr.split(".");

        // console.log(carMoney+'/'+newCarMoney +'/' + carMoneyStr +'/' +moneyArray);

        if(moneyArray.length>1)
        {
            if(moneyArray[1]>0){

                return moneyArray[0]+'.'+moneyArray[1];

            }else {

                return moneyArray[0];
            }

        }else {
            return carMoneyStr;
        }


    }


}



const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    footContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:Pixel.getPixel(20),
        marginBottom:Pixel.getPixel(20),
    },
    footView:{
        backgroundColor:fontAndColor.COLORB0,
        height:Pixel.getPixel(44),
        justifyContent:'center',
        alignItems:'center',
        width:sceneWidth-Pixel.getPixel(30),
        borderRadius:Pixel.getPixel(3),
    },
    footText:{
        textAlign:'center',
        color:'white',
        fontSize:fontAndColor.BUTTONFONT30
    },
    textInput:{
        height: 20,
        borderColor: fontAndColor.COLORA0,
        width:50,
        textAlign:'right',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),

    },
    textInputTitle:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginLeft:Pixel.getPixel(5),
        textAlign:'right',
    }
});