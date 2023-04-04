import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import MyButton from "../compoonents/MyButton";
import Register4 from "./Register4";
import Footer from "../compoonents/Footer";

export default function Activitiy4({ navigation }) {
  return (
    <View style={styles.container}>
      <MyButton
        title=" יצירת פעולה חדשה"
        color="#CCCCFF"
        onPress={() => navigation.navigate("Register4")}
      />
      <MyButton title="הפעולה הקרובה" color="#CCCCFF" />
      <MyButton title="פעולות קודמות" color="#CCCCFF" />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
