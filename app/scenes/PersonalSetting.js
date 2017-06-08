import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    BackHandler,
    ScrollView,
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

        this.state = {
            userName: '',
            phone: '',
            company: '',
            cityValue: ['shs', 'shs'],
            officeValue: ['gk'],
            isDoctor: true
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
        console.warn(value);
        this.setState({
            cityValue: value
        });
    }

    onChangeOffice = (value) => {
        this.setState({
            officeValue: value
        });
    }

    onClick = () => {
        const { navigate } = this.props.navigation;
        navigate('FreeTimeSetting', { navigatePress: null });
    }

    renderDoctor() {
        const gridData = [];
        for (let i = 0; i < 14; i++) {
            gridData.push(
                <Checkbox />
            )
        }
        return (
            <WingBlank>
                <Flex direction='row' style={{ paddingTop: 20 }}>
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
                <Grid
                    data={gridData}
                    columnNum={7}
                    hasLine={true}
                    renderItem={(el, index) => (
                        <Checkbox />
                    )}
                />
                <WhiteSpace style={{ height: 100 }} />
                <Button type='primary' style={[{ width: Width * .8, alignSelf: 'center' }]} onClick={this.onClick.bind(this)}>
                    下一步
                </Button>
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
                <Button type='primary' style={[{ width: Width * .8, alignSelf: 'center' }]} onClick={this.onClick.bind(this)}>
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