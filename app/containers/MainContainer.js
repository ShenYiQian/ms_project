import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Main from '../scenes/Main';
import * as mainCreators from '../actions/main';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class MainContainer extends React.Component {
    static navigationOptions = {
        title: '首页',
        tabBarIcon: ({ tintColor }) => (
            <FontAwesome name="home" size={25} color={tintColor} />
        )
    };

    render() {
        return <Main {...this.props} />
    }
}

const mapStateToProps = (state) => {
    const { main } = state;
    return {
        main
    };
};

const mapDispatchToProps = (dispatch) => {
    const mainActions = bindActionCreators(mainCreators, dispatch);
    return {
        mainActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);