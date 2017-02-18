/**
 * Created by Administrator on 2017/2/10.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import Grid from '../component/Grid';

const { width,height } = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const hot = require('../../../images/publish/hot-label.png');

export default class AutoLabel extends Component {

    constructor(props) {
        super(props);
        this.viewData =
            [
                {title: '座椅加热', selected: false,index:0},
                {title: '全景天窗', selected: false,index:1},
                {title: '定速巡航', selected: false,index:2},
                {title: '全时四驱', selected: false,index:3},
                {title: '油电混合', selected: false,index:4},
                {title: '迎宾灯', selected: false,index:5},
                {title: '无钥匙启动', selected: false,index:6},
                {title: '倒车影像', selected: false,index:7},
            ];
        this.state = {
            dataSource: this.viewData
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _labelPress = (i) => {
        this.viewData.map((data,index)=>{
            if(i === index){
                data.selected = !data.selected;
            }
        });
        this.interiorGrid.refresh(this.viewData);
    };

    _renderItem = (data, i) => {
        if (data.selected === true) {
            return (
                <TouchableOpacity
                    key={data.index}
                    style={styles.selectContainer}
                    activeOpacity={0.6}
                    onPress={()=>{this._labelPress(data.index)}}
                >
                <View style={styles.selectItem}>
                    <Text style={styles.selectText}>
                        {data.title}
                    </Text>
                    <Image style={styles.hotLabel} source={hot}/>
                </View>
                </TouchableOpacity>
            );
        } else if (data.selected === false) {
            return (
                <TouchableOpacity
                    key={data.index}
                    style={styles.defaultContainer}
                    activeOpacity={0.6}
                    onPress={()=>{this._labelPress(data.index)}}
                >
                    <View style={styles.defaultItem}>
                        <Text style={styles.defaultText}>
                            {data.title}
                        </Text>
                    </View>
                </TouchableOpacity>

            );
        }
    };



    render() {
        return (
            <View style={styles.container}>
                <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
                    <Grid
                        ref = {(grid)=>{this.interiorGrid = grid}}
                        style={styles.girdContainer}
                        renderItem={this._renderItem}
                        data={this.state.dataSource}
                        itemsPerRow={2}
                    />
                </Image>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: 'transparent',
    },
    imgContainer:{
        width: width,
        backgroundColor: 'transparent',
        paddingTop: 100,
        paddingHorizontal: 24
    },
    girdContainer: {
        flex: 1,
    },
    defaultContainer: {
        height: 41,
        width: 132,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center'
    },
    defaultItem: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    defaultText: {
        fontSize: 15,
        color: '#FFFFFF'
    },
    selectContainer: {
        height: 41,
        width: 132,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },
    selectItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    selectText: {
        fontSize: 15,
        color: fontAndColor.COLORB1
    },
    hotLabel: {
        width: 13,
        height: 9,
        marginLeft: 2
    },
    emptyItem: {
        height: 41,
        width: 132,
        backgroundColor: 'transparent'
    }
});