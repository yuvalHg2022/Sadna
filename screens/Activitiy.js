import { View, StyleSheet } from "react-native";
import React from "react";
import MyButton from "../components/MyButton";
import Footer from "../components/Footer";
import EventList from "../components/EventList";
import { COLORS } from "../utils/StyleGuide";
import LogOutButton from "../components/LogOutButton";

export default function Activitiy({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <LogOutButton title="אזור אישי" />

        <View style={{ flex: 0.2 }} />
        <View style={styles.menu}>
          <MyButton
            title=" יצירת פעולה חדשה"
            onPress={() => navigation.navigate("NewTask")}
          />
          <MyButton title="הפעולה הקרובה" />
          <MyButton title="פעולות קודמות" />
        </View>
        <EventList />
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  menu: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "5%",
  },
});