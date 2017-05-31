import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text
} from 'react-native';
import {
    InputItem,
    Button,
    Toast,
    Flex,
    List,
    ImagePicker,
    WingBlank,
    WhiteSpace,
    Picker,
    TextareaItem
} from 'antd-mobile';
import cityConst from '../constants/cityConst';

const { width: Width, height: Height } = Dimensions.get('window');

const propTypes = {
    profileActions: PropTypes.object,
    profile: PropTypes.object.isRequired
};

const contextTypes = {
    routes: PropTypes.object.isRequired
};

class PersonalSetting extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            phone: '',
            company: '',
            value: ['shs', 'shs']
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    onChange = (value) => {
        console.warn(value);
        this.setState({ value });
    }

    render() {
        return (
            <View style={styles.container}>
                <WingBlank>
                    <Flex direction='row'>
                        <ImagePicker />
                        <View style={{ flexDirection: 'column' }}>
                            <InputItem
                                labelNumber={3}
                                value={this.state.userName}
                                onChange={userName => {
                                    this.setState({
                                        userName
                                    })
                                }}
                                maxLength={10}
                            >
                                姓名:
                            </InputItem>
                            <InputItem
                                type='phone'
                                labelNumber={13}
                                value={this.state.phone}
                                onChange={phone => {
                                    this.setState({
                                        phone
                                    })
                                }}
                                maxLength={10}
                            >
                                电话:
                            </InputItem>
                        </View>
                    </Flex>
                    <WhiteSpace />
                    <Picker
                        data={cityConst}
                        cols={2}
                        value={this.state.value}
                        onChange={this.onChange}
                    >
                        <List.Item arrow='horizontal' last> 所在城市 </List.Item>
                    </Picker>
                    <WhiteSpace />
                    <InputItem
                        clear
                        labelNumber={5}
                        value={this.state.company}
                        onChange={(value) => {
                            this.setState({
                                company: value,
                            });
                        }}
                        placeholder='您目前所在的公司'
                    >
                        您的公司:
                    </InputItem>
                    <WhiteSpace />
                    <TextareaItem rows={4} placeholder='自我描述(最多100个字)' count={100} />
                </WingBlank>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20
    }
});

PersonalSetting.propTypes = propTypes;
PersonalSetting.contextTypes = contextTypes;

export default PersonalSetting;