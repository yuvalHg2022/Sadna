import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Picker } from "@react-native-picker/picker";
import firebase from "../firebase";
import "firebase/auth";
import db from "../config";
import { Button, Alert } from 'react-native';
import { cos } from "react-native-reanimated";

export default function InstructorMessageScreen({ route }) {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = firebase.auth().currentUser;
        setCurrentUser(user);
        cosnole.log(user);
  
        if (user) {
          const studentRef = db.collection("Users").where("email", "==", user.email);
          const studentSnapshot = await studentRef.get();
  
          if (!studentSnapshot.empty) {
            const studentData = studentSnapshot.docs[0].data();
            const instructorsRef = db.collection("Users").where("role", "==", "מדריך/ה").where("group", "==", studentData.group);
            const instructorsSnapshot = await instructorsRef.get();
            const instructorsData = instructorsSnapshot.docs.map((doc) => ({
              name: doc.data().name,
              email: doc.data().email,
            }));
            setInstructors(instructorsData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const showUserInfo = () => {
    if (currentUser) {
      Alert.alert(
        'User Information',
        `Email: ${currentUser.email}\nUID: ${currentUser.uid}`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('User Information', 'No user logged in.', [{ text: 'OK' }]);
    }
  };

  const handleSendMessage = () => {
    // get the current user's information from Firestore
    db.collection("Users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        const currentUserData = doc.data();

        // create a new message document in Firestore
        db.collection("Messages")
          .add({
            senderId: currentUser.uid,
            senderName: currentUserData.name,
            recipientId: selectedInstructor,
            messageText,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            // reset the message text input after the message is sent
            setMessageText("");
          })
          .catch((error) => {
            console.error("Error sending message: ", error);
          });
      })
      .catch((error) => {
        console.error("Error getting current user information: ", error);
      });
  };
 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Message to Instructor</Text>
      <Text style={styles.label}>To:</Text>
      <Picker
        selectedValue={selectedInstructor}
        onValueChange={(value) => setSelectedInstructor(value)}
      >
        <Picker.Item label="Select an Instructor" value={null} />
        {instructors.map((instructor) => (
          <Picker.Item key={instructor.id} label={instructor.name} value={instructor.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Message:</Text>
      <TextInput
        style={[styles.input, styles.messageInput]}
        multiline
        value={messageText}
        onChangeText={setMessageText}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSendMessage}
        disabled={!selectedInstructor || !messageText}
      >
        <Text style={styles.sendButtonText} onPress={ console.log(currentUser)}>Send</Text>
      </TouchableOpacity>
      <Button title="Show User Info" onPress={ console.log(currentUser)} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    paddingTop: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  messageInput: {
    height: 120,
  },
  sendButton: {
    backgroundColor: "blue",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
});
