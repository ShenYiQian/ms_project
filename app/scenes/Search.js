import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    BackHandler,
    View,
    Text
} from 'react-native';
import {
    Flex,
    Toast,
    Button,
    SearchBar,
    WingBlank,
    WhiteSpace
} from 'antd-mobile';

const { width: Width, height: Height } = Dimensions.get('window');

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    value={this.state.value}
                    placeholder='XXX'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Search;