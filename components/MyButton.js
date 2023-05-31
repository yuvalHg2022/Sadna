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
    justifyContent: "left",
    alignItems: "flex-start", 
    height: 52,
    width: 312,
    borderRadius: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.black,
    flexDirection: 'row', 
  },
  title: {
    textTransform: "capitalize",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 29,
    color: COLORS.black,
    textAlign: "right", // Align text to the right
  },
  titleAndIconContainer: {
    padding:10,
    flexDirection: "row-reverse",
    justifyContent: "flex-end", // Adjust alignment to flex-end
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default MyButton;
