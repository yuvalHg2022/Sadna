import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const ActionButton = ({ title, navigation }) => {
  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    position: "absolute",
    top: 60,
    left: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    width: 112,
    height: 42,
  },
  text: {
    color: "white",
    fontSize: 14,
    padding: 10,
    fontWeight: "bold",
  },
});

export default ActionButton;

