import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import EventList from "../components/EventList";
import { COLORS } from "../utils/StyleGuide";
import ActionButton from "../components/ButtonToPerosnalScreen";
import MyTittle from "../components/MyTittle";
import { FontAwesome } from "@expo/vector-icons";
import eventListData from "../assets/mocks/eventList.json";
import { getDocs, collection, query, where } from "firebase/firestore";
import db from "../config";
import { AntDesign } from '@expo/vector-icons';
import { lightBlue, red } from "@mui/material/colors";

export default function CloseActivity({ navigation }) {
  const [closeActivity, setCloseActivity] = useState({});
  const [arrivingPupils, setArrivingPupils] = useState([]);
  const [nonArrivingPupils, setNonArrivingPupils] = useState([]);

  const getActivitiesAndSortByDate = async () => {
    let querySnapshot = await getDocs(collection(db, "tasks"));
    let activities = [];
    querySnapshot.forEach((doc) => {
      activities.push(doc.data());
    });
    activities = activities.sort((a, b) =>
      a.date > b.date ? -1 : b.date > a.date ? 1 : 0
    );
    setCloseActivity(activities[0]);
  };

  useEffect(() => {
    getActivitiesAndSortByDate();
    setArrivingPupils([
      { id: 1, name: "מיכל גרון" },
      { id: 2, name: "ירון כהן" },
      { id: 3, name: "דנה שלמה" },
      {id: 4, name: 'יואב צור'}
    ]);
    setNonArrivingPupils([
      { id: 4, name: "תמר שלום" },
      { id: 5, name: "יותם אוחנה" },
      { id: 6, name: "רומי אלמקייס" }
    ]);
  }, []);

  const onActivity = (action) => {
    switch (action) {
      case "confirm":
        // TODO: send response to server
        break;
      case "reject":
        // TODO: send response to server
        break;
      case "thanks":
        Alert.alert('Thank you');
        break;
      case "thanks-a-lot":
        Alert.alert('Thank you');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <ActionButton title="אזור אישי" navigation={navigation} />
        <View style={styles.content}>
          <View>
            <MyTittle
              text="הפעילות הקרובה"
              styleText={{ textAlign: "right", paddingRight: 22 }}
            />
            <View style={styles.activity}>
              <Text style={[styles.activityText, { fontWeight: 'bold', fontSize: 24 }]}>{closeActivity.subject}</Text>
              <View style={styles.row}>
                <Text style={styles.activityText}>{closeActivity.date}</Text>
                <FontAwesome name="calendar" size={26} color={COLORS.black} />
              </View>
              <View style={styles.row}>
                <Text style={styles.activityText}>{closeActivity.hour}</Text>
                <AntDesign name="clockcircleo" size={24} color="black" />
              </View>
              <View style={styles.row}>
                <Text style={styles.activityText}>{closeActivity.place}</Text>
                <FontAwesome name="home" size={26} color={COLORS.black} />
              </View>
              <Text style={styles.activityText} numberOfLines={5}>{closeActivity.details}</Text>
            </View>
            <View style={styles.arrivingPupilsContainer}>
              <Text style={[styles.arrivingPupilsTitle, { textAlign: 'right' }]}>חניכים שאישרו הגעה:</Text>
              <View>
                {arrivingPupils.map((pupil) => (
                  <View key={pupil.id} style={styles.pupilContainer}>
                    <FontAwesome name="check" size={20} color="green" />
                    <Text style={[styles.pupilName, { textAlign: 'right' }]}>{pupil.name}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.nonArrivingPupilsContainer}>
              <Text style={[styles.nonArrivingPupilsTitle, { textAlign: 'right' }]}>חניכים שלא אישרו הגעה:</Text>
              <View>
                {nonArrivingPupils.map((pupil) => (
                  <View key={pupil.id} style={styles.pupilContainer}>
                    <FontAwesome name="times" size={20} color="red" />
                    <Text style={[styles.pupilName, { textAlign: 'right' }]}>{pupil.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: COLORS.gray_blue }]}
              onPress={() => Alert.alert('פעולתך נשמרה בהצלחה!')}
            >
              <Text style={styles.buttonText}>עדכון פרטי פעילות</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: COLORS.gray_blue }]}
              onPress={() => Alert.alert('פעולתך נשמרה בהצלחה!')}
            >
              <Text style={styles.buttonText}>סיכום פעילות</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Footer />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 90,
    paddingBottom: 20,
  },
  content: {
    flex: 1,
    width: "90%",
    justifyContent: "space-between",
  },
  activity: {
    padding: 5,
    backgroundColor: COLORS.light_gray,
    borderRadius: 25,
    // marginBottom: 11,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
  activityText: {
    color: COLORS.black,
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'right',
  },
  arrivingPupilsContainer: {
    borderRadius: 10,
    paddingRight: 20,
    paddingTop:20,
  },
  nonArrivingPupilsContainer: {
    borderRadius: 10,
    borderRadiusColor:lightBlue,
    paddingRight: 20,
  },
  arrivingPupilsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  nonArrivingPupilsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  pupilContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginBottom: 10,
  },
  pupilName: {
    marginRight: 10,
    fontSize:18,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.white,
  },
});