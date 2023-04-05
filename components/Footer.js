import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const Footer = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo2.png")} />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
  },
});
