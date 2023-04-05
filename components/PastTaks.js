import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const PastTaks = ({ subject, id, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>
        פעילות {id} {subject}
      </Text>
    </TouchableOpacity>
  );
};

export default PastTaks;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 25,
  },
  text: {
    padding: 2,
    width: 300,
    textAlign: "center",
    fontSize: 13,
  },
  id: {
    textAlign: "start",
  },
});
