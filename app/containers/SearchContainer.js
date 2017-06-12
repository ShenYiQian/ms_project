import React from 'react';
import {
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Search from '../scenes/Search';
import * as userInfoCreators from '../actions/userInfo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class SearchContainer extends React.Component {
    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="搜索" size={25} color={tintColor} />
        )
    };

    render() {
        return <Search {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
