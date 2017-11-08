/**
 * Created by dingyonggang on 2017/10/27.
 */
import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    InteractionManager,
    TouchableWithoutFeedback,
    ListView,
    Keyboard,
} from "react-native";
import BaseComponent from "../../../../../component/BaseComponent";
import NavigationBar from "../../../../../component/NavigationBar";
import * as FontAndColor from "../../../../../constant/fontAndColor";
import PixelUtil from "../../../../../utils/PixelUtil";
import MyButton from "../../../../../component/MyButton";
import {request} from "../../../../../utils/RequestUtil";
import * as AppUrls from "../../../../../constant/appUrls";
import StorageUtil from "../../../../../utils/StorageUtil";
import * as StorageKeyNames from "../../../../../constant/storageKeyNames";
import TextInputItem from '../../component/TextInputItem'
import CardPhoneSmsScene from './CardPhoneSmsScene'
import ProvinceListScene from '../../../../../carSource/ProvinceListScene'
import * as fontAndColor from '../../../../../constant/fontAndColor';
import SText from '../../component/SaasText'

let Dimensions = require('Dimensions');
let {width, height} = Dimensions.get('window');
let Pixel = new PixelUtil();
let Platform = require('Platform');


let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
let selectedBank = {}

export default class ChooseBankNameScene extends BaseComponent{

    constructor(props) {
        super(props);



        this.state = {
            renderPlaceholderOnly: true,
            value:'',
            source : ds.cloneWithRows([])
        }
    }


    initFinish = () => {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }


    render(){
        if (this.state.renderPlaceholderOnly) {
            return ( <TouchableWithoutFeedback onPress={() => {
                this.setState({
                    show: false,
                });
            }}>
                <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                    <NavigationBar
                        leftImageShow={false}
                        leftTextShow={true}
                        leftText={""}
                        centerText={'开户行'}
                        rightText={""}
                    />
                </View>
            </TouchableWithoutFeedback>);
        }

        return(
            <View style={{flex: 1, backgroundColor: FontAndColor.COLORA3}}>
                <NavigationBar
                    leftImageShow={true}
                    leftTextShow={false}
                    centerText={'开户行'}
                    rightText={"确定"}
                    rightTextCallBack={()=>{
                        this.props.callBack(selectedBank);
                        this.backPage();
                    }}
                    leftImageCallBack={this.backPage}
                />

                <TouchableOpacity
                    activeOpacity = {.9}
                    onPress = {()=>{
                        this.toNextPage({
                            component:ProvinceListScene,
                            name:'ProvinceListScene',
                            params:{
                                isZs:true,
                                checkedCityClick:this.checkedCityClick,
                                unlimitedAction:this.cityUnlimitedAction,
                                isSelectProvince:true,
                            }
                        })
                    }}
                >

                    <View style = {{flexDirection:'row', alignItems:'center', marginVertical:15, paddingHorizontal:15, backgroundColor:'white'}}>
                        <TextInput
                            style = {{flex:1, height:45}}
                            editable = {false}
                            placeholder = {'请选择城市'}
                            underlineColorAndroid={"#00000000"}
                            value = {this.state.value}
                        />
                        <Image source = {require('../../../../../../images/mainImage/celljiantou.png')}/>
                    </View>
                </TouchableOpacity>

                <ListView
                    enableEmptySections = {true}
                    style ={{marginTop:10,flex:1}}
                    renderRow = {this.renderRow}
                    renderSeparator = {this.renderSeparator}
                    removeClippedSubviews = {false}
                    dataSource = {this.state.source}
                />


            </View>

        )

    }


    renderSeparator(sectionId, rowId) {

        return (
            <View style={styles.Separator} key={sectionId + rowId}>
            </View>
        )
    }
    renderRow = (data, sectionId, rowId) => {
        return<TouchableOpacity
            onPress = {()=>{
                selectedBank = data;
                this.setState({
                    value:data.bankname,
                })
            }}

        >
            <View style = {{backgroundColor:'white', height:40, paddingHorizontal:15, justifyContent:'center'}}>
                <SText style = {{}}>{data.bankname}</SText>
            </View>
        </TouchableOpacity>

    }


    checkedCityClick=(cityType)=>{

        let params = {
            bankCardNo:this.props.bank_no,
            cityName:cityType.city_name,
            page:1,
            rows:20,
        }

        this.props.showModal(true)
        request(AppUrls.ZS_PARSE_BANK, 'post', params).then((response)=>{
            this.props.showModal(false)


            console.log(response)
            this.setState({
                source:ds.cloneWithRows(response.mjson.data.info_list)
            })

        }, (error)=>{

        })

        console.log(cityType)
    }

}


const styles = StyleSheet.create({

    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(1),

    }

})