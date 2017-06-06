import { StackNavigator, TabNavigator } from 'react-navigation';
import React from 'react';
import Splash from '../scenes/Splash';
import MainContainer from '../containers/MainContainer';
import EntranceContainer from '../containers/EntranceContainer';
import PersonalSettingContainer from '../containers/PersonalSettingContainer';

import {
    StyleSheet
} from 'react-native';

const TabContainer = TabNavigator(
    {
        Main: { screen: MainContainer },
        Main1: { screen: MainContainer },
        Main2: { screen: MainContainer },
        Main3: { screen: MainContainer }
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
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