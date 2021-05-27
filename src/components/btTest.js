import React, { Component } from 'react';
import { 
    FlatList,
    DeviceEventEmitter, 
    View, 
    Text,
    StyleSheet,
    Switch,
    Slider,
    AsyncStorage,
    Button } from 'react-native';

import BleManager from 'react-native-ble-manager';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';
// import AsyncStorage from '@react-native-community/async-storage';

class BtTest extends Component {
    constructor(props){
        super(props);

        this.state = {
            listData: [],
            closeDevices: '0',
            maxPerip: '15',
            scanning: false,
            timestamp: '',
            devicesInRange: '',
            longitude: '',
            latitude: '',
        };
        this.data = [];
    }

    checkStatus() {
        BleManager.checkState();
    }

    componentDidMount() {
        this.getLocation();
        console.log('bluetooth scanner mounted');
        BleManager.enableBluetooth().then(() => {
            // Success code
            console.log("The bluetooth is already enabled or the user confirm");
        }).catch((error) => {
            // Failure code
            console.log("The user refuse to enable bluetooth");
        });
        
        DeviceEventEmitter.addListener('BleManagerDiscoverPeripheral',(data) => {
            BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
                this.setState({closeDevices: peripheralsArray.length});
                if (this.maxPerip >= peripheralsArray.length) {
                    this.setState(prevState => ({
                        maxPeripWarn: true
                    }));
                }
            });
        });
        BleManager.start({showAlert: false})
        .then(() => {
            console.log('Module initialized');
        });
    }

    createAsyncScanData = (value) => {
        this.getList();
        this.getLocation();
        this.data.push(
            {
            "timestamp": this.state.timestamp,
            "devicesInRange": this.state.closeDevices,
            "longitude": this.state.longitude,
            "latitude": this.state.latitude 
            ,}
        );
        AsyncStorage.setItem("dataKey", JSON.stringify(this.data));
    }

    readAsyncScanData = () => {
        AsyncStorage.getItem("dataKey").then(data => {
            if(data){
            let ourData = JSON.parse(data)
            console.log("ourData >>>>> ",ourData)
            }
        }).catch(err => console.log("error >>>>> ",err))
    }

    createScanData(){
        this.startScanning();
    }
    
    startScanning() {
        console.log('start scanning');
        this.setState({
            devicesInRange: null,
            scanning: true
        })
        BleManager.scan([], 5, false).then(() => {
            console.log("Scan started");
        });
        
        const timer = setTimeout(() => {
            this.createAsyncScanData();
            console.log('scan stopped');
            this.setState({
                scanning: false
            })
        }, 5500);
    }

    getLocation() {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    longitude: position.coords.longitude, 
                    latitude: position.coords.latitude, 
                    timestamp: position.timestamp });
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 18000, maximumAge: 30000 }
        );
    }
    
    getList() {
        BleManager.getDiscoveredPeripherals([]).then((peripheralsArray) => {
            this.setState({closeDevices: peripheralsArray.length});
          });    
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
                    
                    <Text style={{fontSize: 16, color: this.state.closeDevices <= this.state.maxPerip ? ('blue'):('red') }}>
                        {this.state.closeDevices <= this.state.maxPerip ? ('Not many people in your area'):('Beware many people in your area') }</Text>
                    
                
                <Icon name="radar" size={350} color="lightblue" />
                <Text style={{fontSize: 15}}>There are currently { this.getNumber() } devices in range</Text>
                </View>
                <View style={{padding: 50 }}>            
                    <Button onPress={() => this.createScanData()} title={this.state.scanning === true ? ('Scanning...') : ('Start Scan')}/>
                </View>
                <View style={styles.swtiches}>
                
                        <View style={styles.slider}>
                            <Text>Max</Text>
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
        justifyContent: 'center',
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