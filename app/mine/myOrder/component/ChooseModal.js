/**
 * Created by hanmeng on 2017/5/15.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    AppRegistry,
    View,
    StatusBar,
    Modal,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import PixelUtil from "../../../utils/PixelUtil";
let Pixel = new PixelUtil();
let {width, height} = Dimensions.get('window');
import  * as fontAndColor from '../../../constant/fontAndColor';
export default class ChooseModal extends Component {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShow: false,
        };
    }

    changeShowType = (value) => {
        this.setState({
            isShow: value
        });
    }


    render() {
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => {
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        this.setState({
                            isShow: false
                        });
                    }}
                    activeOpacity={1}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)'
                    }}>
                    <View style={{
                        width: width - width / 4,
                        //height: Pixel.getPixel(155),
                        backgroundColor: '#fff',
                        paddingLeft: Pixel.getPixel(20),
                        paddingRight: Pixel.getPixel(20),
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            marginTop: Pixel.getPixel(23),
                            fontSize: Pixel.getPixel(17),
                            fontWeight: 'bold',
                            color: '#000'
                        }}>{this.props.title}</Text>
                        <Text style={{
                            textAlign: 'center', fontSize: Pixel.getPixel(14),
                            marginTop: Pixel.getPixel(11), color: '#000'
                        }}>
                            {this.props.content}
                        </Text>
                        <View style={{flexDirection: 'row', marginBottom: Pixel.getPixel(20), marginTop: this.props.buttonsMargin}}>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    isShow: false
                                });
                            }} activeOpacity={0.9} style={this.props.negativeButtonStyle}>
                                <Text style={this.props.negativeTextStyle}>{this.props.negativeText}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({
                                    isShow: false
                                });
                            }} activeOpacity={0.9} style={this.props.positiveButtonStyle}>
                                <Text style={this.props.positiveTextStyle}>{this.props.positiveText}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}