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
    ImagePicker,
    WingBlank,
    WhiteSpace
} from 'antd-mobile';

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
            phone: ''
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        return (
            <View style={styles.container}>
                <WingBlank>
                    <Flex direction='row'>
                        <Flex.Item>
                            <ImagePicker />
                        </Flex.Item>
                        <Flex.Item direction='column'>
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

                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

PersonalSetting.propTypes = propTypes;
PersonalSetting.contextTypes = contextTypes;

export default PersonalSetting;