
import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Easing,
    Dimensions,
    Image,
    TouchableWithoutFeedback
} from 'react-native';


import ViewPager from 'react-native-viewpager';
const {width, height} = Dimensions.get('window');
var IMGS = [
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
    'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
    'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
    'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
];
export default class ViewPagers extends Component {
    // 初始化模拟数据
    constructor(props) {
        super(props);
        const dataSource = new ViewPager.DataSource({pageHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithPages(IMGS)
        };
    }

    render() {

        return (

            <ViewPager
                dataSource={this.state.dataSource}    //数据源（必须）
                renderPage={this._renderPage}         //page页面渲染方法（必须）
                isLoop={false}                        //是否可以循环
                autoPlay={false}                      //是否自动
                initialPage={0}                       //指定初始页面的index
                locked={false}                        //为true时禁止滑动翻页

            />


        )
    }

    _renderPage = (data, pageID) => {
        console.log(data);
        return (
            <Image style={styles.postPosition}
                source={{uri: data}}
            />
        );

    }
}
const styles = StyleSheet.create({
    postPosition:{
        width:width,
        height:height-50,
    },
});