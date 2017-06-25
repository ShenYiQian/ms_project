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
    Button,
    Flex,
    Tabs
} from 'antd-mobile';

const TabPane = Tabs.TabPane;

const { width: Width, height: Height } = Dimensions.get('window');

class Orders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            requestList: [1, 1, 1, 1, 1, 1, 1, 1, 1],
            inviteList: [1,2,3,4,5,6,7,8,9]
        }
    }

    onChangeTab = (key) => {
        console.log('onChangeTab key = ' + key);
    }

    onTabClick = (key) => {
        console.log('onTabClick key = ' + key);
    }

    renderRequestRow = (rowData) => {
        const { item, index } = rowData;
        return (
            <View>
                <WingBlank>
                    <Flex style={{ paddingTop: 5, paddingBottom: 5 }} direction='column' justify='center' align='center'>
                        <Flex style={{ width: Width * .8 }} direction='row' justify='between' align='center'>
                            <Text>被申请方</Text>
                            <Button style={{ marginLeft: 20 }} type='ghost' size='small' onClick={() => {
                                console.log('refuse click');
                            }}>取消</Button>
                        </Flex>
                        <Flex style={{ width: Width * .8 }} direction='row' justify='start' align='center'>
                            <Text>科室</Text>
                            <Text style={{ marginLeft: 40 }}>周五</Text>
                            <Text style={{ marginLeft: 40 }}>上午</Text>
                        </Flex>
                    </Flex>
                </WingBlank>
            </View>
        )
    }

    renderInviteRow = (rowData) => {
        return (
            <View>
                <WingBlank>
                    <Flex style={{ paddingTop: 5, paddingBottom: 5 }} direction='column' justify='center' align='center'>
                        <Flex style={{ width: Width * .8 }} direction='row' justify='between' align='center'>
                            <Text>邀请方</Text>
                            <Flex direction='row' justify='center' align='center'>
                                <Button type='ghost' size='small' onClick={() => {
                                    console.log('agree click');
                                }}>同意</Button>
                                <Button style={{ marginLeft: 20 }} type='ghost' size='small' onClick={() => {
                                    console.log('refuse click');
                                }}>拒绝</Button>
                            </Flex>
                        </Flex>
                        <Flex style={{ width: Width * .8 }} direction='row' justify='start' align='center'>
                            <Text>科室</Text>
                            <Text style={{ marginLeft: 40 }}>周五</Text>
                            <Text style={{ marginLeft: 40 }}>上午</Text>
                        </Flex>
                    </Flex>
                </WingBlank>
            </View>
        )
    }

    renderSeparatorComponent() {
        return (
            <WhiteSpace style={{ backgroundColor: '#ddd' }} />
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