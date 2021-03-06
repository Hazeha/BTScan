// In index.js of a new project
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import AccountScreen from './screens/Account';
import HistoryScreen from './screens/History';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

// Register component to navigation
Navigation.registerComponent('Account', () => AccountScreen);
Navigation.registerComponent('History', () => HistoryScreen);

// Default Options
Navigation.setDefaultOptions({
    statusBar: {
      backgroundColor: '#4d089a'
    },
    topBar: {
      title: {
        color: 'white'
      },
      backButton: {
        color: 'white'
      },
      background: {
        color: 'dodgerblue'
      }
    },
    bottomTab: {
        backgroundColor:{ color: 'dodgerblue',},
      fontSize: 14,
      selectedFontSize: 14
    }
  });

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
        bottomTabs: {
            children: [{
                stack: {
                    id: 'ACCOUNT_TAB',                    
                    children: [{
                        component: {
                            id: 'ACOUNT',
                            name: 'Account'
                        }
                    }],
                    options: {
                        bottomTab: {
                            text: 'Account',
                            icon: require('../public/assets/account-safe-icon.png')
                        }
                    }
                }},{
                stack: {
                    id: 'HISTORY_TAB',
                    children: [{
                        component: {
                            id: 'HISTORY',
                            name: 'History'
                        }
                    }], 
                    options: {
                        bottomTab: {
                            text: 'History',
                            icon: require('../public/assets/settings-icon.png')
                        }
                    }
                }
            },
          ]
        }
    }
  });
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke'
  }
});