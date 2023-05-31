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

  return (
    <>
      <View style={styles.container}>
        <ActionButton title="אזור אישי" navigation={navigation} />
        <View style={styles.content}>
          <View>
            <MyTittle
              text="הפעילות הקרובה"
              styleText={{ textAlign: "left", paddingLeft:22, paddingTop:20 }}
            />
            <View style={styles.activity}>
              <Text style={[styles.activityText, { fontWeight: 'bold', fontSize: 24, textAlign: 'left' }]}>{closeActivity.subject}</Text>
              <View style={styles.row}>
                <FontAwesome name="calendar" size={26} color={COLORS.black} />
                <Text style={styles.activityText}>{closeActivity.date}</Text>
              </View>
              <View style={styles.row}>
                <AntDesign name="clockcircleo" size={24} color="black" />
                <Text style={styles.activityText}>{closeActivity.hour}</Text>
              </View>
              <View style={styles.row}>
                <FontAwesome name="home" size={26} color={COLORS.black} />
                <Text style={styles.activityText}>{closeActivity.place}</Text>
              </View>
              <Text style={[styles.activityText, { textAlign: 'left',fontSize:18 }]} numberOfLines={5}>{closeActivity.details}</Text>
            </View>
            <View style={styles.arrivingPupilsContainer}>
              <Text style={[styles.arrivingPupilsTitle, { textAlign: 'left' }]}>חניכים שאישרו הגעה:</Text>
              <View>
                {arrivingPupils.map((pupil) => (
                  <View key={pupil.id} style={styles.pupilContainer}>
                    <FontAwesome name="check" size={20} color="green" marginRight={10}/>
                    <Text style={[styles.pupilName, { textAlign: 'left' }]}>{pupil.name}</Text>
                  
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.nonArrivingPupilsContainer}>
              <Text style={[styles.nonArrivingPupilsTitle, { textAlign: 'left' }]}>חניכים שלא אישרו הגעה:</Text>
              <View>
                {nonArrivingPupils.map((pupil) => (
                  <View key={pupil.id} style={styles.pupilContainer}>
                   <FontAwesome name="times" size={20} color="red" marginRight={10}/>
                    <Text style={[styles.pupilName, { textAlign: 'left' }]}>{pupil.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.buttonContainer, { backgroundColor: COLORS.gray_blue }]}
              onPress={() => navigation.navigate('NewTask')}
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
    alignItems: 'flex-start',
    justifyContent: "space-between",
    paddingTop: 90,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  activity: {
    padding: 5,
    backgroundColor: COLORS.light_gray,
    borderRadius: 25,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
  activityText: {
    color: COLORS.black,
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: 'left',
  },
  arrivingPupilsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'flex-start',
  },
  nonArrivingPupilsContainer: {
    paddingLeft: 20,
    alignItems: 'flex-start',
  },
  arrivingPupilsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: 'left',
  },
  nonArrivingPupilsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 20,
    textAlign: 'left',
  },
  pupilContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,

  },
  pupilName: {
    marginRight: 10,
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
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
