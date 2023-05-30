import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { COLORS } from "../utils/StyleGuide";
import ActionButton from "../components/ButtonToPerosnalScreen";
import { onSnapshot, collection } from "firebase/firestore";
import db from "../config";
import ActivityList from "../components/ActivityList";

export default function RecentActivities({ navigation }) {
  const [activities, setActivities] = useState([]);

  const getActivitiesAndSortByDate = async () => {
    const todayDate = new Date();
    onSnapshot(collection(db, "tasks"), (snapshot) => {
      let activities = [];
      snapshot.forEach((doc) => {
        activities.push(doc.data());
      });
      activities = activities.filter(
        (item) => todayDate.getTime() >= new Date(item.date).getTime()
      );
      activities = activities.sort((a, b) =>
        a.date > b.date ? -1 : b.date > a.date ? 1 : 0
      );
      setActivities(activities);
    });
  };

  useEffect(() => {
    getActivitiesAndSortByDate();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ActionButton title="אזור אישי" navigation={navigation} />
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
    paddingTop: 60,
    flex: 1,
    backgroundColor: COLORS.white,
  },
  menu: {
    flex: 1,
    marginTop: 80,
    paddingBottom: "5%",
  },
});
