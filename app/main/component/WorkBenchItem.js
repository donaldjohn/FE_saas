import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

let {height, width} = Dimensions.get('window');
import  PixelUtil from '../../utils/PixelUtil'
import  * as fontAndColor from '../../constant/fontAndColor'
var Pixel = new PixelUtil();
import HomeJobButton from './HomeJobButton';
import GetPermissionUtil from '../../utils/GetPermissionUtil';
const GetPermission = new GetPermissionUtil();
export default class HomeJobItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0
        }
    }

    componentWillMount() {
        this.list = [];
        this.list = this.props.items.childList;
    }

    render() {
        let firstChild = [];
        let itemList = [];
        for (let i = 0; i < this.list.length; i++) {
            firstChild.push(<HomeJobButton key={'job'+i} image={this.list[i].image} name={this.list[i].name}
                                           click={()=>{}}/>);
        }
        let index = Math.ceil(firstChild.length / 4);
        for (let i = 1; i <= index; i++) {
            if (i == 1) {
                let child = [];
                for (let j = 0; j < firstChild.length; j++) {
                    child.push(firstChild[j]);
                }
                if (child.length > 4) {
                    child.splice(3, child.length);
                }
                itemList.push(<View key={'view'+i} style={[{marginTop:Pixel.getPixel(15),width:width,
                flexDirection: 'row'},i==index?{marginBottom:Pixel.getPixel(20)}:{}]}>
                    {child}
                </View>);
            } else {
                let child = [];
                for (let j = i * 4 - 1; j < firstChild.length; j++) {
                    child.push(firstChild[j]);
                }
                if (child.length > 4) {
                    child.splice(3, child.length);
                }
                itemList.push(<View key={'view'+i} style={[{marginTop:Pixel.getPixel(22),width:width,
                flexDirection: 'row'},i==index?{marginBottom:Pixel.getPixel(20)}:{}]}>
                    {child}
                </View>);
            }
        }
        // itemList.push(<View key={'view1'} style={[{marginTop:Pixel.getPixel(27),width:width,
        // flexDirection: 'row'},this.list.length > 4?{}:{marginBottom:Pixel.getPixel(20)}]}>
        //     {firstChild}
        // </View>);
        // if (this.list.length > 4) {
        //     itemList.push(<View key={'view2'} style={{marginTop:Pixel.getPixel(27),marginBottom:Pixel.getPixel(20),
        //     width:width,flexDirection: 'row'}}>
        //     </View>)
        // }
        return (
            <View style={{width:width,backgroundColor:'#fff'}}>
                <View style={{width:width,flexDirection:'row',marginTop:Pixel.getPixel(17)}}>
                    <View style={{
                        width: Pixel.getPixel(3), height: Pixel.getPixel(14),
                        marginLeft: Pixel.getPixel(15), backgroundColor: fontAndColor.COLORB0
                    }}></View>
                    <Text style={{
                        fontSize: Pixel.getFontPixel(13), color: fontAndColor.COLORA1,
                        marginLeft: Pixel.getPixel(5)
                    }}>{this.props.items.name}</Text>
                </View>
                {itemList}
            </View>
        );
    }
}