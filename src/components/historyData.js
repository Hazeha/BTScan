import React, { Component } from 'react';
import { 
    FlatList,
    View, 
    AsyncStorage,
    Button,
    } from 'react-native';
import Card from "./scanCard";
import colors from "../config/colors";

class HistoryData extends Component {
    constructor(props){
        super(props);

        this.state = {
            data: [],
        };
        
    }


    componentDidMount() {
        this.readAsyncScanData();
        AsyncStorage.getItem('dataKey').then(data => this.setState({ data }));
    }

    clearData() {
        this.forceUpdate();
        console.log("forced update");
    }

    readAsyncScanData = () => {
        AsyncStorage.getItem("dataKey").then(data => {
            if(data){
            let ourData = JSON.parse(data);
            this.data = ourData;
            console.log(this.data);
            }
        }).catch(err => console.log("error >>>>> ",err))
    }

    render() {
        return (
            <View>
                <Button onPress={() => this.clearData()} title="Clear Data"/>
                <FlatList
                    data={this.data}
                    keyExtractor={item => item.timestamp}
                    renderItem={({ item }) => (
                    <Card
                        date={item.timestamp}
                        devices={item.devicesInRange} 
                        longitude={item.longitude}
                        latitude={item.latitude}
                    />
                    )}
                />
            </View>
        );
    }
}

export default HistoryData;