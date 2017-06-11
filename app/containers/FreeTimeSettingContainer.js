import React from 'react';
import {
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FreeTimeSetting from '../scenes/FreeTimeSetting';
import * as userInfoCreators from '../actions/userInfo';
import {
    Flex,
    Button
} from 'antd-mobile';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const gridData = {
    icon: (<FontAwesome name='plus' size={25} color='#fff' />),
    text: '添加'
};

class FreeTimeSettingContainer extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const { state, setParams } = navigation;
        return {
            headerRight: (
                <Flex style={{paddingRight: 20}} direction='column' onPress={state.params.navigatePress}>
                    <FontAwesome name='undo' size={25} color='#fff'/>
                    <Text style={{ color: '#fff', fontWeight: 'bold' }}> 跳过 </Text>
                </Flex>
            )
        };
    };

    render() {
        return <FreeTimeSetting {...this.props} />
    }
}

const mapStateToProps = (state) => {
    const { userInfo } = state;
    return {
        userInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    const userInfoActions = bindActionCreators(userInfoCreators, dispatch);
    return {
        userInfoActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FreeTimeSettingContainer);