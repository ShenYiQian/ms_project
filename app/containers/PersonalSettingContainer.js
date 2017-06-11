import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PersonalSetting from '../scenes/PersonalSetting';
import * as userInfoCreators from '../actions/userInfo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class PersonalSettingContainer extends React.Component {
    static navigationOptions = {
        title: '我',
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="user-circle-o" size={25} color={tintColor} />
        )
    };

    render() {
        return <PersonalSetting {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalSettingContainer);