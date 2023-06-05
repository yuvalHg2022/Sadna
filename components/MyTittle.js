import { View, Text, StyleSheet } from "react-native";
import React from "react";

const MyTittle = ({ text, styleContainer, styleText }) => {
  return (
    <View style={[styles.container,styleContainer]}>
      <Text style={[styles.text, styleText]}>{text}</Text>
    </View>
  );
};

export default MyTittle;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  text: {
    fontSize: 32,
    fontWeight: "700",
    paddingHorizontal: 10,
  },
});
