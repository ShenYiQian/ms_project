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
    Badge,
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
            history: []
        }
    }

    componentDidMount() {
    }

    onSubmit = async (value) => {
        console.warn('onSubmit = ' + value);
        try {
            let historys = await getObjectForKey('ms_search_history');
            let history = [];
            if (historys === null) {
                history.push(value);
            } else {
                let historySet = new Set(historys);
                historySet.add(value);
                history = [...historySet];
            }
            setObjectForKey('ms_search_history', JSON.stringify(history));
            console.warn(history);
            this.setState({
                history
            })
        } catch (e) {

        }
    }

    renderHistory = () => {
        const history = this.state.history;
        const names = [];
        for (let i = 0; i < history.length; i++) {
            const searchItem = history[i];
            console.warn('item = ' + searchItem)
            names.push(
                <Text style={{borderWidth:1, borderColor: '#000', borderRadius: 5, margin: 5}}>{searchItem}</Text>
            )
        }
        return (
            <Flex direction='row' wrap='wrap'>
                {names}
            </Flex>
        )
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
                <WingBlank>
                    <Flex direction='column'>
                        <SearchBar
                            value={this.state.value}
                            placeholder='XXX'
                            onSubmit={this.onSubmit.bind(this)}
                            onCancel={this.onCancel.bind(this)}
                            onChange={this.onChange.bind(this)}
                            showCancelButton
                        />
                        <Text>历史纪录</Text>
                        {
                            this.renderHistory()
                        }
                    </Flex>
                </WingBlank>
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