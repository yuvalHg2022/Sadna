import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import MyTittle from "./MyTittle";
import { COLORS } from "../utils/StyleGuide";
import { TouchableOpacity } from "react-native";
import firebase from '../firebase';
import 'firebase/auth';

const SCREEN_WIDTH = Dimensions.get("screen").width;

const Studentlist = () => {
  const navigation = useNavigation();
  const [studentList, setStudentList] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const db = firebase.firestore();
      const snapshot = await db
        .collection("Users")
        .where("role", "==", "חניך/ה")
        .get();
      const students = snapshot.docs.map((doc) => doc.data());
      setStudentList(students);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <TouchableOpacity
        style={styles.eventItem}
        onPress={() => {
          navigation.navigate("StudentDetails", { student: item });
        }}
      >
        <View style={styles.arrowContainer}>
          <FontAwesome name="arrow-left" size={20} color={COLORS.light_blue} />
        </View>
        <View style={styles.dateCube}>
          <Text style={styles.eventItemText}>{index + 1}</Text>
        </View>
        <View style={styles.eventDetails}>
          <Text style={styles.eventItemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    ),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <FontAwesome name="user" size={24} color={COLORS.black} />
        <MyTittle text="רשימת חניכים" />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={studentList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Studentlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "flex-end",
    right: 28,
  },
  title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    writingDirection: "rtl",
  },
  listContainer: {
    backgroundColor: COLORS.dark_gray,
    borderWidth: 1,
    borderRadius: 25,
    width: SCREEN_WIDTH - 50,
    height: 600,
    justifyContent: "center",
    marginTop: 16,
    paddingHorizontal: 10,
  },
  eventItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 8,
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.light_gray,
    height: 75,
    position: "relative",
  },
  arrowContainer: {
    position: "absolute",
    left: 320,
    top: 25,
  },
  eventItemText: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "700",
    marginHorizontal: 5,
  },
  dateCube: {
    borderRightWidth: 3,
    borderRightColor: COLORS.light_blue,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  eventDetails: {
    alignItems: "flex-end",
    flex: 1,
    paddingRight: 10,
  },
});
