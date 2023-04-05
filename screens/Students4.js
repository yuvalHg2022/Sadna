import { View, StyleSheet } from "react-native";
import React from "react";
import MyButton from "../components/MyButton";
import Footer from "../components/Footer";
import EventList from "../components/EventList";
import { COLORS } from "../utils/StyleGuide";
import ActionButton from "../components/ActionButton";
import Studentlist from "../components/StudentsList";
 
export default function Students4({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <ActionButton title="אזור אישי" />
        <Studentlist />
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "15%",
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
