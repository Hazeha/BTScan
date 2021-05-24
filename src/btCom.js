import React, { Component, useState,
    useEffect, } from 'react';
import { 
    View, 
    Text, 
    Button, 
    StyleSheet,
    NativeModules,
    NativeEventEmitter,
    NativeAppEventEmitter,
    ScrollView,
    FlatList} from 'react-native';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
class BtComponent extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            isScanning: false,
            setIsScanning: false,
            peripherals: new Map(),
            list: [], 
            setList: [],
            devices: [],
            state: '',
        }
    }

    startScanning() {
        console.log('start scanning');
        if (!this.state.isScanning) {
            BleManager.scan([], 3, true).then((results) => {
              console.log('Scanning...');
              setIsScanning(true);
            }).catch(err => {
              console.error(err);
            });
          }  
        
    }
    stopScanning() {
        console.log('Scan is stopped');
        setIsScanning(false);
    }
    retrieveConnected() {  
        console.log('open device list');
        BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
            console.log("Discovered peripherals " + peripheralsArray.length)
        })
    }
    handleDiscoverPeripheral = (peripheral) => {
        console.log('Got ble peripheral', peripheral);
        if (!peripheral.name) {
          peripheral.name = 'NO NAME';
        }
        peripherals.set(peripheral.id, peripheral);
        setList(Array.from(peripherals.values()));
      }

    list() {
        
            return (
            <View style={''}>
            <FlatList
            data={[
                {key: 'Android'}, 
                {key: 'iOS'}, 
                {key: 'Java'},
                {key: 'Swift'},
                {key: 'Php'},
                {key: 'Hadoop'},
                {key: 'Sap'}
            ]} 
            renderItem={({item}) => <Text style={styles.item}> {item.key} </Text> } 
            ItemSeparatorComponent={this.renderSeparator} 
        />
        </View>
        );
            
        
    }

    componentDidMount() {
        BleManager.start({showAlert: false})
        .then(() => {
            // Success code 
            console.log('Module initialized');
            });
    }
    
    useEffect() {
        BleManager.start({showAlert: false});
    
        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
        bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
        bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
        bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
    
        if (Platform.OS === 'android' && Platform.Version >= 23) {
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
              if (result) {
                console.log("Permission is OK");
              } else {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                  if (result) {
                    console.log("User accept");
                  } else {
                    console.log("User refuse");
                  }
                });
              }
          });
        }  
        
        return (() => {
          console.log('unmount');
          bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
          bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
          bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
          bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
        })
        }; 
      renderItem = (item) => {
        const color = item.connected ? 'green' : '#fff';
        return (
          <TouchableHighlight onPress={() => testPeripheral(item) }>
            <View style={[styles.row, {backgroundColor: color}]}>
              <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
              <Text style={{fontSize: 10, textAlign: 'center', color: '#333333', padding: 2}}>RSSI: {item.rssi}</Text>
              <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 2, paddingBottom: 20}}>{item.id}</Text>
            </View>
          </TouchableHighlight>
        );
      }
    
    renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#000",  
                }}  
            />  
        );  
    };

    render() {
        return (
            <View style={{padding: 50 }}>
                <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            
            <View style={{margin: 10}}>
              <Button 
                title={'Scan Bluetooth (' + (this.isScanning ? 'on' : 'off') + ')'}
                onPress={() => startScan() } 
              />            
            </View>

            <View style={{margin: 10}}>
              <Button title="Retrieve connected peripherals" onPress={() => retrieveConnected() } />
            </View>

            {(this.list.length == 0) &&
              <View style={{flex:1, margin: 20}}>
                <Text style={{textAlign: 'center'}}>No peripherals</Text>
              </View>
            }
          
          </View>              
        </ScrollView>
        <FlatList
            data={this.list}
            renderItem={({ item }) => renderItem(item) }
            keyExtractor={item => item.id}
          />  
            </View>
        );
    }
}
const styles = StyleSheet.create({
    item: {
      color: 'black'
    }
  
  });

export default BtComponent;
