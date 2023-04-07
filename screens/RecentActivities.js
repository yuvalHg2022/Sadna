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
import ActivityList from "../components/ActivityList";

export default function RecentActivities({ navigation }) {
  const [activities, setActivities] = useState([])

  const getActivitiesAndSortByDate = async () => {
    let querySnapshot = await getDocs(collection(db, "tasks"));
    let activities = []
    querySnapshot.forEach((doc) => {
      activities.push(doc.data());
    });
    activities = activities.sort((a, b) =>
      a.date > b.date ? -1 : b.date > a.date ? 1 : 0
    );
    setActivities(activities)
  };

  useEffect(() => {
    getActivitiesAndSortByDate();
  }, []);
  return (
    <>
      <View style={styles.container}>
        <ActionButton title="אזור אישי" />
        <View style={styles.menu}>
          <ActivityList title={"פעילויות קודמות"} list={activities} />
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
