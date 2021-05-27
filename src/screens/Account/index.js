import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import BtTest from '../../components/btTest';
const AccountScreen = (props) => {
  return (
    <View>
      <BtTest />
    </View>
  );

AccountScreen.options = {
    topBar: {
        title: {
            text: 'Account',
        },
    },
    bottomTab: {
        Text: 'Account'
    }
}
};

export default AccountScreen;