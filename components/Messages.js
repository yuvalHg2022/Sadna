import { View, StyleSheet } from "react-native";
import React from "react";
import MyButton from "../components/MyButton";
import Footer from "../components/Footer";
import EventList from "../components/EventList";
import { COLORS } from "../utils/StyleGuide";
import ActionButton from "../components/ActionButton";
import eventListData from '../assets/mocks/eventList.json'

export default function Activitiy({ navigation }) {
  return (
    <>
        <ActionButton title="אזור אישי" />

        <EventList title={"הודעות"} list={eventListData}/>
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
