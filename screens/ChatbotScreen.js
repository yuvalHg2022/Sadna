import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef();
  const navigation = useNavigation();

  const handleSendMessage = async () => {
    if (message) {
      setMessages([...messages, { text: message, isBot: false }]);
      try {
        const response = await fetch('https://arad01.pythonanywhere.com/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: message
          })
        });
        const data = await response.json();
        setMessages([...messages, { text: message, isBot: false }, { text: data, isBot: true }]);
      } catch (error) {
        console.log(error);
      }
      setMessage('');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={handleGoBack} />
        <Text style={styles.title}>חזרה</Text>
      </View>
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.isBot ? styles.botMessage : styles.userMessage]}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  messagesContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  message: {
    maxWidth: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C5',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatbotScreen;
