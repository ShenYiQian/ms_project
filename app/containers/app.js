import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import React from 'react';
import Splash from '../scenes/Splash';
import MainContainer from '../containers/MainContainer';
import EntranceContainer from '../containers/EntranceContainer';
import SearchContainer from '../containers/SearchContainer';
import PersonalSettingContainer from '../containers/PersonalSettingContainer';
import FreeTimeSettingContainer from '../containers/FreeTimeSettingContainer';
import OrdersContainer from '../containers/OrdersContainer';
import TabBarComponent from '../components/TabBarComponent';

import {
    StyleSheet,
} from 'react-native';

const TabContainer = TabNavigator(
    {
        Main: { screen: MainContainer },
        Search: { screen: SearchContainer },
        Orders: { screen: OrdersContainer },
        Self: { screen: PersonalSettingContainer }
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        tabBarComponent: (props) => {
            return (
                <TabBarComponent {...props} />
            )
        },
        tabBarOptions: {
            activeTintColor: '#3e9ce9',
            inactiveTintColor: '#999999',
            showIcon: true,
            style: {
                backgroundColor: '#fff'
            },
            indicatorStyle: {
                opacity: 0
            },
            tabStyle: {
                padding: 0
            }
        }
    }
);

const App = StackNavigator(
    {
        Splash: {
            screen: Splash,
            navigationOptions: {
                header: null
            }
        },
        Entrance: {
            screen: EntranceContainer,
            navigationOptions: {
                header: null
            }
        },
        InitSetting: {
            screen: PersonalSettingContainer,
            navigationOptions: {
                header: null
            }
        },
        FreeTimeSetting: {
            screen: FreeTimeSettingContainer
        },
        Home: {
            screen: TabContainer,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'Splash',
        mode: 'card',
        headerMode: 'screen',
        navigationOptions: {
            cardStack: {
                gesturesEnabled: true
            },
            headerStyle: {
                backgroundColor: '#3e9ce9'
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20
            },
            headerTintColor: '#fff'
        }
    }
)

export default App;