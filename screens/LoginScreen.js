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
import db from '../config';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [toggleValue, setToggleValue] = useState(false);

  async function signIn(email, password) {
    // Validate input fields
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const usersRef = collection(db, 'Try');
    try {
      const usersQuery = query(usersRef, where('email', '==', email.value));
      const querySnapshot = await getDocs(usersQuery);
      if (querySnapshot.size === 0) {
        alert('This email address is not registered');
        return;
      }
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      if (password.value === userData.password) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
        navigation.navigate('Home');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.log('Error while getting documents:', error);
      alert('An error occurred while signing in');
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