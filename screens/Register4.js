import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MyButton from "../components/MyButton";
import db from "../config";
import Footer from "../components/Footer";
import MyTittle from "../components/MyTittle";
import Toggle from "react-native-toggle-element";
import ActionButton from "../components/ActionButton";
import { COLORS } from "../utils/StyleGuide";
import { PAST_TASKS } from "../data";
import PastTaks from "../components/PastTaks";

export default function Register4() {
  const navigation = useNavigation();
  const [subject, setSubject] = useState("");
  const [place, setPlace] = useState("");
  const [hour, setHour] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);

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

  useEffect(() => {}, [toggleValue]);

  return (
    <>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ActionButton title="אזור אישי" />
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
          {error && (
            <View>
              <Text style={styles.errorMsg}>Fill The Form Again</Text>
            </View>
          )}
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
                }}
              />
            ))
          )}
          <Pressable
            style={[
              styles.publishButton,
              {
                height: !toggleValue ? 40 : 40,
                width: !toggleValue ? 100 : 100,
              },
            ]}
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
          </Pressable>
        </View>
        <Footer />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  text: {
    borderWidth: 1,
    width: 300,
    fontSize: 13,
    borderRadius: 15,
    height: 35,
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
    marginTop: 2,
    marginBottom: 5,
    fontSize: 17,
    marginHorizontal: 20,
  },
  toggleContainer: {
    marginTop: 10,
    marginBottom: 6,
  },
  taskDetails: {
    width: 338,
    fontSize: 15,
    borderRadius: 15,
    height: 100,
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
    marginVertical: 6,
  },
  title: {
    paddingTop: 56,
  },
});
