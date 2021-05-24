import React, { Component } from 'react';
import { 
    FlatList,
    DeviceEventEmitter, 
    View, 
    Text,
    StyleSheet,
    Switch,
    Slider,
    Button } from 'react-native';

import BleManager from 'react-native-ble-manager';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
class BtTest extends Component {
    constructor(props){
        super(props);

        this.state = {
            listData: [],
            timePassed: false,
            closeDevices: '0',
            toggleSwitch: false,
            isEnabled: false,
            maxPerip: '15',
            maxPeripWarn: false
        };
    }
    checkStatus() {
        BleManager.checkState();
    }
    componentDidMount() {
        console.log('bluetooth scanner mounted');
        BleManager.enableBluetooth().then(() => {
            // Success code
            console.log("The bluetooth is already enabled or the user confirm");
        }).catch((error) => {
            // Failure code
            console.log("The user refuse to enable bluetooth");
        });
        
        DeviceEventEmitter.addListener('BleManagerDiscoverPeripheral',(data) => 
        {
            if (data.isConnectable = true) {
                console.log(data.id); // Name of peripheral device
                console.log(data.isConnectable);
            }
            BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
                // Success code
                console.log("Discovered peripherals: " + peripheralsArray.length);
                this.setState({closeDevices: peripheralsArray.length});
                console.log(this.state.closeDevices);
                if (this.maxPerip >= peripheralsArray.length) {
                    this.setState(prevState => ({
                        maxPeripWarn: true
                    }));
                    console.log(maxPeripWarn);
                }
              });
        });

        BleManager.start({showAlert: false})
        .then(() => {
            // Success code 
            console.log('Module initialized');
            });
    }
    
    startScanning() {
       console.log('start scanning');
       BleManager.scan([], 10, false).then(() => {
        // Success code
        console.log("Scan started");
      });
       
      
    }

    getLocation() {
        Geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
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

    getNumber() {
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
            <View>
                <View style={styles.body}>
                    <Text style={{fontSize: 20}}>Area Scanner</Text>
                    
                    <Text style={{fontSize: 16, color: this.state.maxPeripWarn ? ('red'):('blue') }}>Beware many people in your area</Text>
                    
                
                <Icon name="radar" size={350} color="lightblue" />
                <Text style={{fontSize: 15}}>There are currently { this.getNumber() } devices in range</Text>
            </View>
            <View style={{padding: 50 }}>            
                <Button onPress={() => this.startScanning()} title="Start scanning"/>
                <View style={styles.swtiches}>
                    <View style={styles.slider}>
                       <Slider
                            style={{width: 200, height: 40}}
                            minimumValue={10}
                            maximumValue={100}
                            step={5}
                            value={15}
                            onValueChange={value => this.setState({maxPerip: value})}
                            minimumTrackTintColor="lightgreen"
                            maximumTrackTintColor="red"
                            thumbTintColor="lightblue"
                        />
                        <Text style={styles.sliderHandleText}>{this.sliderHandle()}</Text> 
                    </View>
                    <View style={styles.autoScan}>
                        <Text>AutoScan</Text>
                       <Switch 
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={value => this.setState({toggleSwitch: value})}
                        value={this.state.isEnabled}
                    /> 
                    </View>
                    
                </View>
                
                  

            </View>
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