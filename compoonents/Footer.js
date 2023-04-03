import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const Footer = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginBottom: 10,
  },
});
