import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { ICONS } from "../assets/icons";

function convertFahrenheitToCelsius(degrees) {
  return Math.floor((5 / 9) * (degrees - 32));
}

const ForecastItem = ({ phrase, icon = 1, maxTemp, minTemp, date }) => {
  const formatDate = new Date(date).toJSON().slice(0, 10)
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontWeight: 'bold' }]}>{formatDate}</Text>
      <Text style={styles.text}>min {convertFahrenheitToCelsius(minTemp)}- max {convertFahrenheitToCelsius(maxTemp)}</Text>
      <Text style={styles.text}> {phrase}</Text>
      <Image style={styles.img} source={ICONS[+icon]} />
    </View>
  );
};
export default ForecastItem;

const styles = StyleSheet.create({
  container: {
    width: 160,
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    padding: 2,
  },
  img: {
    alignSelf: "center",
  },
});
