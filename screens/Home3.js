import { View, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import MyButton from "../components/MyButton";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Footer from "../components/Footer";
import { COLORS } from "../utils/StyleGuide";
import LogOutButton from "../components/LogOutButton";

const IMAGE_HEIGHT = 288

export default function Home3({ navigation }) {
  return (
    <>

      <ImageBackground source={require("../assets/images/home.png")} style={{ height: IMAGE_HEIGHT, width: '100%', flex: 1, }} resizeMode="cover">
        <View style={{ marginTop: 24 }}>
          <LogOutButton title="איזור אישי" />
        </View>
        <View style={styles.container}>
          <View style={styles.menu}>
            <MyButton
              title="פעילויות"
              color={COLORS.white}
              onPress={() => navigation.navigate("Activitiy4")}
              icon={<FontAwesome name="calendar" size={24} />}
            />
            <MyButton
              title="חניכים"
              color={COLORS.white}
              icon={<Ionicons name="person-outline" size={24} />}
            />
            <MyButton
              title="הודעות"
              color={COLORS.white}
              icon={<AntDesign name="message1" size={24} />}
            />
          </View>
        </View>
      </ImageBackground>
      <Footer />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    top: IMAGE_HEIGHT - 50,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30
  },
  menu: {
    top: 64
  },
});
