import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    BackHandler,
    FlatList,
    Image,
    View,
    Text
} from 'react-native';
import {
    WingBlank,
    WhiteSpace,
    Flex,
    Tabs
} from 'antd-mobile';

const TabPane = Tabs.TabPane;

const { width: Width, height: Height } = Dimensions.get('window');

class Orders extends React.Component {
    constructor(props) {
        super(props);
    }

    onChangeTab = (key) => {
        console.log('onChangeTab key = ' + key);
    }

    onTabClick = (key) => {
        console.log('onTabClick key = ' + key);
    }

    render() {
        return (
            <View style={styles.container}>
                <Tabs defaultActiveKey='1' onChange={this.onChangeTab} onTabClick={this.onTabClick}>
                    <TabPane tab='申请' key='1'>
                        <Text>
                            申请
                        </Text>
                    </TabPane>
                    <TabPane tab='邀约' key='2'>
                        <Text>
                            邀请
                        </Text>
                    </TabPane>
                </Tabs>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Orders;