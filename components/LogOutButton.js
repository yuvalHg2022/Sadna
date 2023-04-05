import { View, Text, StyleSheet } from "react-native";
import React from "react";

const LogOutButton = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    position: "absolute",
    top: 20,
    left: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
  text: {
    color: "white",
    fontSize: 16,
    padding: 13,
  },
});
export default LogOutButton;
