import React, { Component, useState, useEffect, View, Text } from "react";
import Geolocation from 'react-native-geolocation-service';

class Geo extends Component {
    state = {  }


    componentDidMount() {
        if (hasLocationPermission) {
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
      }
    
    render() {
        return (
           <View>
               <Text>Hey</Text>
           </View> 
        );
    } 
}

export default Geo;