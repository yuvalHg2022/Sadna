import { View, StyleSheet } from "react-native";
import React from "react";
import MyButton from "../components/MyButton";
import Footer from "../components/Footer";
import EventList from "../components/EventList";
import { COLORS } from "../utils/StyleGuide";

export default function Activitiy4({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <View style={{flex:.2}}/>
        <View style={styles.menu}>
          <MyButton
            title=" יצירת פעולה חדשה"
            onPress={() => navigation.navigate("Register4")}
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
    flex: .3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '5%',
  },
});
