import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Entrance from '../scenes/Entrance';
import * as entranceCreators from '../actions/entrance';

class EntranceContainer extends React.Component {
    render() {
        return <Entrance {...this.props} />
    }
}

const mapStateToProps = (state) => {
    const { entrance } = state;
    return {
        entrance
    };
};

const mapDispatchToProps = (dispatch) => {
    const entranceActions = bindActionCreators(entranceCreators, dispatch);
    return {
        entranceActions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntranceContainer);