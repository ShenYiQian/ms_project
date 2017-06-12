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
import { setObjectForKey, getObjectForKey } from '../utils/SyncUtils';

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

    onSubmit = async (value) => {
        console.log('onSubmit = ' + value);
        try{
            let history = await getObjectForKey('ms_search_history');
            if(history === null) {
                setObjectForKey('ms_search_history', JSON.stringify([value]));
            } else {
                let historySet = new Set(history);
                historySet.add(value);
                setObjectForKey('ms_search_history', [...historySet]);
            }
        } catch(e) {

        }
    }

    onCancel = () => {
        this.setState({
            value: ''
        })
    }

    onChange = (value) => {
        this.setState({
            value
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <SearchBar
                    value={this.state.value}
                    placeholder='XXX'
                    onSubmit={this.onSubmit.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                    onChange={this.onChange.bind(this)}
                    showCancelButton
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