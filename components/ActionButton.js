import React , { useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../config.js"; // Assuming you have a custom hook for Firebase authentication

const ActionButton = ({ title }) => {
  const { currentUser } = auth; // Get the current user from the Firebase authentication context

  const handleButtonPress = () => {
    console.log('press');
    console.log('current here',auth);
    if (currentUser) {
      const userRole = currentUser.role; // Assuming you have a 'role' property in the user object

      if (userRole === "מדרי/ך") {
        // Navigate to the guided homepage
        // Replace 'Home' with the relevant guided homepage component
        navigation.navigate("Home");
      } else if (userRole === "חני/ך") {
        // Navigate to the pupil homepage
        // Replace 'HomePupil' with the relevant pupil homepage component
        navigation.navigate("HomePupil");
      }
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

export default ActionButton;
