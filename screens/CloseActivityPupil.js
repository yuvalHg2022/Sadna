import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import react, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import EventList from "../components/EventList";
import { COLORS } from "../utils/StyleGuide";
import ActionButton from "../components/ButtonToPerosnalScreen";
import MyTittle from "../components/MyTittle";
import { FontAwesome } from "@expo/vector-icons";
import eventListData from "../assets/mocks/eventList.json";
import { getDocs, collection } from "firebase/firestore";
import db from "../config";
import { AntDesign } from '@expo/vector-icons';

export default function CloseActivityPupil({ navigation }) {
  const [closeActivity, setCloseActivity] = useState({})

  const getActivitiesAndSortByDate = async () => {
    let querySnapshot = await getDocs(collection(db, "tasks"));
    let activities = [];
    querySnapshot.forEach((doc) => {
      activities.push(doc.data());
    });
    activities = activities.sort((a, b) =>
      a.date > b.date ? -1 : b.date > a.date ? 1 : 0
    );
    setCloseActivity(activities[0])
  };

  const onActivity = (action) => {
    switch (action) {
      case "confirm":
        //TODO: send response to server
        break;
      case "reject":
        //TODO: send response to server
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    getActivitiesAndSortByDate();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ActionButton title="אזור אישי" navigation={navigation}/>
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
            <View style={styles.buttonsLine}>
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { backgroundColor: COLORS.green },
                ]}
                onPress={() => onActivity("confirm") + Alert.alert('הגעתך נשמרה!')}
              >
                <Text style={styles.buttonText}>{"מגיע/ה"}</Text>
                <FontAwesome name="check" size={20} color={COLORS.black} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { backgroundColor: COLORS.red },
                ]}
                onPress={() => onActivity("reject") + Alert.alert('פעולתך נשמרה בהצלחה!')}
              >
                <Text style={styles.buttonText}>{"לא מגיע/ה"}</Text>
                <FontAwesome name="close" size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
          <EventList
            containerStyle={{ flex: .8 }}
            title={"לוח אירועים"}
            list={eventListData}
          />
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
  },
  content: {
    flex: 1,
    marginTop: 70,
  },
  activity: {
    padding: 5,
    marginHorizontal: 22,
    backgroundColor: COLORS.light_gray,
    borderRadius: 25,
    marginBottom: 11,
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
  buttonsLine: {
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 20,
    paddingHorizontal: 8,
  },
});
