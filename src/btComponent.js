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
    FlatList} from 'react-native';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);
class BluetoothScanner extends Component {
    constructor(props){
        super(props);
        

        this.state = {
            isScanning: false,
            setIsScanning: false,
            peripherals: new Map(),
            list: [], 
            setList: [],
            
        }
        this.devices = [];
    }

    startScanning() {
        console.log('start scanning');
        if (!this.isScanning) {
            BleManager.scan([], 3, true).then((results) => {
              console.log('Scanning...');
              setIsScanning(true);
            }).catch(err => {
              console.error(err);
            });
          }  
        
    }

    openList() {  
        console.log('open device list');
        BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
            console.log("Discovered peripherals " + peripheralsArray.length)
        })
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
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>} 
            ItemSeparatorComponent={this.renderSeparator} 
        />
        </View>
        );
            
        
    }
    componentDidMount() {
        console.log('bt scanner mounted');
        
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
                <Text>Bluetooth scanner</Text>
                <Button onPress={() => this.startScanning()} title="Open List of Devices"/>
                
                <Button onPress={() => this.openList()} title="of Devices"/>
                
            </View>
        );
    }
}
const styles = StyleSheet.create({
    item: {
      color: 'black'
    }
  
  });

export default BluetoothScanner;
