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

    onClick = () => {
        const { routes } = this.context;
        routes.personalSetting();
    }

    render() {
        return (
            <View>
                <Text>
                    aaaaa
                </Text>
                <Button type='primary' onClick={this.onClick}>测试</Button>
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