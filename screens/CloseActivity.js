import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import react, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import EventList from "../components/EventList";
import { COLORS } from "../utils/StyleGuide";
import ActionButton from "../components/ActionButton";
import MyTittle from "../components/MyTittle";
import { FontAwesome } from "@expo/vector-icons";
import eventListData from "../assets/mocks/eventList.json";
import { getDocs, collection } from "firebase/firestore";
import db from "../config";

export default function CloseActivity({ navigation }) {
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
        <ActionButton title="אזור אישי" />
        <View style={styles.content}>
          <View>
            <MyTittle
              text="הפעילות הקרובה"
              styleText={{ textAlign: "right", paddingRight: 22 }}
            />
            <View style={styles.activity}>
              <View style={styles.row}>
                <Text style={styles.activityText}>{closeActivity.date}</Text>
                <FontAwesome name="calendar" size={26} color={COLORS.black} />
              </View>
              <View style={styles.row}>
                <Text style={styles.activityText}>{closeActivity.hour}</Text>
                <FontAwesome name="check" size={26} color={COLORS.black} />
              </View>
              <View style={styles.row}>
                <Text style={styles.activityText}>{closeActivity.place}</Text>
                <FontAwesome name="home" size={26} color={COLORS.black} />
              </View>
            </View>
            <View style={styles.buttonsLine}>
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { backgroundColor: COLORS.green },
                ]}
                onPress={() => onActivity("confirm")}
              >
                <Text style={styles.buttonText}>{"מגיע/ה"}</Text>
                <FontAwesome name="check" size={20} color={COLORS.black} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { backgroundColor: COLORS.red },
                ]}
                onPress={() => onActivity("reject")}
              >
                <Text style={styles.buttonText}>{"לא מגיע/ה"}</Text>
                <FontAwesome name="close" size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
          <EventList
            containerStyle={{ flex: 1 }}
            title={"לוח אירועים"}
            list={eventListData}
          />
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
  content: {
    flex: 1,
    marginTop: 80,
  },
  activity: {
    padding: 10,
    height: 180,
    marginHorizontal: 22,
    backgroundColor: COLORS.light_gray,
    borderRadius: 25,
    marginBottom: 11,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  activityText: {
    color: COLORS.black,
    fontSize: 26,
    paddingHorizontal: 20,
  },
  buttonsLine: {
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 20,
    paddingHorizontal: 8,
  },
});
