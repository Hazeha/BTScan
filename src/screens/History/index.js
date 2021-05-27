import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import HistoryData from "../../components/historyData";
import Card from "../../components/scanCard";
import colors from "../../config/colors";

const listings = [
  {
    id: 1,
    title: "Copenhagen",
    peripherals: 24,
    status: 0
  },
  {
    id: 2,
    title: "Roskilde",
    peripherals: 10,
    status: 2
  },
  {
    id: 3,
    title: "Roskilde",
    peripherals: 13,
    status: 0
  },
  {
    id: 4,
    title: "Copenhagen",
    peripherals: 29,
    status: 0
  },
  {
    id: 5,
    title: "Copenhagen",
    peripherals: 42,
    status: 0
  },
];

function HistoryScreen(props) {
  return (
    <View>
      <HistoryData
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default HistoryScreen;
