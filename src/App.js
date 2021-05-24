import React, { Component } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import BluetoothScanner from "./btComponent";
import BtComponent from "./btCom";
import BtTest from "./btTest";
import Menu from './menu';
import Geo from './geo';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <NavigationContainer>
        <View style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.logo}>Disease Warner</Text>
          </View>
          <Stack.Navigator>
            <Stack.Screen 
              name="Scanner"
              component={scannerScreen} />
            <Stack.Screen 
              name="Hisotry"
              component={historyScreen} />
            <Stack.Screen 
              name="Settings"
              component={settingScreen} />
            <Stack.Screen 
              name="Exit"
              component={exitScreen} />
          </Stack.Navigator>
          
          
          <Menu />
        </View>
      </NavigationContainer>
        
          
      
    )
  }
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  header: {
    backgroundColor: 'dodgerblue', 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingVertical: 10
  },
  logo: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold'
  },


  body: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  scanbtn: {
    borderRadius: 10
  },

});

export default App;