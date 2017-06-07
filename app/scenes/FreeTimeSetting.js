import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    BackHandler,
    View,
    Text
} from 'react-native';

const { width: Width, height: Height } = Dimensions.get('window');

const propTypes = {
    profileActions: PropTypes.object,
    profile: PropTypes.object.isRequired
};

const contextTypes = {
    routes: PropTypes.object.isRequired
};

class FreeTimeSetting extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { setParams } = this.props.navigation;
        setParams({
            navigatePress: this.navigatePress
        });
    }

    navigatePress = () => {
        console.warn('click right button');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    aaaaaa
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

FreeTimeSetting.propTypes = propTypes;
FreeTimeSetting.contextTypes = contextTypes;

export default FreeTimeSetting;