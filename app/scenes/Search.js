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
        this.getHistory();
    }

    getHistory = async (value = null) => {
        try {
            let historys = await getObjectForKey('ms_search_history');
            let newHistory = [];
            if (value != null) {
                if (historys === null) {
                    newHistory.push(value);
                } else {
                    let historySet = new Set(historys);
                    console.log('set is ', historySet);
                    historySet.add(value);
                    newHistory = [...historySet];
                }
                setObjectForKey('ms_search_history', newHistory);
            } else {
                newHistory = historys;
            }
            this.setState({
                history: newHistory
            })
        } catch (e) {
            console.error(e);
        }
    }

    onSubmit = async (value) => {
        this.getHistory(value);
    }

    renderHistory = () => {
        const history = this.state.history;
        const names = [];
        for (let i = 0; i < history.length; i++) {
            const searchItem = history[i];
            names.push(
                <Text style={styles.searchItem} onPress={() => {
                    this.setState({
                        value: searchItem
                    })
                }}>
                    {searchItem}
                </Text>
            )
        }
        return (
            <Flex direction='row' wrap='wrap' align='start'>
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
                    <Flex direction='column' align='start'>
                        <SearchBar
                            value={this.state.value}
                            placeholder='XXX'
                            onSubmit={this.onSubmit.bind(this)}
                            onCancel={this.onCancel.bind(this)}
                            onChange={this.onChange.bind(this)}
                            showCancelButton
                        />
                        <WhiteSpace size='lg' />
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
    },
    searchItem: {
        borderWidth: 2,
        borderColor: '#1C86EE',
        borderRadius: 5,
        margin: 5,
        padding: 5
    }
});

export default Search;