/**
 * Created by yujinzhong on 2017/10/30.
 */
import React from 'react';
import {
	View,
	Image,
	Text,
	TextInput,
	StyleSheet,
	Platform,
	NativeModules,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Dimensions,
	TouchableWithoutFeedback,
}from 'react-native';
let {width} = Dimensions.get('window');

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import * as AppUrls from "../../constant/appUrls";
import ImagePicker from "react-native-image-picker";

import * as FontAndColor from "../../constant/fontAndColor";
import MyButton from "../../component/MyButton";
import ProvinceListScene from "../../carSource/ProvinceListScene";
import ImageSourceSample from "../../publish/component/ImageSourceSample";
import * as ImageUpload from "../../utils/ImageUpload";

const Pixel = new PixelUtil();
const selectImg = require('../../../images/financeImages/celljiantou.png');
const IS_ANDROID = Platform.OS === 'android';
let idHandle:'';
let idcardfront: '';
let idcardback: '';
let businessid: '';
const options = {
	//弹出框选项
	title: '请选择',
	cancelButtonTitle: '取消',
	takePhotoButtonTitle: '拍照',
	chooseFromLibraryButtonTitle: '选择相册',
	allowsEditing: false,
	noData: false,
	quality: 1.0,
	maxWidth: 480,
	maxHeight: 800,
	storageOptions: {
		skipBackup: true,
		path: 'images',
	}
};
export default class EnterpriseCertificate extends BaseComponent {
	componentWillUnmount(){
		this.timer && clearTimeout(this.timer);
	}
	constructor(props) {
		super(props);
		this.enterpriseData = {
			zhuceren_name: '',//注册人姓名
			zhuceren_IDNo: '',//注册人身份证号

			enterprise_name: '',//企业负责人姓名
			enterprise_tel: '',//企业负责人手机号

			enterprise_IDNo: '',//企业负责人身份证号

			businessLicense_IDNo: '',//营业执照号

		};

		this.state = {

			business_home: '请选择',//商户所在地

			enterpriseHandle: null,//手持照片
			enterpriseFront: null,//正面照片
			enterpriseBack: null,//反面照片

			businessLicense: null,//营业执照照片

			keyboardOffset: -Pixel.getPixel(64),
		};

	}

	initFinish = () => {

	};

	_showLoading = () => {
		this.props.showModal(true);
	};

	_closeLoading = () => {
		this.props.showModal(false);
	};

	//提示信息
	_showHint = (hint) => {
		this.props.showToast(hint);
	};
	_zhucerenChange = (text) => {
		this.enterpriseData.zhuceren_name = text;
	};

	_shenfenzhengChange = (text) => {
		this.enterpriseData.zhuceren_IDNo = text;
	};
	_qiyerenChange = (text) => {
		this.enterpriseData.enterprise_name = text;
	};
	_shoujihaoChange = (text) => {
		this.enterpriseData.enterprise_tel = text;
	};
	_qiyeshenfenzhengChange = (text) => {
		this.enterpriseData.enterprise_IDNo = text;
	};
	_zhizhaohaoChange = (text) => {
		this.enterpriseData.businessLicense_IDNo = text;
	};
	/*
	 * 商户所在地点击
	 * */
	_onCityPress = () => {
		let navigatorParams = {
			name: "ProvinceListScene",
			component: ProvinceListScene,
			params: {
				checkedCityClick: this._checkedCityClick,
				isSelectProvince: false,//如果为true，可以选择省,false,只能选择市
			}
		}
		this.toNextPage(navigatorParams);
	};

	_checkedCityClick = (cityType) => {
		this.setState(
			{
				business_home: cityType.city_name
			}
		);

		// this.refs.cityView.setContent(cityType.city_name);
		// this.props.screeningObject.checkedCity.title = cityType.city_name;
		// this.props.screeningObject.checkedCity.city_id = cityType.city_id;
		// this.props.screeningObject.checkedCity.provice_id = cityType.provice_id;
	}
	/*
	 * 导航栏左侧按钮点击
	 * */
	_onBack = () => {
		this.backPage();
	};
	/*
	 * 更换银行卡点击
	 * */
	_onChangeBankPress = () => {

		if (this.isEmpty(this.enterpriseData.zhuceren_name) === true) {
			this._showHint('请填写注册人姓名');
			return;
		}
		if (this.isEmpty(this.enterpriseData.zhuceren_IDNo) === true) {
			this._showHint('请填写注册人身份证号');
			return;
		}
		if (this.enterpriseData.zhuceren_IDNo.length != 18) {
			this._showHint('请填写有效的注册人身份证号');
			return;
		}
		if (this.isEmpty(this.enterpriseData.enterprise_name) === true) {
			this._showHint('请填写企业负责人姓名');
			return;
		}
		if (this.isEmpty(this.enterpriseData.enterprise_tel) === true) {
			this._showHint('请填写企业负责人手机号');
			return;
		}
		if (this.enterpriseData.enterprise_tel.length != 11) {
			this._showHint('请填写有效的企业负责人手机号');
			return;
		}
		if (this.state.business_home === '请选择') {
			this._showHint('请选择商户经营所在地');
			return;
		}
		if (this.isEmpty(idHandle) === true) {
			this._showHint('请上传企业负责人手持身份证');
			return;
		}
		if (this.isEmpty(idcardfront) === true) {
			this._showHint('请上传企业负责人身份证正面');
			return;
		}
		if (this.isEmpty(idcardback) === true) {
			this._showHint('请上传企业负责人身份证反面');
			return;
		}
		if (this.isEmpty(this.enterpriseData.enterprise_IDNo) === true) {
			this._showHint('请填写企业负责人身份证号');
			return;
		}
		if (this.enterpriseData.enterprise_IDNo.length != 18) {
			this._showHint('请填写有效的企业负责人身份证号');
			return;
		}
		if (this.isEmpty(businessid) === true) {
			this._showHint('请上传营业执照');
			return;
		}
		if (this.isEmpty(this.enterpriseData.businessLicense_IDNo) === true) {
			this._showHint('请填写营业执照号/注册号');
			return;
		}

	};

	render() {
		return (
			<View style={styles.container}>
				{
					IS_ANDROID ? (this.loadScrollView()) : (
							<KeyboardAvoidingView behavior={'position'}
							                      keyboardVerticalOffset={this.state.keyboardOffset}>
								{
									this.loadScrollView()
								}
							</KeyboardAvoidingView>
						)
				}
				{/*导航栏view*/}
				<AllNavigationView
					backIconClick={this._onBack}
					title='企业认证'
				/>
				{/*拍照选择modal  view*/}
				<ImageSourceSample

					galleryClick={this._photoClick}
					cameraClick={this._cameraClick}
					ref={(modal) => {
                                     this.imageSource = modal
                                 }}/>
				{/*上传图片转圈 view*/}
				{this.loadingView()}

			</View>
		)
	}
	/*
	 * 主界面
	 * */
	loadScrollView = () => {
		return (
			<ScrollView keyboardDismissMode={IS_ANDROID?'none':'on-drag'}>


				{/*提示语view*/}
				<View
					style={{width:width,height:Pixel.getPixel(36),flexDirection:'row',alignItems:'center',marginTop:Pixel.getPixel(0),backgroundColor:'#FFF8EA'}}>
					<Image source={require('../../../images/login/tishi.png')}
					       style={{width:Pixel.getPixel(18),height:Pixel.getPixel(18),marginLeft:Pixel.getPixel(15),}}/>
					<Text style={{color:'#FA5741',marginLeft:Pixel.getPixel(5),fontSize:Pixel.getPixel(14)}}>
						平台将对提交的资料进行审核，请确保内容真实有效
					</Text>
				</View>

				{/*注册人view*/}
				<View style={styles.itemBackground}>
					<Text allowFontScaling={false} style={styles.leftFont}>注册人</Text>
					<TextInput
						ref={(input) => {
                                this.zhucerenInput = input
                            }}
						style={[styles.inputHintFont, styles.fillSpace]}
						underlineColorAndroid='transparent'
						onChangeText={this._zhucerenChange}
						placeholder='请输入'
						placeholderTextColor={fontAndColor.COLORA1}
						onFocus={()=>{
                                       this.setState({
                                           keyboardOffset:-Pixel.getPixel(300)
                                       });
                                   }}
						onBlur={()=>{
                                       this.setState({
                                           keyboardOffset:Pixel.getPixel(64)
                                       });
                                   }}
					/>
				</View>
				<View style={styles.splitItem}/>

				{/*注册人身份证号view*/}
				<View style={styles.itemBackground}>
					<Text allowFontScaling={false} style={styles.leftFont}>注册人身份证号</Text>
					<TextInput
						ref={(input) => {
                                this.zhuceshenfenzhengInput = input
                            }}
						style={[styles.inputHintFont, styles.fillSpace]}
						underlineColorAndroid='transparent'
						onChangeText={this._shenfenzhengChange}
						placeholder='请输入'
						placeholderTextColor={fontAndColor.COLORA1}
						onFocus={()=>{
                                       this.setState({
                                           keyboardOffset:-Pixel.getPixel(300)
                                       });
                                   }}
						onBlur={()=>{
                                       this.setState({
                                           keyboardOffset:Pixel.getPixel(64)
                                       });
                                   }}
					/>
				</View>


				<View style={{width:width,height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3}}/>
				{/*企业负责人姓名view*/}
				<View style={styles.itemBackground}>
					<Text allowFontScaling={false} style={styles.leftFont}>企业负责人姓名</Text>
					<TextInput
						ref={(input) => {
                                this.qiyenameInput = input
                            }}
						style={[styles.inputHintFont, styles.fillSpace]}
						underlineColorAndroid='transparent'
						onChangeText={this._qiyerenChange}
						placeholder='请输入'
						placeholderTextColor={fontAndColor.COLORA1}
						onFocus={()=>{
                                       this.setState({
                                           keyboardOffset:-Pixel.getPixel(300)
                                       });
                                   }}
						onBlur={()=>{
                                       this.setState({
                                           keyboardOffset:Pixel.getPixel(64)
                                       });
                                   }}
					/>
				</View>
				<View style={styles.splitItem}/>


				{/*企业负责人手机号view*/}
				<View style={styles.itemBackground}>
					<Text allowFontScaling={false} style={styles.leftFont}>企业负责人手机号</Text>
					<TextInput
						ref={(input) => {
                                this.qiyeshoujihaoInput = input
                            }}
						style={[styles.inputHintFont, styles.fillSpace]}
						underlineColorAndroid='transparent'
						onChangeText={this._shoujihaoChange}
						placeholder='请输入'
						placeholderTextColor={fontAndColor.COLORA1}
						onFocus={()=>{
                                       this.setState({
                                           keyboardOffset:-Pixel.getPixel(300)
                                       });
                                   }}
						onBlur={()=>{
                                       this.setState({
                                           keyboardOffset:Pixel.getPixel(64)
                                       });
                                   }}
					/>
				</View>
				<View style={styles.splitItem}/>
				{/*商户经营所在地view*/}
				<View style={styles.itemBackground}>
					<Text allowFontScaling={false} style={styles.leftFont}>商户经营所在地</Text>
					<View style={styles.fillSpace}/>
					<TouchableOpacity onPress={this._onCityPress}>
						<View style={styles.rightContainer}>
							<Text allowFontScaling={false}
							      ref='business_home'
							      style={styles.selectHintFont}>{this.state.business_home}</Text>


							<Image style={styles.selectImage} source={selectImg}/>
						</View>
					</TouchableOpacity>
				</View>

				<View style={{width:width,height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3}}/>


				{/*企业负责人身份证照片3张view*/}
				<TouchableWithoutFeedback onPress={() => dismissKeyboard() }>
					<View style={{width: width,height: Pixel.getPixel(118),
							backgroundColor: '#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15), }}>

						<Text allowFontScaling={false} style={{
                                    flex: 1,
                                    color: 'black',
                                    fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT),
                                    marginTop:Pixel.getPixel(12),

                                }}>
							企业负责人身份证照片
						</Text>
						<View style={{flexDirection: 'row'}}>
							<View style={{flex:1}}/>
							<View>
								<MyButton buttonType={MyButton.IMAGEBUTTON}
								          content={this.state.enterpriseHandle === null ?
                                                  require('../../../images/login/id_handle.png') : this.state.enterpriseHandle
                                              }
								          parentStyle={{ marginTop: Pixel.getPixel(10),marginBottom: Pixel.getPixel(10),marginLeft: Pixel.getPixel(10),}}
								          childStyle={{width: Pixel.getPixel(80),height: Pixel.getPixel(60),resizeMode: 'contain'}}
								          mOnPress={()=>{this.selectPhotoTapped('enterpriseHandle')}}/>
								{this.state.enterpriseHandle ?
									<MyButton buttonType={MyButton.IMAGEBUTTON}
									          content={require('../../../images/login/clear.png')}
									          parentStyle={{
                                                      position: 'absolute',
                                                      marginTop: Pixel.getPixel(2),
                                                      marginLeft: Pixel.getPixel(2),
                                                  }}
									          childStyle={{width: Pixel.getPixel(17),height: Pixel.getPixel(17),}}
									          mOnPress={() => {
                                                      this.setState({
                                                          enterpriseHandle: null
                                                      });
                                                  }}/>
									: null}
							</View>
							<View>
								<MyButton buttonType={MyButton.IMAGEBUTTON}
								          content={this.state.enterpriseFront === null ?
                                                  require('../../../images/login/idcard.png') : this.state.enterpriseFront
                                              }
								          parentStyle={{ marginTop: Pixel.getPixel(10),marginBottom: Pixel.getPixel(10),marginLeft: Pixel.getPixel(10),}}
								          childStyle={{width: Pixel.getPixel(80),height: Pixel.getPixel(60),resizeMode: 'contain'}}
								          mOnPress={()=>{this.selectPhotoTapped('enterpriseFront')}}/>
								{this.state.enterpriseFront ?
									<MyButton buttonType={MyButton.IMAGEBUTTON}
									          content={require('../../../images/login/clear.png')}
									          parentStyle={{
                                                      position: 'absolute',
                                                      marginTop: Pixel.getPixel(2),
                                                      marginLeft: Pixel.getPixel(2),
                                                  }}
									          childStyle={{width: Pixel.getPixel(17),height: Pixel.getPixel(17),}}
									          mOnPress={() => {
                                                      this.setState({
                                                          enterpriseFront: null
                                                      });
                                                  }}/>
									: null}
							</View>
							<View>
								<MyButton buttonType={MyButton.IMAGEBUTTON}
								          content={this.state.enterpriseBack === null ?
                                                  require('../../../images/login/idcard_back.png') : this.state.enterpriseBack
                                              }
								          parentStyle={{ marginTop: Pixel.getPixel(10),marginBottom: Pixel.getPixel(10),marginLeft: Pixel.getPixel(10),}}
								          childStyle={{width: Pixel.getPixel(80),height: Pixel.getPixel(60),resizeMode: 'contain'}}
								          mOnPress={()=>{this.selectPhotoTapped('enterpriseBack')}}/>
								{this.state.enterpriseBack ?
									<MyButton buttonType={MyButton.IMAGEBUTTON}
									          content={require('../../../images/login/clear.png')}
									          parentStyle={{
                                                      position: 'absolute',
                                                      marginTop: Pixel.getPixel(2),
                                                      marginLeft: Pixel.getPixel(2),
                                                  }}
									          childStyle={{width: Pixel.getPixel(17),height: Pixel.getPixel(17),}}
									          mOnPress={() => {
                                                      this.setState({
                                                          enterpriseBack: null
                                                      });
                                                  }}/>
									: null}
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
				<View style={styles.splitItem}/>

				{/*企业负责人身份证号view*/}
				<View style={styles.itemBackground}>
					<Text allowFontScaling={false} style={styles.leftFont}>企业负责人身份证号</Text>
					<TextInput
						ref={(input) => {
                                this.shenfenzhengInput = input
                            }}
						style={[styles.inputHintFont, styles.fillSpace]}
						underlineColorAndroid='transparent'
						onChangeText={this._qiyeshenfenzhengChange}
						placeholder='请输入'
						placeholderTextColor={fontAndColor.COLORA1}
						onFocus={()=>{
                                      this.setState({
                                          keyboardOffset:Pixel.getPixel(0)
                                      });
                                  }}
						onBlur={()=>{
                                      this.setState({
                                          keyboardOffset:-Pixel.getPixel(64)
                                      });
                                  }}

					/>
				</View>
				<View style={{width:width,height:Pixel.getPixel(10),backgroundColor:fontAndColor.COLORA3}}/>
				{/*营业执照片view*/}
				<TouchableWithoutFeedback onPress={() => dismissKeyboard() }>
					<View style={{width: width,height: Pixel.getPixel(88),flexDirection: 'row',alignItems: 'center',
							backgroundColor: '#ffffff',paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15), }}>

						<Text allowFontScaling={false} style={{
                                    flex: 1,
                                    color: 'black',
                                    fontSize: Pixel.getFontPixel(FontAndColor.LITTLEFONT)
                                }}>
							营业执照
						</Text>
						<View>
							<MyButton buttonType={MyButton.IMAGEBUTTON}
							          content={this.state.businessLicense === null ?
                                                  require('../../../images/login/idcard.png') : this.state.businessLicense
                                              }
							          parentStyle={{ marginTop: Pixel.getPixel(10),marginBottom: Pixel.getPixel(10),marginLeft: Pixel.getPixel(10),}}
							          childStyle={{width: Pixel.getPixel(80),height: Pixel.getPixel(60),resizeMode: 'contain'}}
							          mOnPress={()=>{this.selectPhotoTapped('businessLicense')}}/>
							{this.state.businessLicense ?
								<MyButton buttonType={MyButton.IMAGEBUTTON}
								          content={require('../../../images/login/clear.png')}
								          parentStyle={{
                                                      position: 'absolute',
                                                      marginTop: Pixel.getPixel(2),
                                                      marginLeft: Pixel.getPixel(2),
                                                  }}
								          childStyle={{width: Pixel.getPixel(17),height: Pixel.getPixel(17),}}
								          mOnPress={() => {
                                                      this.setState({
                                                          businessLicense: null
                                                      });
                                                  }}/>
								: null}

						</View>
					</View>
				</TouchableWithoutFeedback>
				<View style={styles.splitItem}/>
				{/*营业执照号/注册号view*/}
				<View style={[styles.itemBackground,{height:Pixel.getPixel(60)}]}>
					<View>
						<Text allowFontScaling={false} style={styles.leftFont}>营业执照号/注册号</Text>
						<Text allowFontScaling={false} style={[styles.leftFont,
								{color:'gray',fontSize:Pixel.getPixel(12),marginTop:Pixel.getPixel(3)}]}>三证合一使用信用代码证</Text>
					</View>

					<TextInput
						ref={(input) => {
                                this.zhizhaohaoInput = input
                            }}
						style={[styles.inputHintFont, styles.fillSpace]}
						underlineColorAndroid='transparent'
						onChangeText={this._zhizhaohaoChange}
						placeholder='请输入'
						placeholderTextColor={fontAndColor.COLORA1}
						onFocus={()=>{
                                      this.setState({
                                          keyboardOffset:Pixel.getPixel(0)
                                      });
                                  }}
						onBlur={()=>{
                                      this.setState({
                                          keyboardOffset:-Pixel.getPixel(64)
                                      });
                                  }}
					/>

				</View>
				<View style={{width:width,height:Pixel.getPixel(30),backgroundColor:fontAndColor.COLORA3}}/>

				{/*更换银行卡view*/}
				<View style={styles.fillSpace}>
					<TouchableOpacity style={styles.btnOk} activeOpacity={0.6} onPress={this._onChangeBankPress}>
						<Text allowFontScaling={false} style={styles.btnFont}>更换银行卡</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
	isEmpty = (str) => {
		if (typeof(str) != 'undefined' && str !== '') {
			return false;
		} else {
			return true;
		}
	};
	/*
	 * 弹出蒙版
	 * */
	selectPhotoTapped = (id) => {
		this.id = id;
		this._rePhoto(id);
	}
	_rePhoto = (ID) => {
		if (ID === 'businessLicense') {
			this.imageSource.openModal('', '', null);

		}
		if (ID === 'enterpriseHandle') {
			this.imageSource.openModal(ID, '手持身份证件示例', require('./../../../images/login/holdSample.png'));

		}
		if (ID === 'enterpriseFront') {
			this.imageSource.openModal(ID, '身份证正面示例', require('./../../../images/login/frontSample.png'));

		}
		if (ID === 'enterpriseBack') {
			this.imageSource.openModal(ID, '身份证反面示例', require('./../../../images/login/backSample.png'));

		}

	};

	/*
	* 相机点击
	* */
	_cameraClick = () => {
		this.timer = setTimeout(
			() => {
				ImagePicker.launchCamera(options, (response) => {
					if (response.didCancel) {
					} else if (response.error) {
					} else if (response.customButton) {
					} else {
						this.uploadImage(response, this.id);
					}
				});
			},
			200
		);


	}

	/*
	* 相册点击
	* */
	_photoClick = () => {
		this.timer = setTimeout(
			() => {
				ImagePicker.launchImageLibrary(options, (response) => {
					if (response.didCancel) {
					} else if (response.error) {
					} else if (response.customButton) {
					} else {
						this.uploadImage(response, this.id);
					}
				});
			},
			200
		);

	}
	/*
	 * 图片上传
	 * */
	uploadImage = (response, id) => {
		let params = {
			base64_file: 'data:image/jpeg;base64,' + encodeURI(response.data).replace(/\+/g, '%2B')
		};
		// this.props.showModal(true);
		this.setState({
			loading: true,
		});
		ImageUpload.request(AppUrls.AUTH_UPLOAD_FILE, 'Post', params)
			.then((response) => {
				// this.props.showModal(false);
				this.setState({
					loading: false,
				});
				if (response.mycode == 1) {
					let source = {uri: response.mjson.data.url};
					if (id === 'enterpriseFront') {
						idcardfront = response.mjson.data.file_id;
						if (idcardfront != "") {
							this.setState({
								enterpriseFront: source
							});
						} else {
							this.props.showToast("id 为空 图片上传失败");
						}
					} else if (id === 'enterpriseBack') {
						idcardback = response.mjson.data.file_id;
						if (idcardback != "") {
							this.setState({
								enterpriseBack: source
							});
						} else {
							this.props.showToast("id 为空 图片上传失败");
						}
					}else if (id === 'enterpriseHandle') {
						idHandle = response.mjson.data.file_id;
						if (idHandle != "") {
							this.setState({
								enterpriseHandle: source
							});
						} else {
							this.props.showToast("id 为空 图片上传失败");
						}
					}else if (id === 'businessLicense') {
						businessid = response.mjson.data.file_id;
						if (businessid != "") {
							this.setState({
								businessLicense: source
							});
						} else {
							this.props.showToast("id 为空 图片上传失败");
						}
					}
				} else {
					this.props.showToast(response.mjson.msg + "!");
				}
			}, (error) => {
				// this.props.showModal(false);
				this.setState({
					loading: false,
				});
				this.props.showToast("图片上传失败");
			});
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: Pixel.getPixel(64),
	},
	alignTop: {
		marginTop: Pixel.getPixel(59)
	},
	alignItem: {
		marginTop: Pixel.getPixel(10)
	},
	itemBackground: {
		flexDirection: 'row',
		height: Pixel.getPixel(44),
		backgroundColor: 'white',
		paddingHorizontal: Pixel.getPixel(15),
		alignItems: 'center'
	},
	splitItem: {
		height: Pixel.getPixel(0.5),
		backgroundColor: fontAndColor.COLORA4,
		marginLeft: Pixel.getPixel(15),
		marginRight: Pixel.getPixel(15),
	},
	leftFont: {
		fontSize: Pixel.getFontPixel(14),
		color: 'black'
	},
	fillSpace: {
		flex: 1
	},
	selectHintFont: {
		fontSize: Pixel.getFontPixel(14),
		color: fontAndColor.COLORA2,
		textAlign: 'right'
	},
	inputHintFont: {
		fontSize: Pixel.getFontPixel(14),
		color: 'black',
		textAlign: 'right'
	},
	selectImage: {
		height: Pixel.getPixel(16),
		width: Pixel.getPixel(9),
		marginLeft: Pixel.getPixel(13)
	},
	scanImage: {
		height: Pixel.getPixel(18),
		width: Pixel.getPixel(18),
		marginLeft: Pixel.getPixel(8)
	},
	rightContainer: {
		height: Pixel.getPixel(44),
		flexDirection: 'row',
		alignItems: 'center'
	},
	rightHintFont: {
		fontSize: Pixel.getFontPixel(14),
		color: 'black',
		marginLeft: Pixel.getPixel(8)
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