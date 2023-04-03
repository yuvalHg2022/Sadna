import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const MyButton = ({ title, onPress, color, icon }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View style={styles.titleAndIconContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.icon}>{icon}</View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: 70,
    width: "90%",
    borderRadius: 30,
    marginVertical: 8,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 30,
    fontWeight: "bold",
    color: "#23297a",
  },
  titleAndIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  icon: {
    marginVertical: 6,
    marginHorizontal: 20,
  },
});

export default MyButton;
