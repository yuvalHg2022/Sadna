import { View, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { COLORS } from "../utils/StyleGuide";

const SCREEN_HEIGHT = Dimensions.get("screen").height

const Footer = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} style={{ height: SCREEN_HEIGHT * 0.1 }} resizeMode={'contain'} />
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: "100%",
    alignItems: "center",
    paddingBottom: 16,
  },
});
