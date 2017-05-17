/**
 * Created by zhengnan on 2017/5/5.
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
} from  'react-native';

import BaseComponent from  '../../component/BaseComponent';
import AllNavigationView from '../../component/AllNavigationView';
import *as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from  '../../utils/PixelUtil';
let  Pixel = new PixelUtil();


let datatArray=[
     [{title:'借款人',value:'纠结伦'}
        ,{title:'身份证号',value:'4501238488288288182'}
    ,{title:'手机号码',value:'18690722773'}
    ,{title:'借款金额',value:'100万'}],
    [{title:'车架号',value:'SB-110-120-NB222222'}]];

export default  class  ReceiptInfoScene extends BaseComponent{

    initFinish=()=>{

    }

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          let getSectionData = (dataBlob, sectionID) => {
              return dataBlob[sectionID];
          };

          let getRowData = (dataBlob, sectionID, rowID) => {
              return dataBlob[sectionID + ":" + rowID];
          };


          const dataSource =  new ListView.DataSource({
              getSectionData: getSectionData,
              getRowData: getRowData,
              rowHasChanged: (r1, r2) => r1 !== r2,
              sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
          });

          var dataBlob = {}, sectionIDs = [], rowIDs = [],cars = [];
          for (var i = 0; i < datatArray.length; i++) {
              sectionIDs.push(i);
              dataBlob[i] = '';
              cars = datatArray[i];
              rowIDs[i] = [];
              for (var j = 0; j < cars.length; j++) {
                  rowIDs[i].push(j);
                  dataBlob[i + ':' + j] = cars[j];
              }
          }

          this.state = {

              dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),

          };
      }

    setListData = (array)=> {

        console.log(array);
        var dataBlob = {}, sectionIDs = [], rowIDs = [],cars = [];
        for (var i = 0; i < array.length; i++) {
            sectionIDs.push(i);
            cars = array[i];
            rowIDs[i] = [];
            for (var j = 0; j < cars.length; j++) {
                rowIDs[i].push(j);
                dataBlob[i + ':' + j] = cars[j];
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            });

        }
    }



    render(){
        return(<View style={styles.rootContainer}>
            <ListView dataSource={this.state.dataSource} renderSectionHeader={this.renderSectionHeader}
                      renderRow={this.renderRow}/>
            <AllNavigationView title="借据信息" backIconClick={this.backPage}/>
        </View>)
    }


    // 每一行中的数据
    renderRow = (rowData, sectionID, rowID) => {

        return (
                <View style={styles.rowCell}>
                    <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24)}}>{rowData.title}</Text>
                    <Text style={{color:fontAndColor.COLORA1, fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),textAlign:'right'}}>{rowData.value}</Text>
                </View>
        )
    };

    // 每一组对应的数据
    renderSectionHeader = (sectionData, sectionId) => {

        return (
            <View style={styles.sectionHeader}/>
        );
    }

}


const styles = StyleSheet.create({

    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    sectionHeader:{
        height:Pixel.getPixel(10),
    },
    rowCell:{
        height:Pixel.getPixel(44),
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:Pixel.getPixel(15),
        borderBottomColor:fontAndColor.COLORA4,
        borderBottomWidth:StyleSheet.hairlineWidth,
    }
});