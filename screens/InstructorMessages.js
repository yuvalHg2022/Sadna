import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { COLORS } from '../utils/StyleGuide';
import MyTittle from "../components/MyTittle";

import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/Footer';
import ActionButton from '../components/ButtonToPerosnalScreen';

const PupilMessageScreen = () => {
  const navigation = useNavigation();

  const messages = [
    { id: '1', text: 'שלום לך ! אנחנו צריכים את עזרתך במפגש הקרוב. אנא אשר הגעה.' },
    { id: '2', text: 'היי! נדרשת התנדבות לפרייד פארייד הקרוב. אשמח אם תצטרף אלינו.' },
    { id: '3', text: 'עדכון חשוב ! יש לנו תכנית חדשה לסדנאות גאוה. הצטרפו אלינו ותוכלו ליהנות מהפעילויות.' },
    { id: '4', text: 'היי חברים! אנחנו יוצרים קבוצה חדשה של פעילים. הצטרפו אלינו ותוכלו להשפיע וליצור פרויקטים מרתקים.' },
    { id: '5', text: 'הודעה חשובה ! מסיבת פורים עומדת בפתח. אל תחמיצו את האירוע המדהים הזה.' },
  ];
  

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => {
        // Handle onPress event
      }}
    >
      <View style={styles.arrowContainer}>
      </View>
      <View >
        <Text style={styles.eventItemText}></Text>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventItemText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ActionButton title="אזור אישי" navigation={navigation} />
      <View style={styles.title}>
        <FontAwesome name="comments" size={24} color={COLORS.black} />
        <MyTittle text="רשימת הודעות" />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.buttom}>
        <ActionButton
          text="אזור אישי"
          onPress={() => {
            // Handle onPress event
          }}
        />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'flex-end',
    paddingHorizontal: 28,
    backgroundColor: COLORS.white,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    writingDirection: 'rtl',
    marginTop: 30,
    marginBottom: 10,
    paddingTop: 40,
    flexDirection: 'row-reverse', 
  },
  listContainer: {
    backgroundColor: COLORS.dark_gray,
    borderWidth: 1,
    borderRadius: 25,
    height: 390,
    justifyContent: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    marginTop: 20,
    marginBottom: 220,
  },
  messageItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.light_gray,
    height: 75,
    position: 'relative',
    flexDirection: 'row', 

  },
  arrowContainer: {
    position: 'absolute',
    left: 320,
    top: 25,
  },
  eventItemText: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '700',
    marginHorizontal: 5,
    direction: 'rtl',
  },
  dateCube: {
    borderRightWidth: 3,
    borderRightColor: COLORS.light_blue,
    alignItems: 'center',
  },
  eventDetails: {
    alignItems: 'flex-end',
    alignItems: 'flex-start',
  },
});

export default PupilMessageScreen;
