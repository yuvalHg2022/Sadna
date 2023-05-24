import React  from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { auth } from "../config.js"; 
import  db from '../config';
import { collection, query, where, getDocs } from "firebase/firestore";



const ActionButton = ({ title, navigation }) => {
  const { currentUser } = auth; // Get the current user from the Firebase authentication context
  const userEmail = currentUser.email;
  console.log(userEmail);

  const handleButtonPress = async () => {
    if (currentUser) {
      const userEmail = currentUser.email;
      try {
        const usersRef = collection(db, "Users"); // Assuming "Users" is the name of your collection
        const querySnapshot = await getDocs(query(usersRef, where("email", "==", userEmail)));
  
        if (querySnapshot.empty) {
          console.log("User not found");
          return;
        }
  
        // Assuming the 'role' field exists in the user document
        const userDoc = querySnapshot.docs[0];
        const userRole = userDoc.data().role;
        console.log(userRole);
  
        if (userRole === "מדריך/ה") {
          // Navigate to the instructor homepage
          console.log("instructor");
          navigation.navigate("Home");
        } else if (userRole === "חניך/ה") {
          // Navigate to the pupil homepage
          console.log("pupil");
          navigation.navigate("Home");
        }
      } catch (error) {
        console.error("Error querying user role:", error);
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
