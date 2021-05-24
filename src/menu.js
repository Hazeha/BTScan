import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Button, 
    StyleSheet,
    Image,
    TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Geolocation from 'react-native-geolocation-service';

import { SvgUri } from 'react-native-svg';


class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            yes: 'no',
            btnIconColor: 'lightblue',
            btnIconSize: 120,
            hasLocationPermission: true
        }
    }
    
    start() {
        console.log('start');
    }

    open() {
        console.log('open');
        this.list();
    }

    list() {
        console.log('opened list');
    }
    componentDidMount() {
        console.log('Menu Mounted');

    }
                        // <Icon name="radar" size={this.state.btnIconSize} color={this.state.btnIconColor} />
                       // <Text style={styles.btnText}>Current Status</Text>
    render() {
        return (
            <View style={styles.btnContainer}>
                <View style={styles.row}>
                    <TouchableHighlight onPress={this.start}>
                        <View style={styles.button}>
                            <Icon name="radar" size={80} color="white" />
                            <Text style={styles.btnText}>Scanner</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this.start}>
                        <View style={styles.button}>
                        <Icon name="history" size={80} color="white" />
                            <Text style={styles.btnText}>History</Text>
                        </View>
                    </TouchableHighlight>
                
                    <TouchableHighlight onPress={this.start}>
                        <View style={styles.button}>
                        <Icon name="account-cog-outline" size={80} color="white" />
                            <Text style={styles.btnText}>Settings</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this.start}>
                        <View style={styles.button}>
                        <Icon name="location-exit" size={80} color="white" />
                            <Text style={styles.btnText}>Exit App</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            
        );
    }
}
const styles = StyleSheet.create({
    btnContainer: {
        
        borderTopWidth: 2,
        borderColor: 'lightblue',
        justifyContent: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightblue',
        margin: 5,
        borderRadius: 3,
        backgroundColor: 'dodgerblue',
        color: 'white',
        padding: 4,

        
    },
    btnText: {
        alignSelf: 'center',
        color: 'white'
    }
  });

export default Menu;
