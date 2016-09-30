import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Navigator,
  Alert,
  ActivityIndicator
} from 'react-native';

import {
    fetchAccessToken,
    loginStatus
} from '../../actions/userAction.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingTop: 80
    },
    description: {
        textAlign: 'center',
        fontSize: 20,
        color: '#80bd01',
        marginBottom: 20
    },
    username: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    accessToken: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    Input: {
        height: 36,
        flex: 1,
        padding: 5,
        borderRadius: 3,
        borderColor: '#ddd',
        borderWidth: 1
    },
    loginContainer: {
        flexDirection: 'row'
    },
    buttonWrap: {
        height: 45,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#08c',
        borderColor: '#08c',
        borderWidth: 1,
        borderRadius: 3,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
        margin: 10,
        marginLeft: 30,
        marginRight: 30,
        padding: 10
    },
    freeLoginContainer: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 50
    },
    freeLogin: {
        color: '#333',
        fontWeight: 'bold'
    },
    button: {
        textAlign: 'center',
        fontSize: 20,
        color: '#ffffff'
    }
});

const LoginStatus = ['logout', 'onLogining', 'logined', 'onLogout'];

export default class LoginComponent extends Component {
    constructor (props) {
        super(props);

        this.state = {
            loginStatus: LoginStatus[0],
            username: 'xiaofuzi',
            accessToken: 'aa'
        }
    }

    canLogin = true;

    onLogin = (e) => {
        if (!this.canLogin) {
            //console.error('Can not login now!');
            return ;
        }

        let isLogined = this._loginParamCheck();
        if (isLogined) {
            this.props.dispatch(fetchAccessToken({
                method: 'POST',
                data: {
                    accesstoken: '0630f3d5-7d78-4b66-9d79-9552c228143b'//this.state.accesstoken
                }
            }))  
        }
    }

    onUsernameChange = (e) => {
        this.setState({
            username: e.value
        })
    }

    onAccessTokenChange = (e) => {
        this.setState({
            accessToken: e.value
        })
    }

    _loginParamCheck () {
        let msg = '', isLogined = false;
        if (this.state.username===''&&this.state.accessToken==='') {
            msg = '请输入用户名和accessToken!';
        } else if (this.state.username==='') {
            msg = '请输入用户名!';
        } else if (this.state.accessToken==='') {
            msg = '请输入accessToken!';
        } else {
            isLogined = true;
            this.setState({
                isLogined: true
            })
        }

        if (isLogined) {
            return true;
        } else {
            Alert.alert('', msg);
            return false;
        }
    }

    componentWillReceiveProps (nextProps) {
        let data = nextProps.userData.accesstokenInfo;
        if (data) {
            if (data.success == true) {
                if (this.state.username == data.loginname) {
                    this.setState({loginStatus: LoginStatus[2]});
                    this.props.dispatch(loginStatus({
                        username: data.loginname,
                        accesstoken: this.state.accessToken,
                        avatar_url: data.avatar_url,
                        id: data.id,
                        success: data.success 
                    }))
                } else {
                    this.setState({loginStatus: LoginStatus[0]});
                    this.canLogin = true;
                    Alert.alert('', 'accesstoken 与用户名不匹配!');                    
                }
            } else if (data.success == false) {
                this.canLogin = true;
                this.setState({loginStatus: LoginStatus[0]});
                Alert.alert('', data.error_msg || 'accesstoken不存在!');
            }
        }
    }

    renderLoading () {
        return this.state.loginStatus == LoginStatus[1] ? (<ActivityIndicator size='small'/>) : (<View />)
    }

    render () { 
        return (
            <View style={styles.container}>
                <Text style={styles.description}>登录可以享受更多功能</Text>
                <View style={styles.username}>
                    <TextInput
                        style={styles.Input}
                        autoCapitalize="none"
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                        placeholder='用户名'/>
                </View>
                <View style={styles.accessToken}>
                    <TextInput
                        style={styles.Input}
                        autoCapitalize="none"
                        value={this.state.accessToken}
                        onChange={this.onAccessTokenChange}
                        placeholder='该用户对应的 accessToken'/>
                </View>
                <View style={styles.loginContainer}>
                    <TouchableHighlight
                        style={styles.buttonWrap}
                        underlayColor='#99d9f4'
                        onPress={this.onLogin}>
                        <Text style={styles.button}>登录</Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight style={styles.freeLoginContainer}>
                    <Text style={styles.freeLogin}>免验证></Text>
                </TouchableHighlight>
                {this.renderLoading()}
            </View>
            )
    }
}