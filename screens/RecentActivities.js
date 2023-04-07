import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import MyButton from "../components/MyButton";
import Footer from "../components/Footer";
import EventList from "../components/EventList";
import { COLORS } from "../utils/StyleGuide";
import ActionButton from "../components/ActionButton";
import react, { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import db from "../config";

export default function RecentActivities({ navigation }) {
  let activities = []; // useState here couse infinite loop

  const getActivitiesAndSortByDate = async () => {
    let querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      activities.push(doc.data());
    });
    activities = activities.sort((a, b) =>
      a.date > b.date ? -1 : b.date > a.date ? 1 : 0
    );
    console.log("------");
    console.log("Activities ");
    console.log(activities);
    console.log("------");
  };

  useEffect(() => {
    getActivitiesAndSortByDate();
  }, []);
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
