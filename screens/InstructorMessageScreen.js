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
      <Text style={styles.heading}>Send Message to Instructor</Text>
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={text => setSubject(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Body"
        value={body}
        onChangeText={text => setBody(text)}
        multiline={true}
        numberOfLines={5}
      />
      <TouchableOpacity onPress={handleSendEmail} style={styles.button}>
        <Text style={styles.buttonText}>Send Message</Text>
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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default InstructorMessageScreen;
