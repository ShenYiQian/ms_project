import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PersonalSetting from '../scenes/PersonalSetting';
import * as userInfoCreators from '../actions/userInfo';

class PersonalSettingContainer extends React.Component {
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