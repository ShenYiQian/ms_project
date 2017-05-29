import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text
} from 'react-native';

const { width: Width, height: Height } = Dimensions.get('window');

const propTypes = {
  mainActions: PropTypes.object,
  main: PropTypes.object.isRequired
};

const contextTypes = {
    routes: PropTypes.object.isRequired
}

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <View>
                <Text>
                    aaaaa
                </Text>
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
Main.contextTypes = contextTypes;

export default Main;