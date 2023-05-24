import React from 'react'
import { View, Image, StyleSheet, Dimensions } from "react-native";


export default function Footer() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/IGI.png')} style={{ height: SCREEN_HEIGHT * 0.1 }} resizeMode={'contain'} />
    </View>
  )
}
const SCREEN_HEIGHT = Dimensions.get("screen").height


const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#fff",
  },
});
