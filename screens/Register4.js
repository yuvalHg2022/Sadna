import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MyButton from "../compoonents/MyButton";
import db from "../config";
import Footer from "../compoonents/Footer";
import Swal from "sweetalert2";

export default function Register4() {
  const navigation = useNavigation();
  const [subject, setSubject] = useState("");
  const [place, setPlace] = useState("");
  const [hour, setHour] = useState("");
  const [date, setDate] = useState("");

  const addRecordTodb = async (obj) => {
    try {
      const coll = collection(db, "tasks");
      let docRef;
      const q = query(coll, where("subject", "==", obj?.subject));
      const q1 = query(coll, where("place", "==", obj?.place));
      const q2 = query(coll, where("hour", "==", obj?.hour));
      const q3 = query(coll, where("date", "==", obj?.date));
      const snapshot = await getCountFromServer(q);
      const snapshot1 = await getCountFromServer(q1);
      const snapshot2 = await getCountFromServer(q2);
      const snapshot3 = await getCountFromServer(q3);
      if (
        snapshot.data().count === 0 &&
        snapshot1.data().count === 0 &&
        snapshot2.data().count === 0 &&
        snapshot3.data().count === 0
      ) {
        docRef = await addDoc(collection(db, "tasks"), obj);
        console.log("Document written with ID: ", docRef?.id);
      } else {
        console.log("not added");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="subject"
        style={styles.text}
        onChangeText={(e) => setSubject(e)}
        value={subject}
      />
      <TextInput
        placeholder="place"
        style={styles.text}
        onChangeText={(e) => setPlace(e)}
        value={place}
      />
      <TextInput
        placeholder="hour"
        style={styles.text}
        onChangeText={(e) => setHour(e)}
        value={hour}
      />
      <TextInput
        placeholder="date"
        style={styles.text}
        onChangeText={(e) => setDate(e)}
        value={date}
      />
      <MyButton
        color="red"
        title="שלח"
        onPress={() =>
          addRecordTodb({
            subject,
            place,
            hour,
            date,
          })
        }
      />
      <MyButton
        title="הביתה"
        color="#CCCCFF"
        onPress={() => navigation.navigate("Home3")}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  text: {
    borderWidth: 1,
    width: 300,
    fontSize: 24,
    borderRadius: 20,
    height: 50,
    marginVertical: 8,
    padding: 10,
  },
});
