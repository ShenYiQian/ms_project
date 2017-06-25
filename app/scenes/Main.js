import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text
} from 'react-native';
import {
    Button
} from 'antd-mobile';

const { width: Width, height: Height } = Dimensions.get('window');

const propTypes = {
    mainActions: PropTypes.object,
    main: PropTypes.object.isRequired
};

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

Main.propTypes = propTypes;

export default Main;