import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name);
    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const validationResult = { success: true };

    console.log(validationResult);
    if (validationResult.success) {
      // Check if email already exists
      const usersRef = collection(db, 'Try');
      try {
        const usersQuery = query(usersRef, where('email', '==', email));
        const querySnapshot = await getDocs(usersQuery);
        if (querySnapshot.size > 0) {
          alert('This email address is already registered');
          return { success: false };
        }
        // Hash the password and add the user to the collection
        const docRef = await addDoc(usersRef, { name, email, password });
        console.log(`Document written with ID: ${docRef.id}`);
        alert('User added successfully');
        navigation.navigate('LoginScreen');
        return { success: true, message: 'User added successfully' };
      } catch (error) {
        console.log('Error while getting documents:', error);
        return { success: false, message: 'An error occurred while checking for existing email' };
      }
    } else {
      alert(validationResult.message);
      return validationResult;
    }
  }


  return (
    <Background>
      <CustomBackButton goBack={navigation.goBack} />
      <Logo />
      <Header>הרשמה</Header>
      <TextInput
        label="שם מלא"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="כתובת אימייל"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text})}
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
        onChangeText={(text) => setPassword({ value: text })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
      
      mode="contained" 
      onPress={() => {
        onSignUpPressed ();
        console.log('User details:', {
          name: name.value,
          email: email.value,
          password: password.value,
        });
      }}
        style={{ marginTop: 24 }}
      >
        המשך
      </Button>
      <View style={styles.row}>
        <Text style={{ marginRight: 3 }}>כבר יש לך חשבון? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('LoginScreen');
          }}
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
})
  
 