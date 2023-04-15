import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator, nameValidator } from '../helpers/validation';
import CustomBackButton from '../components/CustomBackButton';
import  db  from '../config';
import { addDoc, collection } from 'firebase/firestore';
import { validateRegisterFields } from '../helpers/validation';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
  
    const user = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
  
    const validationError = validateRegisterFields(user);
    if (validationError) {
      window.alert(validationError);
      return;
    }
  
    try {
      const coll = collection(db, "Try");
      const docRef = await addDoc(coll, user);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      // Handle the promise rejection here
      alert("There was an error registering the user.");
      return;
    }
  
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
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
        // onSignUpPressed();
        console.log('User details:', {
          name: name.value,
          email: email.value,
          password: password.value,
        });
        if (name.value === '' || email.value === '' || password.value === '') {
          alert('אנא מלא את כל השדות');
          return;
        }
        else {
        alert('משתמש נוצר בהצלחה');
        }
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
  
 