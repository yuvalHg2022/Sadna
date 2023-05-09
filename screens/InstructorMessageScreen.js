import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import email from 'react-native-email';

const InstructorMessageScreen = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSendEmail = () => {
    const to = 'guide@example.com';
    email(to, {
      subject: subject,
      body: body
    }).catch(console.error);
    setSubject('');
    setBody('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>שלח הודעה למדריך</Text>
      <TextInput
        style={styles.input}
        placeholder="נושא"
        value={subject}
        onChangeText={text => setSubject(text)}
      />
      <TextInput
        style={styles.body}
        placeholder="תוכן"
        value={body}
        onChangeText={text => setBody(text)}
        multiline={true}
        numberOfLines={5}
      />
      <TouchableOpacity onPress={handleSendEmail} style={styles.button}>
        <Text style={styles.buttonText}>שלח הודעה</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  body: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    height: 100,
    marginBottom: 20,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 20,
    textAlign: 'right',

  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default InstructorMessageScreen;
