import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

function convertFahrenheitToCelsius(degrees) {
  return Math.floor((5 / 9) * (degrees - 32));
}

const ForecasrItem = ({ phrase, icon, maxTemp, minTemp }) => {
  var icon2 = require("../icons/1.png");

  return (
    <View style={styles.continaer}>
      <Text style={styles.text}>מינ {convertFahrenheitToCelsius(minTemp)}</Text>
      <Text style={styles.text}> {phrase}</Text>
      <Text style={styles.text}>מקס {convertFahrenheitToCelsius(maxTemp)}</Text>

      <Image style={styles.img} source={icon2} />
    </View>
  );
};
export default ForecasrItem;

const styles = StyleSheet.create({
  continaer: {
    height: 160,
    width: 160,
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    padding: 5,
  },
  img: {
    alignSelf: "center",
  },
});
