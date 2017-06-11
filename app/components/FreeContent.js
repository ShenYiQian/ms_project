import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    BackHandler,
    View,
    Text
} from 'react-native';
import {
    Picker,
    Flex,
    Checkbox,
    List,
    Button,
    WingBlank,
    WhiteSpace
} from 'antd-mobile';
import officeConst from '../constants/officeConst';

const { width: Width, height: Height } = Dimensions.get('window');

class FreeContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            offices: this.props.officeConst,
            officeValue: [],
            freeValue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
    }

    componentWillReceiveProps(nextProps) {
        const { officeConst } = nextProps;
        this.setState({
            offices: officeConst
        })
    }

    onChangeOffice = (value) => {
        this.setState({
            officeValue: value
        });
    }

    renderItem(el, index) {
        if (typeof (el.text) === 'string') {
            return (
                <Text>{el.text}</Text>
            )
        } else if (typeof (el.checkbox) === 'number') {
            return (
                <Checkbox
                    value={this.state.freeValue[el.checkbox]}
                    onChange={(e) => {
                        const frees = this.state.freeValue;
                        frees[el.checkbox] = e.target.checked ? 1 : 0;
                        this.setState({
                            freeValue: frees
                        })
                    }}
                />
            )
        } else {
            return (
                <View />
            )
        }
    }

    renderFreeTime() {
        const rowsArr = [];
        let gridData = [{}];
        ['一', '二', '三', '四', '五', '六', '日'].map(v => {
            gridData.push({
                text: `周${v}`
            })
        })
        let index = 0;
        ['上午', '下午'].map(v => {
            gridData.push({
                text: v
            });
            for (let i = 0; i < 7; i++) {
                gridData.push({
                    checkbox: index * 7 + i
                })
            }
            index ++;
        })
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
                            {this.renderItem(el, dataIndex)}
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

    onClick = () => {
        const { onSave } = this.props;
        const office = this.state.officeValue.length > 0 ? this.state.officeValue[0] : '';
        let weekdays = [];
        for(let i=0;i<7;i++) {
            const mst = this.state.freeValue[i];
            const ast = this.state.freeValue[i+7];
            if(mst && ast) {
                weekdays[i] = 2;
            } else if( mst || ast ) {
                weekdays[i] = mst > 0 ? 0 : 1;
            } else {
                weekdays[i] = 3;
            }
        }
        onSave(office, weekdays);
    }

    render() {
        return (
            <View>
                <WingBlank>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#000' }}>所需科室</Text>
                    <WhiteSpace />
                    <Picker
                        data={this.state.offices}
                        cols={1}
                        value={this.state.officeValue}
                        onChange={this.onChangeOffice}
                    >
                        <List.Item arrow='horizontal' last> 选择科室 </List.Item>
                    </Picker>
                    <WhiteSpace />
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#000' }}>空闲时段</Text>
                    <WhiteSpace />
                    {
                        this.renderFreeTime()
                    }
                    <WhiteSpace />
                    <Button type='primary' onClick={this.onClick}>保存</Button>
                    <WhiteSpace />
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

FreeContent.defaultProps = {
    onSave: () => {

    }
};

FreeContent.propTypes = {
    onSave: PropTypes.func.isRequired
}

export default FreeContent;