import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    Animated,
    View,
    Text
} from 'react-native';
import {
    InputItem,
    Button,
    WhiteSpace,
    WingBlank,
    Toast
} from 'antd-mobile';
import {
    trimString
} from '../utils/ToolUtils';

const { width: Width, height: Height } = Dimensions.get('window');

const propTypes = {
    entranceActions: PropTypes.object,
    entrance: PropTypes.object.isRequired
};

const contextTypes = {
    routes: PropTypes.object.isRequired
};

class Entrance extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        console.warn(params.viewState);

        this.state = {
            viewState: params.viewState, // 0 register 1 login
            translateReg: new Animated.Value(params.viewState === 0 ? 0 : Width),
            translateLog: new Animated.Value(params.viewState === 1 ? 0 : Width),
            isLoading: false,
            mobileValue: '',
            pswdValue: '',
            pswdCfmValue: ''
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {
        const { entrance } = this.props;
        const { entrance: nextEntrance } = nextProps;
        console.warn('currect entrance is = ', entrance, '    next entrance is = ', nextEntrance);
        if (entrance.isLogin || entrance.isRegister) {
            return;
        }
        if (entrance.isLoading != nextEntrance.isLoading) {
            this.setState({
                isLoading: nextEntrance.isLoading
            })
        }
        if (entrance.isLoading && !nextEntrance.isLoading) {
            if (!entrance.isRegister && nextEntrance.isRegister) {
                Toast.success('注册成功');
            }
            if (!entrance.isLogin && nextEntrance.isLogin) {
                Toast.success('登陆成功');
            }
            if (nextEntrance.payload && typeof (nextEntrance.payload) === 'string') {
                Toast.fail(nextEntrance.payload);
            }
        }
    }

    checkIsMobile(str) {
        let regExp = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
        return regExp.test(str);
    }

    onRegisterClick() {
        const { navigate } = this.props.navigation;
        navigate('Home');
        //routes.initialSetting();
        /*const mobileValue = this.state.mobileValue;
        const trimStr = trimString(mobileValue);
        if (this.state.mobileValue.length <= 0) {
            Toast.fail('请填写您的手机号码');
        } else if (this.state.pswdValue.length <= 0) {
            Toast.fail('请填写您的密码');
        } else if (this.state.pswdCfmValue.length <= 0) {
            Toast.fail('请确认您的密码');
        } else if (!this.checkIsMobile(trimStr)) {
            Toast.fail('您输入的手机号码格式不正确');
        } else if (this.state.pswdValue !== this.state.pswdCfmValue) {
            Toast.fail('您输入的两个密码不一致');
        } else {
            const { entranceActions } = this.props;
            entranceActions.fetchRegister(trimStr, this.state.pswdValue, this.state.pswdCfmValue);
        }*/
    }

    onLoginClick() {
        const mobileValue = this.state.mobileValue;
        const trimStr = trimString(mobileValue);
        if (this.state.mobileValue.length <= 0) {
            Toast.fail('请填写您的手机号码');
        } else if (this.state.pswdValue.length <= 0) {
            Toast.fail('请填写您的密码');
        } else if (!this.checkIsMobile(trimStr)) {
            Toast.fail('您输入的手机号码格式不正确');
        } else {
            const { entranceActions } = this.props;
            entranceActions.fetchLogin(trimStr, this.state.pswdValue);
        }

    }

    changeState(state) {
        this.setState({
            viewState: state,
            mobileValue: '',
            pswdValue: '',
            pswdCfmValue: ''
        })
        let inAnim = state === 0 ? this.state.translateReg : this.state.translateLog;
        let outAnim = state === 0 ? this.state.translateLog : this.state.translateReg;
        Animated.parallel([
            Animated.timing(inAnim, {
                toValue: 0,
                duration: 500
            }),
            Animated.sequence([
                Animated.timing(outAnim, {
                    toValue: -Width,
                    duration: 500
                }),
                Animated.timing(outAnim, {
                    toValue: Width,
                    duration: 0
                })
            ])
        ]).start();
    }

    renderRegister() {
        return (
            <Animated.View style={[styles.container, { transform: [{ translateX: this.state.translateReg }], position: 'absolute' }]}>
                <InputItem
                    clear
                    type='mobile'
                    labelNumber={6}
                    value={this.state.mobileValue}
                    onChange={mobileValue => {
                        this.setState({
                            mobileValue
                        })
                    }}
                    maxLength={13}
                >
                    您的手机号：
                </InputItem>
                <InputItem
                    clear
                    type='password'
                    labelNumber={6}
                    value={this.state.pswdValue}
                    onChange={pswdValue => {
                        this.setState({
                            pswdValue
                        })
                    }}
                    maxLength={8}
                >
                    请输入密码：
                </InputItem>
                <InputItem
                    clear
                    type='password'
                    labelNumber={6}
                    value={this.state.pswdCfmValue}
                    onChange={pswdCfmValue => {
                        this.setState({
                            pswdCfmValue
                        })
                    }}
                    maxLength={8}
                >
                    请重复密码：
                </InputItem>
                <WhiteSpace style={{ height: 50 }} />
                <Button loading={this.state.isLoading} style={[{ width: Width * .8 }]} type='primary' onClick={this.onRegisterClick.bind(this)}>
                    注册
                </Button>
                <Text style={styles.text} onPress={() => {
                    this.changeState(1);
                }}>
                    已有账号，点击登录
                </Text>
            </Animated.View>
        )
    }

    renderLogin() {
        return (
            <Animated.View style={[styles.container, { transform: [{ translateX: this.state.translateLog }], position: 'absolute' }]}>
                <InputItem
                    clear
                    type='mobile'
                    labelNumber={6}
                    value={this.state.mobileValue}
                    onChange={mobileValue => {
                        this.setState({
                            mobileValue
                        })
                    }}
                    maxLength={13}
                >
                    您的手机号：
                </InputItem>
                <InputItem
                    clear
                    type='password'
                    labelNumber={6}
                    value={this.state.pswdValue}
                    onChange={pswdValue => {
                        this.setState({
                            pswdValue
                        })
                    }}
                    maxLength={8}
                >
                    请输入密码：
                </InputItem>
                <WhiteSpace style={{ height: 50 }} />
                <Button style={[{ width: Width * .8 }]} type='primary' onClick={this.onLoginClick.bind(this)}>
                    登录
                </Button>
                <Text style={styles.text} onPress={() => {
                    this.changeState(0);
                }}>
                    没有账号，去注册
                </Text>
            </Animated.View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    this.renderRegister()
                }
                {
                    this.renderLogin()
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Width,
        height: Height,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 4,
        width: Width * .8
    },
    button: {
        paddingTop: 60
    },
    text: {
        fontSize: 15,
        color: '#ddd',
        textDecorationLine: 'underline',
        paddingTop: 50
    }
});

Entrance.propTypes = propTypes;
Entrance.contextTypes = contextTypes;

export default Entrance;