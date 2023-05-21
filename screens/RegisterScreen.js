import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, RadioButton } from 'react-native-paper';
import Background from '../components/Background';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import CustomBackButton from '../components/CustomBackButton';
import db from '../config';
import {
  addDoc,
  collection,
  where,
  query,
  getDocs,
} from 'firebase/firestore';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';


export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [role, setRole] = useState('');
  const [disableButton, setDisableButton] = useState(true);

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
  
    if (emailError || passwordError || nameError || !role) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setDisableButton(true);
      return;
    }
  
    const usersRef = collection(db, 'Users');
  
    try {
      const usersQuery = query(usersRef, where('email', '==', email.value));
      const querySnapshot = await getDocs(usersQuery);
  
      if (querySnapshot.size > 0) {
        alert('This email address is already registered');
        return;
      }
    if (role === 'חניך/ה') {
      navigation.navigate('PersonalDetailsScreen', {
        name: name.value,
        email: email.value,
        password: password.value,
        role: role,
        Address: '',
        Phone: '',
        Grade : '',
        Gender : '',
        Region : '',
        Group : '',
      });
    } else if (role === 'מדריך/ה') {
      navigation.navigate('PersonalDetailsScreen2', {
        name: name.value,
        email: email.value,
        password: password.value,
        role: role,
        Address: '',
        Phone: '',
        Region : '',
        Group : '',
      });
    }
        
    } catch (error) {
      console.log('Error while getting documents:', error);
      alert('An error occurred while checking for existing email');
    }
  };

  return (
    <Background>
      <CustomBackButton goBack={navigation.goBack} />
      <Header>הרשמה</Header>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text style={[styles.label,]}>תפקיד:</Text>
  <View style={[styles.radioGroup, { flex: 2 }]}>
    <TouchableOpacity
      onPress={() => setRole('חניך/ה')}
      style={[styles.radioButton, { marginRight: 4 }]}
    >
      {role === 'חניך/ה' && <View style={styles.radioButtonSelected} />}
    </TouchableOpacity>
    <Text style={[styles.label, styles.radioButtonText, { flex: 2 }]}>חניך/ה</Text>
    <TouchableOpacity
      onPress={() => setRole('מדריך/ה')}
      style={[styles.radioButton, { marginRight: 4 }]}
    >
      {role === 'מדריך/ה' && <View style={styles.radioButtonSelected} />}
    </TouchableOpacity>
    <Text style={[styles.label, styles.radioButtonText, { flex: 4 }]}>מדריך/ה</Text>
  </View>
</View>
      <TextInput
        label="שם מלא"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="כתובת אימייל"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="סיסמה"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
   <Button
      mode="contained" 
      onPress={() => {
        onSignUpPressed ();;
      }}
        style={{ marginTop: 24 }}
      >
       המשך
</Button>
      <View style={styles.row}>
        <Text style={{ marginRight: 3 }}>כבר יש לך חשבון? </Text>
        <TouchableOpacity
          onPress={() => navigation.replace('LoginScreen')}
          style={{ alignSelf: 'center', marginTop: 2 }}
        >
          <Text style={styles.link}>התחבר</Text>
        </TouchableOpacity>
      </View>
      <Footer style={styles.footer} />
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 5,
    marginRight: 15,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
    borderColor: theme.colors.primary,
    alignSelf: 'center',
  },
  radioButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
  },
});
 