import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import MyButton from "../compoonents/MyButton";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Footer from "../compoonents/Footer";

export default function Home3({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>

      <MyButton
        title="פעילויות"
        color="#CCCCFF"
        onPress={() => navigation.navigate("Activitiy4")}
        icon={<FontAwesome name="calendar" size={24} color="black" />}
      />
      <MyButton
        title="חניכים"
        color="#CCCCFF"
        icon={<Ionicons name="person-outline" size={24} color="black" />}
      />
      <MyButton
        title="הודעות"
        color="#CCCCFF"
        icon={<AntDesign name="message1" size={24} color="black" />}
      />
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
