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

        this.state = {
            requestList: [],
            inviteList: []
        }
    }

    onChangeTab = (key) => {
        console.log('onChangeTab key = ' + key);
    }

    onTabClick = (key) => {
        console.log('onTabClick key = ' + key);
    }

    renderRequestRow = (rowData) => {
        return (
            <View>
                <Text>
                    申请列表
                </Text>
            </View>
        )
    }

    renderInviteRow = (rowData) => {
        return (
            <View>
                <Text>
                    邀请列表
                </Text>
            </View>
        )
    }

    renderSeparatorComponent() {
        return (
            <WhiteSpace style={{ backgroundColor: '#e9e9ef' }} />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Tabs defaultActiveKey='1' onChange={this.onChangeTab} onTabClick={this.onTabClick}>
                    <TabPane tab='申请' key='1'>
                        {
                            this.state.requestList.length > 0 ?
                                <FlatList
                                    data={this.state.requestList}
                                    renderItem={this.renderRequestRow.bind(this)}
                                    ItemSeparatorComponent={this.renderSeparatorComponent.bind(this)}
                                />
                                :
                                <Text style={{ alignSelf: 'center' }}>您的申请列表空空如也</Text>
                        }
                    </TabPane>
                    <TabPane tab='邀约' key='2'>
                        {
                            this.state.inviteList.length > 0 ?
                                <FlatList
                                    data={this.state.inviteList}
                                    renderItem={this.renderInviteRow.bind(this)}
                                    ItemSeparatorComponent={this.renderSeparatorComponent.bind(this)}
                                />
                                :
                                <Text style={{ alignSelf: 'center' }}>您的邀约列表空空如也</Text>
                        }
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