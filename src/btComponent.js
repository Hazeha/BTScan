import React, { Component } from 'react';
import { DeviceEventEmitter, View, Text, StyleSheet, Button } from 'react-native';

import BleManager from 'react-native-ble-manager';
import Geolocation from 'react-native-geolocation-service';
class BtTest extends Component {
    constructor(props){
        super(props);

        this.state = {

        };
    }

    componentDidMount() {
        BleManager.start({showAlert: false})
        .then(() => {
            console.log('BLE Module initialized');
        });

        BleManager.enableBluetooth().then(() => {
            console.log("The bluetooth is already enabled or the user confirm");
        }).catch((error) => {
            console.log("The user refuse to enable bluetooth");
        });
        
        DeviceEventEmitter.addListener('BleManagerDiscoverPeripheral',(data) => 
        {
            BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
                console.log("Discovered peripherals: " + peripheralsArray.length);
            });
        });
    } 
    
startScanning() {
    console.log('start scanning');
    BleManager.scan([], 10, false).then(() => {
        // Success code
        console.log("Scan started");
        
    });
    this.getLocation();
}

getLocation() {
    Geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
        },
        (error) => {
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 5000 }
    );
}
    
    getList() {
        BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
            // Success code
            console.log("Discovered peripherals: " + peripheralsArray.length);
            this.setState({closeDevices: peripheralsArray.length});
            console.log(this.state.closeDevices);
          });    
          BleManager.checkState();
    }

    getCloseDevices() {
        return (
            <Text>{this.state.closeDevices}</Text>
        );
    }
    sliderHandle() {
        return (
            <Text>{this.state.maxPerip}</Text>
        );
    }
render() {
    return (
        <View style={{padding: 50 }}>            
            <Button onPress={() => this.createScanData()} title="Start scanning"/>
        </View>            
    );
}
}
const styles = StyleSheet.create({ 
    body: {
      justifyContent: 'center', 
      alignItems: 'center',
    },
    scanbtn: {
      borderRadius: 10
    },
    swtiches: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    sliderHandleText: {

        
    },
    slider: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    autoScan: {
        alignItems: 'center'
    }
  });
export default BtTest;