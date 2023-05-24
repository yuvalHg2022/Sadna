import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../config.js";
import db from '../config.js';
import { collection, query, where, getDocs } from "firebase/firestore";

const LogOut = ({ title, navigation }) => {
  const handleButtonPress = async () => {
    try {
      // Perform the logout operation
      await auth.signOut();
      navigation.replace("LoginScreen"); // Navigate to the LoginScreen
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleButtonPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    position: "absolute",
    top: 60,
    left: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    width: 112,
    height: 42,
  },
  text: {
    color: "white",
    fontSize: 14,
    padding: 10,
    fontWeight: "bold",
  },
});

export default LogOut;
