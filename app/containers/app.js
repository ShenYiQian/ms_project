import React from 'react';
import {
    StyleSheet,
    Navigator,
} from 'react-native';

import {
    Router,
    Scene,
    ActionConst
} from 'react-native-router-flux';
import { connect } from 'react-redux';
import Splash from '../scenes/Splash';
import MainContainer from '../containers/MainContainer';
import EntranceContainer from '../containers/EntranceContainer';
import TabIcon from '../components/TabIcon';

const RouterWithRedux = connect()(Router);
const backButton = require('../img/arrow_left.png');

const getSceneStyle = (props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ?
            0 : Navigator.NavigationBar.Styles.General.TotalNavHeight;
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};

class App extends React.Component {
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <RouterWithRedux
                getSceneStyle={getSceneStyle}
                navigationBarStyle={styles.navBar}
                titleStyle={styles.navBarTitle}
                backButtonImage={backButton}
            >
                <Scene key='root'>
                    <Scene
                        key='splash'
                        component={Splash}
                        hideNavBar
                        hideTabBar
                        initial />
                    <Scene
                        key='entrance'
                        component={EntranceContainer}
                        hideTabBar
                        hideNavBar
                        type={ActionConst.RESET}
                    />
                </Scene>
            </RouterWithRedux>
        );
    }
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#3e9ce9'
    },
    navBarTitle: {
        color: '#fff',
        fontSize: 20,
    }
});

export default App;