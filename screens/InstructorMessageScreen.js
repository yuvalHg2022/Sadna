import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import firebase from "../firebase";
import "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import Footer from "../components/Footer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from "../utils/StyleGuide";

export default function InstructorMessageScreen({ route }) {
  const navigation = useNavigation();
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [subject, setSubject] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = firebase.auth().currentUser;
        console.log(user.email);

        if (user) {
          try {
            const studentSnapshot = await firebase.firestore()
              .collection("Users")
              .where("email", "==", user.email)
              .get();

            if (!studentSnapshot.empty) {
              const studentData = studentSnapshot.docs[0].data();
              setCurrentUser(studentData);
              console.log(studentData.name);

              const instructorsSnapshot = await firebase.firestore()
                .collection("Users")
                .where("role", "==", "מדריך/ה")
                .where("group", "==", studentData.group)
                .get();

              const instructorsData = instructorsSnapshot.docs.map((doc) => doc.data());
              console.log(instructorsData);

              setInstructors(instructorsData);
            }
          } catch (error) {
            console.error("שגיאה בשליפת נתוני מדריכים:", error);
          }
        }
      } catch (error) {
        console.error("שגיאה בשליפת נתונים:", error);
      }
    };

    fetchData();
  }, []);

  const handleSendMessage = () => {
    // Create a new message document in Firestore
    firebase.firestore().collection("Messages")
      .add({
        senderEmail: currentUser.email,
        senderName: currentUser.name,
        recipientEmail: selectedInstructor,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        subject: subject, // Add the subject value
        content: messageText,
      })
      .then(() => {
        // Reset the input fields after the message is sent
        setMessageText("");
        setSubject("");
        // Show success message and navigate back
        Alert.alert(
          'אישור',
          'ההודעה נשלחה בהצלחה!',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      })
      .catch((error) => {
        console.error("שגיאה בשליחת הודעה: ", error);
      });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
        </View>
        <Text style={styles.title}>שליחת הודעה למדריך</Text>
        <Text style={styles.label}>אל:</Text>
        <Picker
          selectedValue={selectedInstructor}
          onValueChange={(value) => setSelectedInstructor(value)}
        >
          <Picker.Item label="בחר את המדריך" value={null} />
          {instructors.map((instructor, index) => (
            <Picker.Item key={index} label={instructor.name} value={instructor.email} />
          ))}
        </Picker>
        <Text style={styles.label}>נושא ההודעה:</Text>
        <TextInput
          style={styles.subjectInput}
          value={subject}
          onChangeText={setSubject}
        />
        <Text style={styles.label}>תוכן ההודעה:</Text>
        <TextInput
          style={styles.input}
          multiline
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={!selectedInstructor || !messageText}
        >
          <Text style={styles.sendButtonText}>שליחה</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.white,
    padding: 16,
  },
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginTop: 15,
    paddingTop:30
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    marginTop: 12,
    marginRight:10
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 8,
    textAlign: "left",
    flexDirection: 'row-reverse',

  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    height: 120,
    textAlignVertical: "top",
    textAlign: "right",
  },
  subjectInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    height: 40, // Set the height to a smaller value, such as 40
    textAlignVertical: "top",
    textAlign: "right",
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
});
