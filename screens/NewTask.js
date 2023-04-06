import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import MyButton from "../components/MyButton";
import db from "../config";
import Footer from "../components/Footer";
import MyTittle from "../components/MyTittle";
import Toggle from "react-native-toggle-element";
import LogOutButton from "../components/LogOutButton";
import { COLORS } from "../utils/StyleGuide";
import { PAST_TASKS } from "../data";
import PastTaks from "../components/PastTaks";
import axios from "axios";
import ForecasrItem from "../components/ForecasrItem";

export default function NewTask() {
  const navigation = useNavigation();
  const [subject, setSubject] = useState("");
  const [place, setPlace] = useState("");
  const [hour, setHour] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [forecastFlag, setForecastFlag] = useState(false);

  const addRecordTodb = async (obj) => {
    try {
      const coll = collection(db, "tasks");
      let docRef;
      // MAKE SUBJECT FIELD UNIQUE
      const q = query(coll, where("subject", "==", obj?.subject));

      const snapshot = await getCountFromServer(q);

      if (
        snapshot.data().count === 0 &&
        subject !== "" &&
        place !== "" &&
        hour !== "" &&
        date !== ""
      ) {
        setError(false);
        docRef = await addDoc(collection(db, "tasks"), obj);
        console.log("Document written with ID: ", docRef?.id);
      } else {
        setError(true);

        console.log("not added");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getWether = async () => {
    const baseUrl =
      "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
    const apiKey = "7UDxsN63GyG3bdWXtaE9nUytYtlvAg0T";
    const cityCode = "215854";
    const language = "he";
    const query = `?apikey=${apiKey}&language=${language}`;

    const res = await axios.get(baseUrl + cityCode + query);
    setForecast(res.data.DailyForecasts);
    setForecastFlag(true);
  };
  useEffect(() => {}, [forecastFlag]);

  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={styles.container}>
            <LogOutButton title="אזור אישי" />
            <MyTittle text="יצירת פעולה" styleContainer={styles.title} />
            <View style={styles.labaelAndTextInputCotainer}>
              <Text style={styles.label}>נושא הפעולה</Text>
              <TextInput
                style={styles.text}
                onChangeText={(e) => setSubject(e)}
                value={subject}
              />
            </View>
            <View style={styles.labaelAndTextInputCotainer}>
              <Text style={styles.label}>מיקום</Text>
              <TextInput
                style={styles.text}
                onChangeText={(e) => setPlace(e)}
                value={place}
              />
            </View>
            <View style={styles.labaelAndTextInputCotainer}>
              <Text style={styles.label}>שעה</Text>
              <TextInput
                style={styles.text}
                onChangeText={(e) => setHour(e)}
                value={hour}
              />
            </View>
            <View style={styles.labaelAndTextInputCotainer}>
              <Text style={styles.label}>תאריך</Text>
              <TextInput
                style={styles.text}
                onChangeText={(e) => setDate(e)}
                value={date}
              />
            </View>

            <View style={styles.toggleContainer}>
              <Toggle
                value={toggleValue}
                onPress={(newState) => setToggleValue(newState)}
                leftTitle="בחירה מפעולות עבר"
                rightTitle="הזנת פרטי הפעילות"
                trackBarStyle={{
                  width: 300,
                  height: 40,

                  backgroundColor: toggleValue
                    ? COLORS.gray_blue
                    : COLORS.light_gray,
                }}
                thumbButton={{
                  inActiveBackgroundColor: COLORS.gray_blue,
                  activeBackgroundColor: COLORS.light_gray,
                  activeColor: COLORS.light_gray,
                  inActiveColor: COLORS.black,
                  width: 150,
                  height: 40,
                }}
                animationDuration={500}
              />
            </View>
            {toggleValue ? (
              <TextInput
                style={styles.taskDetails}
                onChangeText={(e) => setDetails(e)}
                value={details}
                placeholder="הקלד כאן.."
              />
            ) : (
              PAST_TASKS?.map((item) => (
                <PastTaks
                  key={item.id}
                  id={item.id}
                  subject={item.subject}
                  onPress={() => {
                    setDate(item.date);
                    setHour(item.hour);
                    setPlace(item.place);
                    setSubject(item.subject);
                    setDetails(item.details);
                  }}
                />
              ))
            )}
            <TouchableOpacity
              style={styles.publishButton}
              onPress={() =>
                addRecordTodb({
                  subject,
                  place,
                  hour,
                  date,
                  details,
                })
              }
            >
              <Text>פרסום</Text>
            </TouchableOpacity>
            {!forecastFlag && (
              <TouchableOpacity
                onPress={getWether}
                style={[
                  styles.publishButton,
                  { backgroundColor: COLORS.light_blue },
                ]}
              >
                <Text>בדוק תחזית</Text>
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
        <View style={styles.foreCastContainer}>
          {forecastFlag &&
            forecast.map((item, index) => (
              <ForecasrItem
                key={index}
                maxTemp={parseInt(item?.Temperature?.Maximum?.Value)}
                minTemp={parseInt(item?.Temperature?.Minimum?.Value)}
                phrase={item?.Day?.IconPhrase}
                icon={item?.Day?.Icon}
              />
            ))}
        </View>
        <Footer />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 35,
  },
  text: {
    borderWidth: 1,
    width: 294,
    fontSize: 18,
    borderRadius: 15,
    height: 43,
    padding: 10,
    backgroundColor: COLORS.very_light_gray,
    textAlign: "right",
  },
  errorMsg: {
    color: COLORS.red,
    fontSize: 15,
  },
  labaelAndTextInputCotainer: {},
  label: {
    marginTop: 1,
    marginBottom: 3,
    fontSize: 17,
    marginHorizontal: 20,
  },
  toggleContainer: {
    marginTop: 10,
    marginBottom: 6,
  },
  taskDetails: {
    width: 339,
    fontSize: 15,
    borderRadius: 15,
    height: 140,
    textAlign: "right",
    paddingRight: 10,
    backgroundColor: COLORS.pink,
  },
  publishButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 160,
    height: 40,
    backgroundColor: COLORS.yellow,
    marginVertical: 5,
    padding: 2,
  },
  title: {
    paddingTop: 56,
  },
  foreCastContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 15,
  },
});