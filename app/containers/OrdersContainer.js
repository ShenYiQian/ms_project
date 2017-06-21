import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Orders from '../scenes/Orders';
import * as userInfoCreators from '../actions/userInfo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class OrdersContainer extends React.Component {
    static navigationOptions = {
        title: '申请/邀约',
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="th-list" size={25} color={tintColor} />
        )
    };

    render() {
        return <Orders {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);