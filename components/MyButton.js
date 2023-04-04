import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../utils/StyleGuide";

const MyButton = ({ title, onPress, color = COLORS.light_gray, icon, style }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }, style]}
      onPress={onPress}
    >
      <View style={styles.titleAndIconContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.icon}>{icon}</View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-end",
    height: 52,
    width: 312,
    borderRadius: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 29,
    color: COLORS.black,
  },
  titleAndIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    // marginVertical: 6,
    marginHorizontal: 20,
  },
});

export default MyButton;
