import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    BackHandler,
    FlatList,
    View,
    Text
} from 'react-native';
import {
    Popup,
    Flex,
    Toast,
    Button,
    SwipeAction,
    WingBlank,
    WhiteSpace
} from 'antd-mobile';
import FreeContent from '../components/FreeContent';
import officeConst from '../constants/officeConst';

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

        this.state = {
            dataSource: [],
            offices: officeConst.slice(0)
        }
    }

    componentDidMount() {
        const { setParams } = this.props.navigation;
        setParams({
            navigatePress: this.navigatePress
        });
    }

    navigatePress = () => {
        const { navigate } = this.props.navigation;
        navigate('Home');
    }

    onSaveItem = (office, weekdays) => {
        if (office.length <= 0) {
            Popup.hide();
            Toast.fail('请选择科室');
            return;
        }
        let offArr = this.state.offices;
        let findIndex = -1;
        for (let i = 0; i < offArr.length; i++) {
            if (offArr[i].value === office) {
                findIndex = i;
            }
        }
        let newArr = [];
        if (findIndex >= 0) {
            newArr = offArr.splice(findIndex, 1);
        }
        let source = this.state.dataSource;
        source.push({ office, weekdays })
        this.setState({
            dataSource: source,
            offices: offArr
        })
        Popup.hide();
    }

    getPopUpContent = () => {
        return (
            <FreeContent officeConst={this.state.offices} onSave={this.onSaveItem} />
        )
    }

    getOfficeName = (value) => {
        let officeName = '';
        officeConst.map(v => {
            if (v.value == value) {
                officeName = v.label;
            }
        })
        return officeName;
    }

    renderFreeTime = (weekdays) => {
        const rowsArr = [];
        let gridData = [{}];
        ['一', '二', '三', '四', '五', '六', '日'].map(v => {
            gridData.push({
                text: `周${v}`
            })
        })
        gridData.push({
            text: '空闲时段'
        });
        weekdays.map(v => {
            switch (v) {
                case 0:
                    gridData.push({
                        text: '上午'
                    })
                    break;
                case 1:
                    gridData.push({
                        text: '下午'
                    })
                    break;
                case 2:
                    gridData.push({
                        text: '全天'
                    })
                    break;
                case 3:
                    gridData.push({
                        text: '无'
                    })
                    break;
            }
        });
        const columnNum = 8;
        const rowNum = Math.ceil(gridData.length / columnNum);
        for (let i = 0; i < rowNum; i++) {
            const rowArr = [];
            for (let j = 0; j < columnNum; j++) {
                const dataIndex = i * columnNum + j;
                if (dataIndex < gridData.length) {
                    const el = gridData && gridData[dataIndex];
                    rowArr.push(
                        <Flex.Item
                            key={j}
                            style={dataIndex > 7 ? { paddingTop: 20 } : {}}
                        >
                            <Text>{el.text}</Text>
                        </Flex.Item>
                    )
                } else {
                    rowArr.push(
                        <Flex.Item key={j} />
                    )
                }
            }
            rowsArr.push(
                <Flex key={i}>
                    {rowArr}
                </Flex>
            )
        }

        return (
            <Flex direction='column'>
                {rowsArr}
            </Flex>
        )

    }

    deleteRow = (index) => {
        let dataSource = this.state.dataSource;
        dataSource.splice(index, 1);
        const orginOffice = officeConst.slice(0);
        for (let i = 0; i < dataSource.length; i++) {
            const data = dataSource[i];
            for (let j = 0; j < orginOffice.length; j++) {
                const officeData = orginOffice[j];
                if (officeData.value === data.office) {
                    orginOffice.splice(j, 1);
                    break;
                }
            }
        }
        this.setState({
            dataSource,
            offices: orginOffice
        })
    }

    renderRow = (rowData) => {
        const { item, index } = rowData;
        const right = [
            {
                text: '删除',
                onPress: () => { this.deleteRow(index) },
                style: { backgroundColor: 'red', color: 'white' }
            }
        ];
        return (
            <View key={index}>
                <SwipeAction
                    autoClose
                    style={{ backgroundColor: '#fff' }}
                    right={right}
                    onOpen={() => console.log('open')}
                    onClose={() => console.log('close')}
                >
                    <View>
                        <WingBlank>
                            <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#000' }}>{this.getOfficeName(item.office)}</Text>
                            <WhiteSpace />
                            {
                                this.renderFreeTime(item.weekdays)
                            }
                        </WingBlank>
                    </View>
                </SwipeAction>
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
                {
                    this.state.dataSource.length > 0 ?
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderRow.bind(this)}
                            ItemSeparatorComponent={this.renderSeparatorComponent.bind(this)}
                        />
                        :
                        <Text style={{ alignSelf: 'center' }}>您还没有设定任何科室的空闲时间，请点击下方的添加按钮</Text>
                }
                <WingBlank style={{ position: 'absolute', bottom: 0, width: Width, alignSelf: 'center' }}>
                    <Button type='primary' onClick={() => {
                        Popup.show(this.getPopUpContent());
                    }}>添加</Button>
                </WingBlank>
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