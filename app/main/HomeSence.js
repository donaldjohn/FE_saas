/**
 * Created by yujinzhong on 2017/2/8.
 */

import  React, {Component, PropTypes} from  'react'
import  {

    View,
    Text,
    ListView,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity
} from  'react-native'

import * as fontAndClolr from '../constant/fontAndColor';

let MovleData = require('./MoveData.json');
let movies = MovleData.subjects;
import  HomeHeaderItem from './component/HomeHeaderItem';
import  ViewPagers from './component/ViewPager'
/*
 * 获取屏幕的宽和高
 **/
const {width, height} = Dimensions.get('window');


export class HomeHeaderItemInfo {
    constructor(ref, key, functionTitle, describeTitle, functionImage) {

        this.ref = ref;
        this.key = key;
        this.functionTitle = functionTitle;
        this.describeTitle = describeTitle;
        this.functionImage = functionImage;
    }

}

const bossFuncArray = [
    new HomeHeaderItemInfo('shouche', 'page111', '收车', '优质车源,最佳商户', require('../../images/mainImage/shouche.png')),
    new HomeHeaderItemInfo('maiche', 'page112', '卖车', '快速发车,一键上架', require('../../images/mainImage/maiche.png')),
    new HomeHeaderItemInfo('jiekuan', 'page113', '借款', '多样化融资方案', require('../../images/mainImage/jiekuan.png')),
    new HomeHeaderItemInfo('huankuan', 'page114', '还款', '方便,快捷,安全', require('../../images/mainImage/huankuan.png')),
];
const employerFuncArray = [bossFuncArray[0], bossFuncArray[1]];


export default class MyListView extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            source: ds.cloneWithRows(movies)

        };
    }


    _renderSeparator(sectionId, rowId) {

        return (
            <View style={cellSheet.Separator} key={sectionId + rowId}>
            </View>
        )
    }


    render() {

        return (

            <View style={cellSheet.container}>

                <ListView

                    contentContainerStyle={cellSheet.listStyle}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeparator}
                    renderHeader={this._renderHeader}
                    bounces={false}
                />

            </View>
        )
    }

    _renderHeader() {
        let tablist;

        tablist = bossFuncArray;
        let items = [];
        tablist.map((data)=> {
            let tabItem;

            tabItem = <HomeHeaderItem
                ref={data.ref}
                key={data.key}
                functionTitle={data.functionTitle}
                describeTitle={data.describeTitle}
                functionImage={data.functionImage}
            />
            items.push(tabItem);
        });

        return (
            <View>

                <View style={{flexDirection: 'row'}}>
                    <ViewPagers/>
                </View>

                <View style={cellSheet.header}>

                    {items}
                </View>


                <View style={{
                    flexDirection: 'row',
                    width: width,
                    height: 40,
                    backgroundColor: 'white',
                    alignItems: 'center',
                }}>

                    <View style={{marginLeft: 20, flex: 1}}>
                        <Text>
                            意向车源
                        </Text>

                    </View>
                    <TouchableOpacity style={{marginRight: 20}} onPress={()=> {

                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Text style={{color: 'gray', fontSize: 12}}>
                                更多
                            </Text>

                            <Image source={require('../../images/mainImage/more.png')} style={{
                                width: 5,
                                height: 10,
                                marginLeft: 2,
                            }}/>


                        </View>
                    </TouchableOpacity>


                </View>

            </View>

        )
    }

    _renderRow(movie) {

        return (
            <View style={{
                width: width / 2,
                backgroundColor: 'white',
                borderWidth: 0,
                borderColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom:12,
            }}>
                <View style={{width: 166, height: 180, backgroundColor: 'white', justifyContent: 'center'}}>
                    <Image style={cellSheet.imageStyle} source={{uri: movie.images.large}}/>
                    <Text style={cellSheet.despritonStyle}>我不是盘简历我不是盘简历</Text>
                    <Text style={cellSheet.timeStyle}>{movie.title}</Text>

                </View>
            </View>

        )
    }
}


const cellSheet = StyleSheet.create({


    header: {

        backgroundColor: 'green',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 10,

    },

    headerTitle: {

        fontSize: 20,
    },

    container: {

        flex: 1,
        marginTop: 0,   //设置listView 顶在最上面
        backgroundColor: 'white',
    },

    row: {

        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#F5FCFF',
    },

    imageStyle: {

        width: 166,
        height: 111,
    },
    listStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',

    },

    timeStyle: {

        flex: 1,
        fontSize: 15,
        textAlign: 'left',
        color:fontAndClolr.COLORA1,
        fontSize:fontAndClolr.MARKFONT,

    },

    Separator: {

        backgroundColor: 'white',
        height: 2,

    },
    despritonStyle: {

        textAlign: 'left',
        marginTop:8,
        marginBottom:13,
        color:fontAndClolr.COLORA0,
        fontSize:fontAndClolr.BUTTONFONT,


    }

});
