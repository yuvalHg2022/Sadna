import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, RadioButton, TextInput } from 'react-native-paper';
import Background from '../components/Background';
import CustomBackButton from '../components/CustomBackButton';
import Header from '../components/Header';
import Footer from '../components/Footer'
import Button from '../components/Button';
import { theme } from '../core/theme';
import ActionButton from "../components/ActionButton";


export default function PersonalDetailsScreen({ navigation }) {
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [contactLanguage, setContactLanguage] = useState('');
  const [groupDistrict, setGroupDistrict] = useState('');


  const validateForm = () => {
    if (!city) {
      alert('אנא הזן את העיר מגורים שלך');
      return false;
    }
    if (!classGrade) {
      alert('אנא הזן את הכיתה שלך');
      return false;
    }
    if (!phone.match(/^[0-9]{10}$/)) {
      alert('אנא הזן מספר טלפון חוקי (10 ספרות)');
      return false;
    }
    if (!contactLanguage) {
      alert('אנא הזן את לשון הפניה המעודף עליך');
      return false;
    }
    if (!groupDistrict) {
      alert('אנא בחר מחוז קבוצתי');
      return false;
    }
    return true;
  };


const onContinuePressed = () => {
  if (validateForm()) {
    navigation.navigate('GroupSelectionScreen');
  }
};
  return (
    <Background>
    <CustomBackButton goBack={navigation.goBack} />
            <View style={styles.form}>
        <Header style={styles.header}>פרטים אישיים</Header>
        <Text style={[styles.label, styles.highlight]}>עיר מגורים:</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          value={city}
          onChangeText={setCity}
        />
        <Text style={[styles.label, styles.highlight]}>כיתה:</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          value={classGrade}
          onChangeText={setClassGrade}
        />
        <Text style={[styles.label, styles.highlight]}>טלפון:</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={[styles.label, styles.highlight]}>לשון פניה:</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          value={contactLanguage}
          onChangeText={setContactLanguage}
        />
        <Text style={[styles.label, styles.highlight]}>בחירת מחוז הקבוצה:</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          value={groupDistrict}
          onChangeText={setGroupDistrict}
        />
<Button
  mode="contained"
  onPress={onContinuePressed}
  style={{ marginTop: 24 }}
>
  המשך
</Button>
      </View>
      <Footer style={styles.footer} />
    </Background>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '90%',
    maxWidth: 340,
    alignSelf: 'center',
    marginTop: 14,
  },
  header: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  label: {
    color: theme.colors.secondary,
    marginVertical: 2,
  },
  input: {
    backgroundColor: theme.colors.surface,
    marginBottom: 8,
  },
  radioGroup: {
    marginBottom: 8,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginTop: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  highlight: {
    fontWeight: 'bold',
  },
});
