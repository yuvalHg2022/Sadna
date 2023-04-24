import { View, StyleSheet } from "react-native";
import React from "react";
import MyButton from "../components/MyButton";
import Footer from "../components/Footer";
import EventList from "../components/EventList";
import { COLORS } from "../utils/StyleGuide";
import ActionButton from "../components/ActionButton";
import eventListData from '../assets/mocks/eventList.json'

export default function ContactUs({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <ActionButton title="אזור אישי" navigation={navigation} />
        <View style={{ flex: 0.2 }} />
        <View style={styles.menu}>
          <MyButton title="שליחת הודעה למדריך" onPress={() => navigation.navigate('InstructorMessageScreen')} />
          <MyButton title="צ׳אט בוט 24/7" onPress={() => navigation.navigate('ChatbotScreen')} />
        </View>
        <EventList title={"אנחנו כאן בשבילכם"} list={eventListData}/>
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

