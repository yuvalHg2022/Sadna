import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { ICONS } from "../assets/icons";

function convertFahrenheitToCelsius(degrees) {
  return Math.floor((5 / 9) * (degrees - 32));
}

const ForecastItem = ({ phrase, icon = 1, maxTemp, minTemp }) => {

  return (
    <View style={styles.continaer}>
      <Text style={styles.text}>מינ {convertFahrenheitToCelsius(minTemp)}</Text>
      <Text style={styles.text}> {phrase}</Text>
      <Text style={styles.text}>מקס {convertFahrenheitToCelsius(maxTemp)}</Text>

      <Image style={styles.img} source={ICONS[+icon]} />
    </View>
  );
};
export default ForecastItem;

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
