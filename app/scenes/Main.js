import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Dimensions,
    FlatList,
    View,
    Text
} from 'react-native';
import {
    WingBlank,
    WhiteSpace,
    Flex,
    Button
} from 'antd-mobile';

const { width: Width, height: Height } = Dimensions.get('window');

const propTypes = {
    mainActions: PropTypes.object,
    main: PropTypes.object.isRequired
};

const tempResult = `
{"status":"ok","results":[{"title":"医师多点执业_百度百科","href":"http://baike.baidu.com/item/%E5%8C%BB%E5%B8%88%E5%A4%9A%E7%82%B9%E6%89%A7%E4%B8%9A","param":"医师多点执业是指符合条件的执业医师经卫生行政部门注册后，受聘在两个以上医疗机构执业的行为。"},{"title":"医师多点执业意见出台：医生可脱离医院诊疗|多点执业_ …体育财经邮箱博客娱乐汽车","href":"http://news.sina.com.cn/c/2015-01-12/105931388721.shtml","param":"医师多点执业此前实行的是审批制，而备案管理只需要登记，不再需要批准。探索履行知情报备手续，意味着以后医生只需跟医院“打个招呼”就可以了，自由 ..."},{"title":"首个医师多点执业平台落地“共享医生”尚难规模化|共享 …","href":"http://tech.sina.com.cn/i/2017-07-05/doc-ifyhrxsk1781673.shtml","param":"詹智勇也清楚“共享医生”还需要一定的探索周期。他说，尽管有许多的医师有多点执业 的意向需求，但大多数医师目前对多点执业的具体操作与执业地点仍不够 ..."},{"title":"全国首个医师多点执业平台落地“共享医生”尚难规模化 _  …","href":"http://finance.eastmoney.com/news/1355,20170705752970832.html","param":"7月4日，《每日经济新闻》记者了解到，由广州数十家三甲医院的医生联合发起、引资共建的“大医汇”医师多点执业共享平台(以下简称大医汇)在广州启动，成为 ..."},{"title":"医生共享平台 助力医师多点执业政策落实-财经频道-金 …","href":"http://finance.jrj.com.cn/2017/07/04234222697456.shtml","param":"多点执业政策落实难 早在2014 年，国家卫生计生委等部委联合印发的《关于推进和规范医师多点执业的若干意见》中，就对医生多点执业作出了规定，包括医生多点执业的 ..."},{"title":"多点执业_文档之家","href":"http://www.doczj.com/doc/e6102018240c844768eaee45.html","param":"多点执业 一：多点执业背景 医生自由执业，是医改至关重要的一环。只有从体制中解放医生，让他们自由流动与充分竞争，才能真正让市场来为医生定价，让好医生为 ..."},{"title":"医师多点执业 - 医学教育网：中国大型国家医学考试网 …","href":"http://www.med66.com/new/201209/pq201209074336.shtml","param":"&;&;&;卫生部日前发出通知，决定将医师多点执业试点地区扩大至全国所有省份，同时将申请多点执业医师的资格由副高级以上降为中级以上——这意味着，国家 ..."},{"title":"北京：医师多点执业无需医院审批|医师多点执业_新浪新闻新闻中心国内新闻","href":"http://news.sina.com.cn/c/2014-07-23/023930562529.shtml","param":"新京报讯（记者温薷）8月起，在京医师到其他医疗机构“多点执业”的门槛进一步放宽，医师申请多点执业不再需要本单位出具“同意书”，另外，多点执业地点 ..."},{"title":"国家多点执业意见出台:赋予医生更大自由|医生多点 ...- …","href":"http://finance.sina.com.cn/chanjing/cyxw/20150112/075821274248.shtml","param":"国家“多点执业”意见出台赋予医生更大自由 医师所在医院“同意”即可多点执业，有条件的地方可探索“报备”手续，各地研究相关管理办法和实施细则"},{"title":"一文读懂三个概念：多点执业、自由执业、医生集团 -  …","href":"http://www.suchso.com/source/dashuju-yiliaojiankang.html","param":"一文读懂三个概念：多点执业、自由执业、医生集团是IT工作生活这点事关于 大数据医疗健康的文章，欢迎您阅读和评论发展-成长-分享-经验-快乐"}]}
`;

class Main extends React.Component {
    constructor(props) {
        super(props);

        const json = JSON.parse(tempResult);
        this.state = {
            results: json.results,
            refreshing: false
        }
    }

    renderRequestRow = (rowData) => {
        const { item, index } = rowData;
        const { title, href, param } = item;
        return (
            <View>
                <WingBlank>
                    <Flex direction='column' align='start'>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{title}</Text>
                        <Text>{param}</Text>
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

    onRefresh = () => {
        this.setState({
            refreshing: true
        })
    }

    keyExtractor = (item, index) => {
        return item.title;
    }
    
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.results}
                    keyExtractor={this.keyExtractor}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh.bind(this)}
                    renderItem={this.renderRequestRow.bind(this)}
                    ItemSeparatorComponent={this.renderSeparatorComponent.bind(this)}
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

Main.propTypes = propTypes;

export default Main;