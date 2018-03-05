import React from 'react';
import {
	AppRegistry,
	View,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Text,
	Platform,
	Linking,
	NativeModules,
	BackAndroid,
	InteractionManager,
	ScrollView,
	Image,
	KeyboardAvoidingView,
	StatusBar
} from 'react-native';


const IS_ANDROID = Platform.OS === 'android';
// import OpenCreditScene from '../main/OpenCreditScene'
import BaseComponent from '../component/BaseComponent';
var {height, width} = Dimensions.get('window');
import * as fontAndColor  from '../constant/fontAndColor';
import  PixelUtil from '../utils/PixelUtil'
let Pixel = new PixelUtil();
import AllNavigationView from '../component/AllNavigationView';

// import Authentication from '../mine/kuaisushouxin/Authentication';//验四页面
import Authentication from '../mine/kuaisushouxin/Authentication';//验四页面


export default class NonCreditScene extends BaseComponent {

	constructor(props) {
		super(props);

		this.state = {
			renderPlaceholderOnly: 'loading',
			successCredit: 0
		};

	}

	handleBack = () => {
		NativeModules.VinScan.goBack();
		return true;
	}

	componentDidMount() {
		try {
			BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
		} catch (e) {

		} finally {
			//InteractionManager.runAfterInteractions(() => {
			this.setState({renderPlaceholderOnly: 'loading'});
			this.initFinish();
			//});
		}
	}

	initFinish = () => {
		this._getCreditInfo();

		this.setState({

			renderPlaceholderOnly: 'success',
			successCredit: 1,
		});

	}
	_getCreditInfo = () => {


	}

	render() {
		if (this.state.renderPlaceholderOnly !== 'success') {
			return this.loadView();
		}
		return (

			(this.state.successCredit == 1) ?
				<View style={styles.container}>
					{
						this.loadScrollView()
					}

				</View> :
				<View style={{flex: 1,backgroundColor: 'white',paddingTop: Pixel.getPixel(64),}}>
					{
						this.loadScrollViewSuccess()
					}
					{/*导航栏view*/}
					<AllNavigationView
						title='金融'
					/>
				</View>





		);
	}

	/*
	 * 主界面1
	 * */
	loadScrollView = () => {
		return (
			<View  style={{backgroundColor:'white'}}>

				{IS_ANDROID ? null : <StatusBar barStyle={'default'}/>}

				{/*//----------------------------------------------第 1 块view 新车订单授信----------------------------------------------*/}

				<View
					style={{width:width,height:Pixel.getPixel(250),alignItems:'center',backgroundColor:'white',marginTop:Pixel.getPixel(20)}}>
					<Text
						style={{color: 'black',fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34), lineHeight:24,marginTop:Pixel.getPixel(11)}}>
						金融
					</Text>

					<Image source={require('../mine/kuaisushouxin/kuaisushouxin_images/jinrongbeijinglanqian.png')}
					       style={{width:Pixel.getPixel(350),height:Pixel.getPixel(170),marginTop:Pixel.getPixel(24)}}>
						<View style={{marginTop:Pixel.getPixel(9),flexDirection:'row',alignItems:'flex-end',}}>
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(14),marginLeft:Pixel.getPixel(15)}}>
								新车订单授信

							</Text>
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(11),marginLeft:Pixel.getPixel(5)}}>
								在线
							</Text>
						</View>


						<View style={{marginTop:Pixel.getPixel(20),alignItems:'center',}}>
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(22),marginLeft:Pixel.getPixel(5)}}>
								新车平台订单融资
							</Text>

							<View style={{flexDirection:'row',marginTop:Pixel.getPixel(10)}}>
								<View  style={{borderColor:'rgba(255,255,255,0.42)',borderWidth:1,borderRadius:Pixel.getPixel(8),
							width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center'}}>
									<Text allowFontScaling={false}
									      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(10)}} >最长期限  长期</Text>
								</View>
								<View  style={{borderColor:'rgba(255,255,255,0.42)',borderWidth:1,borderRadius:Pixel.getPixel(8),
							width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center',marginLeft:Pixel.getPixel(10)}}>
									<Text allowFontScaling={false}
									      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(10)}} >最高额度  200万</Text>
								</View>

							</View>



							<TouchableOpacity  onPress ={()=>{this._applyCredit('xinchedingdan')}}
								style={{marginTop:Pixel.getPixel(20),backgroundColor:'rgba(255,255,255,0.30)',borderColor:'rgba(255,255,255,0.30)',borderWidth:1,borderRadius:Pixel.getPixel(13),
							width:Pixel.getPixel(85),height:Pixel.getPixel(27),alignItems:'center',justifyContent:'center'}}>
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:'white',fontSize: Pixel.getFontPixel(15)}} >立即申请</Text>
							</TouchableOpacity>

						</View>
					</Image>

				</View>

				{/*//----------------------------------------------第 2 块view 小额授信----------------------------------------------*/}

				<View style={{width:width,backgroundColor:'white',borderTopColor:'#F0EFF5',borderTopWidth:Pixel.getPixel(11)}}>
					<View style={{marginTop:Pixel.getPixel(9),flexDirection:'row',alignItems:'flex-end',}}>
						<Image source={require('../mine/kuaisushouxin/kuaisushouxin_images/kuaisu.png')} style={{width:Pixel.getPixel(18),height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(21)}}/>
						<Text allowFontScaling={false}
						      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(14),marginLeft:Pixel.getPixel(5)}}>
							小额授信
						</Text>
					</View>


					<View style={{marginTop:Pixel.getPixel(20),alignItems:'center',}}>
						<Text allowFontScaling={false}
						      style={{backgroundColor:'#00000000',color:fontAndColor.COLORB0,fontSize: Pixel.getFontPixel(22),marginLeft:Pixel.getPixel(5)}}>
							单车、采购贷、
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(22),marginLeft:Pixel.getPixel(5)}}>
								二手车订单融资
							</Text>
						</Text>

						<View style={{flexDirection:'row',marginTop:Pixel.getPixel(10)}}>
							<View  style={{borderColor:fontAndColor.COLORA1,borderWidth:1,borderRadius:Pixel.getPixel(8),
							width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center'}}>
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(11)}} >最长期限  12个月</Text>
							</View>
							<View  style={{borderColor:fontAndColor.COLORA1,borderWidth:1,borderRadius:Pixel.getPixel(8),
							width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center',marginLeft:Pixel.getPixel(10)}}>
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(11)}} >最高额度  50万</Text>
							</View>

						</View>
						{/*灰色的线*/}
						<View style={{backgroundColor:fontAndColor.COLORA4,width:Pixel.getPixel(width-30),
						height:Pixel.getPixel(1),marginTop:Pixel.getPixel(28)}}/>

						<TouchableOpacity  onPress ={()=>{this._applyCredit('kuaisu')}}
							style={{marginTop:Pixel.getPixel(0),backgroundColor:'white',
							width:width,height:Pixel.getPixel(39),alignItems:'center',justifyContent:'center'}}>
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(15)}} >立即申请</Text>
						</TouchableOpacity>

					</View>
				</View>

				{/*//----------------------------------------------第 3 块view 综合授信----------------------------------------------*/}

				<View style={{width:width,backgroundColor:'white',borderTopColor:'#F0EFF5',borderTopWidth:Pixel.getPixel(11)}}>
					<View style={{marginTop:Pixel.getPixel(9),flexDirection:'row',alignItems:'flex-end',}}>
						<Image source={require('../mine/kuaisushouxin/kuaisushouxin_images/zonghe.png')} style={{width:Pixel.getPixel(18),height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(21)}}/>
						<Text allowFontScaling={false}
						      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(14),marginLeft:Pixel.getPixel(5)}}>
							综合授信
						</Text>
						<Text allowFontScaling={false}
						      style={{backgroundColor:'#00000000',color:fontAndColor.COLORA4,fontSize: Pixel.getFontPixel(11),marginLeft:Pixel.getPixel(5)}}>
							在线
						</Text>
					</View>


					<View style={{marginTop:Pixel.getPixel(20),alignItems:'center',}}>
						<Text allowFontScaling={false}
						      style={{backgroundColor:'#00000000',color:fontAndColor.COLORB0,fontSize: Pixel.getFontPixel(22),marginLeft:Pixel.getPixel(5)}}>
							库容、单车融资
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(22),marginLeft:Pixel.getPixel(5)}}>
								等平台内全业务
							</Text>
						</Text>

						<View style={{flexDirection:'row',marginTop:Pixel.getPixel(10)}}>
							<View  style={{borderColor:fontAndColor.COLORA1,borderWidth:1,borderRadius:Pixel.getPixel(8),
							width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center'}}>
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(11)}} >最长期限  12个月</Text>
							</View>
							<View  style={{borderColor:fontAndColor.COLORA1,borderWidth:1,borderRadius:Pixel.getPixel(8),
							width:Pixel.getPixel(95),height:Pixel.getPixel(16),alignItems:'center',justifyContent:'center',marginLeft:Pixel.getPixel(10)}}>
								<Text allowFontScaling={false}
								      style={{backgroundColor:'#00000000',color:fontAndColor.COLORA1,fontSize: Pixel.getFontPixel(11)}} >最高额度  5000万</Text>
							</View>

						</View>
						{/*灰色的线*/}
						<View style={{backgroundColor:fontAndColor.COLORA4,width:Pixel.getPixel(width-30),
						height:Pixel.getPixel(1),marginTop:Pixel.getPixel(28)}}/>

						<TouchableOpacity  onPress ={()=>{this._applyCredit('zonghe')}}
							style={{marginTop:Pixel.getPixel(0),backgroundColor:'white',
							width:width,height:Pixel.getPixel(39),alignItems:'center',justifyContent:'center'}}>
							<Text allowFontScaling={false}
							      style={{backgroundColor:'#00000000',color:'black',fontSize: Pixel.getFontPixel(15)}} >立即申请</Text>
						</TouchableOpacity>


					</View>



				</View>
				{/*灰色的线*/}
				<View style={{backgroundColor:'#F0EFF5',width:Pixel.getPixel(width),
						height:Pixel.getPixel(1000),marginTop:Pixel.getPixel(0)}}/>
			</View>
		)
	}
	/*
	 * 主界面2
	 * */
	loadScrollViewSuccess = () => {
		return (
			<ScrollView keyboardDismissMode={IS_ANDROID?'none':'on-drag'} contentContainerStyle={{alignItems:'center'}}
			            scrollEnabled={false}>
				<Image
					source={require('../mine/kuaisushouxin/kuaisushouxin_images/kuaisu.png')}
					style={{
                            width: Pixel.getPixel(170),
                            height: Pixel.getPixel(119),
                            resizeMode: 'stretch',
                            marginTop:Pixel.getPixel(65),

                        }}
				/>

				<Text allowFontScaling={false} style={{
				    marginTop:Pixel.getPixel(20),
					fontSize: Pixel.getFontPixel(20),
					color: 'black'

				}}>申请提交成功</Text>
				<Text allowFontScaling={false} style={{
					fontSize: Pixel.getFontPixel(14),
					color: 'gray',
					marginTop:Pixel.getPixel(10),

				}}>专属市场经理将会尽快与您联系！</Text>

			</ScrollView>
		)
	}
	_applyCredit = (type) => {
		if(type == 'xinchedingdan'){
			this.toNextPage({
				name: 'Authentication',
				component: Authentication,
				params: {
					FromScene:'xinchedingdan'
				},
			})
		}
		if(type == 'kuaisu'){
			this.toNextPage({
				name: 'Authentication',
				component: Authentication,
				params: {
					FromScene:'kuaisu'
				},
			})
		}
		if(type == 'zonghe'){
			this.toNextPage({
				name: type,
				component: type,
				params: {},
			})
		}


	}

}

const styles = StyleSheet.create({
	parentStyle: {
		flex: 1
	},
	childStyle: {
		width: width,
		height: height
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: Pixel.getPixel(0),
	},
	fillSpace: {
		flex: 1,
		marginTop: Pixel.getPixel(30)
	},
	btnOk: {
		height: Pixel.getPixel(44),
		marginHorizontal: Pixel.getPixel(15),
		backgroundColor: fontAndColor.COLORB0,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: Pixel.getPixel(15),
		borderRadius: Pixel.getFontPixel(2),
	},
	btnFont: {
		fontSize: Pixel.getFontPixel(15),
		color: 'white'
	},
});

