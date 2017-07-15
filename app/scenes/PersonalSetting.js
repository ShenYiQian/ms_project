import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    BackHandler,
    ScrollView,
    TouchableOpacity,
    Image,
    View,
    Text
} from 'react-native';
import {
    InputItem,
    Button,
    Toast,
    Flex,
    List,
    ImagePicker,
    WingBlank,
    WhiteSpace,
    Picker,
    Grid,
    Checkbox,
    TextareaItem
} from 'antd-mobile';
import cityConst from '../constants/cityConst';
import officeConst from '../constants/officeConst';
import titleConst from '../constants/titleConst';

const { width: Width, height: Height } = Dimensions.get('window');

const propTypes = {
    profileActions: PropTypes.object,
    profile: PropTypes.object.isRequired
};

const contextTypes = {
    routes: PropTypes.object.isRequired
};

class PersonalSetting extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        let isInit = false;
        if (typeof (params) !== 'undefined') {
            isInit = params.init;
        }

        this.state = {
            userName: '',
            phone: '',
            company: '',
            cityValue: ['shs', 'shs'],
            officeValue: ['gk'],
            titleValue: ['zzys'],
            freeValue: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            isDoctor: null,
            isInit
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBack);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBack);
    }

    onBack() {
        return true;
    }

    componentWillReceiveProps(nextProps) {

    }

    onChangeCity = (value) => {
        this.setState({
            cityValue: value
        });
    }

    onChangeOffice = (value) => {
        this.setState({
            officeValue: value
        });
    }

    onChangeTitle = (value) => {
        this.setState({
            titleValue: value
        })
    }

    showMain = () => {
        const { navigate } = this.props.navigation;
        navigate('Home');
    }

    showFreeTime = () => {
        const { navigate } = this.props.navigation;
        navigate('FreeTimeSetting', {navigatePress: this.showMain.bind(this)});
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
                    checkbox: index * 2 + i
                })
            }
            index++;
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

    renderItem(el, index) {
        if (typeof (el.text) === 'string') {
            return (
                <Text>{el.text}</Text>
            )
        } else if (typeof (el.checkbox) === 'number') {
            return (
                <Checkbox />
            )
        } else {
            return (
                <View />
            )
        }
    }

    renderChooseId() {
        return (
            <WingBlank>
                <Flex direction='column'>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>请选择您的身份</Text>
                    <WhiteSpace size='lg' />
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isDoctor: true
                        })
                    }}>
                        <Image style={{ width: Height * .4, height: Height * .4 }} resizeMode='cover' source={require('../img/doctor.jpg')} />
                    </TouchableOpacity>
                    <WhiteSpace size='lg' />
                    <TouchableOpacity onPress={() => {
                        this.setState({
                            isDoctor: false
                        })
                    }}>
                        <Image style={{ width: Height * .4, height: Height * .4 }} resizeMode='cover' source={require('../img/hospital.jpg')} />
                    </TouchableOpacity>
                </Flex>
            </WingBlank>
        )
    }

    renderDoctor() {
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
                    checkbox: index * 2 + i
                })
            }
            index++;
        })
        return (
            <WingBlank>
                <Flex direction='row' style={{ paddingTop: 10 }}>
                    <ImagePicker />
                    <View style={{ flexDirection: 'column' }}>
                        <InputItem
                            labelNumber={3}
                            value={this.state.userName}
                            onChange={userName => {
                                this.setState({
                                    userName
                                })
                            }}
                            maxLength={10}
                        >
                            姓名:
                        </InputItem>
                        <InputItem
                            type='phone'
                            labelNumber={13}
                            value={this.state.phone}
                            onChange={phone => {
                                this.setState({
                                    phone
                                })
                            }}
                            maxLength={10}
                        >
                            电话:
                            </InputItem>
                    </View>
                </Flex>
                <WhiteSpace />
                <Picker
                    data={cityConst}
                    cols={2}
                    value={this.state.cityValue}
                    onChange={this.onChangeCity}
                >
                    <List.Item arrow='horizontal' last> 所在城市 </List.Item>
                </Picker>
                <WhiteSpace />
                <InputItem
                    clear
                    labelNumber={5}
                    value={this.state.company}
                    onChange={(value) => {
                        this.setState({
                            company: value,
                        });
                    }}
                    placeholder='XXX医院'
                >
                    所在医院:
                </InputItem>
                <Picker
                    data={titleConst}
                    cols={1}
                    value={this.state.titleValue}
                    onChange={this.onChangeTitle}
                >
                    <List.Item arrow='horizontal' last> 职称 </List.Item>
                </Picker>
                <WhiteSpace />
                <WhiteSpace />
                <Picker
                    data={officeConst}
                    cols={1}
                    value={this.state.officeValue}
                    onChange={this.onChangeOffice}
                >
                    <List.Item arrow='horizontal' last> 所在科室 </List.Item>
                </Picker>
                <WhiteSpace />
                <TextareaItem rows={4} placeholder='自我描述(最多100个字)' count={100} />
                <WhiteSpace />
                <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#000' }}>空闲时段</Text>
                <WhiteSpace />
                {
                    this.renderFreeTime()
                }
                <WhiteSpace />
                {
                    this.state.isInit ?
                        <View>
                            <Button type='primary' style={[{ width: Width * .8, alignSelf: 'center' }]} onClick={this.showMain.bind(this)}>
                                完成注册
                        </Button>
                        </View>
                        :
                        <View />
                }
            </WingBlank>
        )
    }

    renderHospital() {
        return (
            <WingBlank>
                <InputItem
                    labelNumber={4}
                    value={this.state.userName}
                    onChange={userName => {
                        this.setState({
                            userName
                        })
                    }}
                    maxLength={10}
                >
                    医院名:
                </InputItem>
                <WhiteSpace />
                <Picker
                    data={cityConst}
                    cols={2}
                    value={this.state.value}
                    onChange={this.onChange}
                >
                    <List.Item arrow='horizontal' last> 所在城市 </List.Item>
                </Picker>
                <WhiteSpace />
                <TextareaItem rows={4} placeholder='自我描述(最多100个字)' count={100} />
                <WhiteSpace style={{ height: 100 }} />
                <Button type='primary' style={[{ width: Width * .8, alignSelf: 'center' }]} onClick={this.showFreeTime.bind(this)}>
                    下一步
                    </Button>
            </WingBlank>
        )
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {
                        this.state.isDoctor === null ?
                            this.renderChooseId()
                            :
                            this.state.isDoctor ?
                                this.renderDoctor()
                                :
                                this.renderHospital()
                    }
                </View>
            </ScrollView>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

PersonalSetting.propTypes = propTypes;
PersonalSetting.contextTypes = contextTypes;

export default PersonalSetting;