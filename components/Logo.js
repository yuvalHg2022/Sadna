import React from 'react'
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../utils/StyleGuide";

const SCREEN_HEIGHT = Dimensions.get("screen").height

export default function Logo() {
  return <Image source={require('../assets/logo.png')} style={{ height: SCREEN_HEIGHT * 0.4 }} resizeMode={'contain'} />
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    marginBottom: 5,
  },
})