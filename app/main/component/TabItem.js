/**
 * Created by yujinzhong on 2017/2/7.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
export default class TabItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected : false
        }
    }

    changeStates =(xuanzhong )=>{

       if(xuanzhong==this.props.title){
           this.setState({
               selected:true
           })
       }else{
           this.setState({
               selected:false
           })
       }

    }


    render() {
        return (
            <View>
                <Image
                    source ={this.state.selected ? this.props.selectedImg: this.props.defaultImg }
                />
                <Text style={ {color: this.state.selected ? '#05C5C2' : '#999999' ,marginTop : 3}}>{this.props.title }</Text>


            </View>

        );
    }
}
