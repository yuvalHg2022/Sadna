import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MyButton from "../components/MyButton";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Footer from "../components/Footer";
import { COLORS } from "../utils/StyleGuide";
import LogOutButton from "../components/LogOutButton";

export default function Home3({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <LogOutButton title="התנתקות" />
        <MyButton
          title="פעילויות"
          color={COLORS.light_gray}
          onPress={() => navigation.navigate("Activitiy4")}
          icon={<FontAwesome name="calendar" size={24} color={COLORS.black} />}
        />
        <MyButton
          title="חניכים"
          color={COLORS.light_gray}
          icon={
            <Ionicons name="person-outline" size={24} color={COLORS.black} />
          }
        />
        <MyButton
          title="הודעות"
          color={COLORS.light_gray}
          icon={<AntDesign name="message1" size={24} color={COLORS.black} />}
        />
      </View>
      <Footer />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
