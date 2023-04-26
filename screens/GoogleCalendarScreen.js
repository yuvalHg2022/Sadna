import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { authorize } from 'react-native-app-auth';

const GoogleCalendarScreen = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleScheduleInterview = async () => {
    try {
      const result = await authorize({
        clientId: '<YOUR_CLIENT_ID>',
        clientSecret: '<YOUR_CLIENT_SECRET>',
        redirectUrl: '<YOUR_REDIRECT_URI>',
        scopes: ['https://www.googleapis.com/auth/calendar'],
      });

      // Once authorized, you can make API requests to the Google Calendar API using the result.access_token

      // Construct the start and end time objects
      const startDateTime = moment(`${date} ${startTime}`).toISOString();
      const endDateTime = moment(`${date} ${endTime}`).toISOString();

      // Construct the event object
      const event = {
        summary: title,
        start: {
          dateTime: startDateTime,
        },
        end: {
          dateTime: endDateTime,
        },
      };

      // Make the API request to create the event in the user's calendar
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${result.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        Alert.alert('Success', 'הראיון נקבע בהצלחה');
      } else {
        Alert.alert('Error', 'נכשל בקביעת ראיון');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'אישור האפליקציה נכשל');
    }
  };

  // Set available time slots for interviews
  const availableTimes = [
    '18:00-18:30',
    '18:30-19:00',
    '19:00-19:30',
  ];

  const markedDates = {};

  for (let i = 1; i <= 3; i++) {
    const date = moment().add(i, 'days').format('YYYY-MM-DD');
    const timeSlots = {};

    availableTimes.forEach((time) => {
      const startTime = moment(`${date} ${time.split('-')[0]}`);
      const endTime = moment(`${date} ${time.split('-')[1]}`);
      
      // Only mark time slots that are in the future
      if (endTime.isAfter(moment())) {
        timeSlots[`${startTime.toISOString()}/${endTime.toISOString()}`] = {
          disabled: false,
          textColor: 'black',
          color: 'lightblue',
        };
      }
    });

    markedDates[date] = timeSlots;
  }

  return (
    <View>
      <TextInput
        placeholder="ראיונות אישיים"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={{
          width: '38%',
          textAlign: 'right',
          paddingLeft: 20,
        }}
      />
      <Calendar onDayPress={(day) => setDate(day.dateString)} markedDates={markedDates} />
      <View>
  <Text style={{textAlign: 'left'}}>שעת התחלה</Text>
  <TextInput
    placeholder="hh:mm"
    value={startTime}
    onChangeText={(text) => setStartTime(text)}
    style={{
      textAlign: 'right',
      width: '100%',
    }}
  />
</View>
<View>
  <Text style={{textAlign: 'left'}}>שעת סיום</Text>
  <TextInput
    placeholder="hh:mm"
    value={endTime}
    onChangeText={(text) => setEndTime(text)}
    style={{
      textAlign: 'right',
      width: '100%', 
    }}
  />
</View>
      <Button title="קבע ראיון" onPress={handleScheduleInterview} />
    </View>
  );
};

export default GoogleCalendarScreen;
