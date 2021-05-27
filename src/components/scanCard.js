import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import colors from "../config/colors";
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SimpleDateTime  from 'react-simple-timestamp-to-date';

function Card({ date, devices, longitude, latitude }) {
  return (
    <View style={styles.card}>
      <Icon name={devices <= 15 ? ('account-check-outline') : ('account-alert-outline')} size={100} color={devices <= 15 ? ('lightgreen') : ('red')}  />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          Scan Info
        </Text>
        
        <Text style={styles.subTitle} numberOfLines={1}>
          <SimpleDateTime dateSeparator="-" format="DMY" showTime="0">{date / 1000}</SimpleDateTime>
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
