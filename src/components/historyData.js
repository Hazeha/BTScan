import React, { Component } from 'react';
import { 
    FlatList,
    View, 
    AsyncStorage,
    Button,
    Text,
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

    readAsyncScanData = () => {
        AsyncStorage.getItem("dataKey").then(data => {
            if(data){
            let ourData = JSON.parse(data);
            this.data = ourData;
            this.setState({ data })
            console.log(this.data);
            }
        }).catch(err => console.log("error >>>>> ",err))
    }

    render() {
        return (
            <View>
                <Button onPress={() => this.componentDidMount()} title="Update List"/>
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