import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import firebase from '../firebase';
import 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';

const InstructorMessagesReceived = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Retrieve the current user's email
        const currentUser = firebase.auth().currentUser;
        const userEmail = currentUser.email;

        // Retrieve messages for the current user's email
        const db = firebase.firestore();
        const messagesRef = db.collection('Messages');

        const querySnapshot = await messagesRef
          .where('recipientEmail', '==', userEmail)
          .orderBy('createdAt')
          .get();

        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          const messageData = doc.data();
          fetchedMessages.push({
            id: doc.id,
            subject: messageData.subject,
            senderName: messageData.senderName,
            createdAt: messageData.createdAt.toDate(),
            content: messageData.content,
            senderEmail: messageData.senderEmail,
          });
        });

        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Error retrieving messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handlePressMessage = (message) => {
    setSelectedMessage(message === selectedMessage ? null : message);
  };

  const handleSendReply = async () => {
    
    try {
      Alert.alert('תגובתך נשלחה בהצלחה!')
      // Check if a message is selected
      if (!selectedMessage) {
        return;
      }

      // Create a new message object for the reply
      const replyMessage = {
        subject: `Reply to: ${selectedMessage.subject}`,
        createdAt: new Date(),
        content: response,
        recipientEmail: selectedMessage.senderEmail,
        senderEmail: firebase.auth().currentUser.email,
        senderName: 'המדריך', // Replace 'User Name' with the actual user's name
      };

      // Save the reply message to the database
      const db = firebase.firestore();
      const messagesRef = db.collection('Messages');
      await messagesRef.add(replyMessage);

      // Display a notification indicating that the message was sent successfully
      console.log('Message sent successfully!');

      // Clear the response and selected message
      setResponse('');
      setSelectedMessage(null);
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const handleReply = (message) => {
    setSelectedMessage(message);
    setResponse('');
  };

  const handleDelete = async (message) => {
    try {
      // Delete the message from the database
      const db = firebase.firestore();
      const messagesRef = db.collection('Messages');
      await messagesRef.doc(message.id).delete();

      // Remove the message from the list
      const updatedMessages = messages.filter((msg) => msg.id !== message.id);
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleCreateNewMessage = () => {
    // Navigate to the create new message page
    navigation.navigate('InstructorMessagesToStudents');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>הודעות מחניכים</Text>
      {messages.length === 0 ? (
        <Text style={styles.noMessagesText}>אין הודעות מחניכים</Text>
      ) : (
        <View>
          {messages.map((message) => (
            <TouchableOpacity
              key={message.id}
              style={[
                styles.messageContainer,
                selectedMessage === message && styles.selectedMessageContainer,
              ]}
              onPress={() => handlePressMessage(message)}
            >
              <View style={styles.messageHeader}>
                <Text style={styles.titleText}>מאת:</Text>
                <Text style={styles.contentText}>{message.senderName}</Text>
              </View>
              <View style={styles.messageHeader}>
                <Text style={styles.titleText}>נושא:</Text>
                <Text style={styles.contentText}>{message.subject}</Text>
              </View>
              <View style={styles.messageHeader}>
                <Text style={styles.titleText}>מועד השליחה:</Text>
                <Text style={styles.contentText}>
                  {message.createdAt.toString()}
                </Text>
              </View>
              {selectedMessage === message && (
                <View>
                  <View style={styles.messageHeader}>
                    <Text style={styles.titleText}>תוכן ההודעה:</Text>
                  </View>
                  <Text style={styles.contentText}>{message.content}</Text>
                  <TextInput
                    style={styles.responseInput}
                    placeholder="Enter your response"
                    value={response}
                    onChangeText={setResponse}
                    multiline
                  />
                  <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSendReply}
                  >
                    <Text style={styles.buttonText}>השב</Text>
                  </TouchableOpacity>
                  <View style={styles.optionsContainer}>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDelete(message)}
                    >
                      <MaterialIcons name="delete" size={18} color="#FFFFFF" />
                      <Text style={styles.buttonText}>מחק</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TouchableOpacity
        style={styles.createNewButton}
        onPress={handleCreateNewMessage}
      >
        <Text style={styles.buttonText}>יצירת הודעה חדשה</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    direction: 'rtl',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 60,
    writingDirection: 'rtl',
  },
  noMessagesText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    direction: 'rtl',
  },
  selectedMessageContainer: {
    backgroundColor: '#F0F0F0',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    justifyContent: 'flex-start',
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#888888',
    marginLeft: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  contentText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'left',
    writingDirection: 'rtl',
  },
  responseInput: {
    height: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    textAlignVertical: 'top',
    direction: 'rtl',
    textAlign: 'right', // Add this line to set the text alignment to right-to-left
  },
  sendButton: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    borderRadius: 4,
    padding: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 4,
    textAlign: 'center',
  },
  createNewButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    padding: 16,
    marginTop: 16,
  },
});



export default InstructorMessagesReceived