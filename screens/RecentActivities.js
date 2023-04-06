import { View, StyleSheet } from "react-native";
import React from "react";
import MyButton from "../components/MyButton";
import Footer from "../components/Footer";
import EventList from "../components/EventList";
import { COLORS } from "../utils/StyleGuide";
import ActionButton from "../components/ActionButton";

export default function RecentActivities({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <ActionButton title="אזור אישי" />
        <View style={styles.menu}>
          <EventList title={"פעילויות קודמות"} list={[]} />
        </View>
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
    flex: 1,
    marginTop: 80,
    paddingBottom: "5%",
  },
});
