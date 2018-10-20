/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    AppRegistry,
} from 'react-native';

import Root from './app/root';
import OpenPersonalCountScene from './app/mine/accountManage/guangfa_account/open_count/OpenPersonalCountScene';
import OpenCompanyCountScene from './app/mine/accountManage/guangfa_account/open_count/OpenCompanyCountScene';
import ACCountManageScene from './app/mine/accountManage/guangfa_account/count_detail/ACCountManageScene';
import AuthenticatePublicScene from './app/mine/accountManage/guangfa_account/count_detail/AuthenticatePublicScene';
import IndexAccountmanageScene from './app/mine/accountManage/guangfa_account/count_detail/IndexAccountmanageScene';
import RechargeScene from './app/mine/accountManage/guangfa_account/count_detail/RechargeScene';
AppRegistry.registerComponent('FE_Sass', () => RechargeScene);


