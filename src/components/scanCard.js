import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import colors from "../config/colors";
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

function Card({ date, devices, longitude, latitude }) {
  return (
    <View style={styles.card}>
      <Icon name={devices > 15 ?  ('account-alert-outline') : ('account-check-outline')} size={100} color={devices != 0 ? ('red') : ('lightgreen')}  />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          Title
        </Text>
        
        <Text style={styles.subTitle} numberOfLines={1}>
          Date : {date}
        </Text>
        <Text style={styles.status} numberOfLines={1}>
          Devices : {devices}
        </Text>
      </View>


      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          Cordinates
        </Text>
        
        <Text style={styles.subTitle} numberOfLines={1}>
          Longitude : {longitude}
        </Text>
        <Text style={styles.status} numberOfLines={1}>
          Latitude : {latitude}
        </Text>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 6,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 40,
  },
  status: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;
