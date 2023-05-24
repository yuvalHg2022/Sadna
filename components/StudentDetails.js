import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import MyTittle from "./MyTittle";
import { COLORS } from "../utils/StyleGuide";
import { FontAwesome } from "@expo/vector-icons";
import Footer from "../components/Footer";
import ActionButton from "./ButtonToPerosnalScreen";


const StudentDetails = ({ route, navigation }) => {
  const { student } = route.params;

  const handleTransferClick = () => {
    alert("התיק הועבר בהצלחה");
  };

  return (
    <>
      <View style={styles.container}>
      <ActionButton title="אזור אישי" navigation={navigation} />
        <View style={styles.title}>
          <FontAwesome name="user" size={30} color={COLORS.black} />
          <Text style={styles.titleText}>תיק חניך</Text>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.eventItem}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventItemText}>שם החניך: {student.Name}</Text>
            </View>
          </View>
          <View style={styles.eventItem}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventItemText}>כתובת: {student.Address}</Text>
            </View>
          </View>
          <View style={styles.eventItem}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventItemText}>כיתה: {student.Grade}</Text>
            </View>
          </View>
          <View style={styles.eventItem}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventItemText}>מספר טלפון: {student.Phone}</Text>
            </View>
          </View>
          <View style={styles.eventItem}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventItemText}>לשון פנייה: {student.Gender}</Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>חוות דעת מדריך</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>עדכון פרטים אישיים</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleTransferClick}
          >
            <Text style={styles.buttonText}>העברת תיק לגורם סוציאלי</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </>
  );
};

export default StudentDetails;

const styles = StyleSheet.create({
  ActionButton: {
    padding: 20,
  },
  container: {
    flex: 1,
    paddingTop: 140,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  titleText: {
    color: COLORS.black,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    paddingLeft: 10,
  },
  title: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    writingDirection: "rtl",
    paddingBottom: 10,
    paddingLeft: 15,
  },
  listContainer: {
    backgroundColor: COLORS.dark_gray,
    padding: 10,
    borderWidth: 1,
    borderRadius: 25,
    height: "60%",
    width: "80%",
    justifyContent: "center",
  },
  eventItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 8,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.light_gray,
    height: 75,
  },
  eventItemText: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "700",
    marginHorizontal: 5,
  },
  eventDetails: {
    alignItems: "flex-end",
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25,
    height: "25%",
    width: "80%",
  },
  button: {
    backgroundColor: COLORS.light_gray,
    padding: 10,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "700",
  },
});