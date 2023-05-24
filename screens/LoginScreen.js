import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import FancySwitchSelector from '../components/SwitchSelector';
import CustomBackButton from '../components/CustomBackButton';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../config.js';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [toggleValue, setToggleValue] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const auth = getAuth();

  async function signIn(email, password) {
    // Validate input fields
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      // Signed in
      const user = userCredential.user;
      const usersRef = collection(db, 'Users');
      const usersQuery = query(usersRef, where('email', '==', email.value));
      const querySnapshot = await getDocs(usersQuery);
      if (querySnapshot.size === 0) {
        alert('This email address is not registered');
        return;
      }
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      if (password.value === userData.password) {
        // Check if the user's role matches the selected role
        if (toggleValue === true && userData.role !== 'מדריך/ה') {
          alert('Invalid role for this login');
          return;
        } else if (toggleValue === false && userData.role !== 'חניך/ה') {
          alert('Invalid role for this login');
          return;
        }

        let homePage = toggleValue ? 'Home' : 'HomePupil';

        navigation.reset({
          index: 0,
          routes: [{ name: homePage }],
        });
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.log('Error while signing in:', error);
      if (error.code === 'auth/user-not-found') {
        console.log(errorMessage);
        alert('This email address is not registered');
        setErrorMessage('User not found');
      } else if (error.code === 'auth/wrong-password') {
        alert('Invalid password');
        setErrorMessage('Wrong password');
      } else {
        setErrorMessage('An error occurred while signing in');
      }
    }
  }

  function onLoginPressed() {
    signIn(email, password);
  }


  return (
    <Background>
      <CustomBackButton goBack={navigation.goBack} />
      <Logo />
      <Header>התחברות</Header>
      <FancySwitchSelector value={toggleValue} onChange={setToggleValue} />
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
        labelStyle={{ textAlign: 'right' }}
      />
      <TextInput
        label="סיסמה"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        labelStyle={{ textAlign: 'right' }}
      />
       <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>שכחת את הסיסמה?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        כניסה
      </Button>
      <View style={styles.row}>
        <Text style={{ marginRight: 3 }}>עדיין אין לך חשבון?</Text>
        <TouchableOpacity
          onPress={() => navigation.replace('RegisterScreen')}
          style={{ alignSelf: 'center', marginTop: 2 }}
        >
          <Text style={styles.link}>הירשם</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems:
    'flex-end',
    marginBottom: 24,
    },
    row: {
    flexDirection: 'row',
    },
    forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
    },
    link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    },
});