import React from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { COLORS } from '../utils/StyleGuide';

const IMAGE_HEIGHT = 450;

export default function StartScreen({ navigation }) {
  return (
    <>
      <ImageBackground
  source={require('../assets/logo.png')}
  style={{ height: IMAGE_HEIGHT, width: '100%', flex: 1 }}
  resizeMode="cover"
  imageStyle={{ opacity: 0.8 }}
      >
        <View style={styles.titleContainer}>
          <Header style={styles.title}>ברוכים הבאים</Header>
          <Paragraph style={styles.subtitle}>20232W91 ©</Paragraph>
        </View>
      </ImageBackground>
      <Background>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
            התחברות
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate('RegisterScreen')}>
            הרשמה
          </Button>
        </View>
        <View style={styles.footerContainer}>
          <Footer />
        </View>
      </Background>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: -10,
  },
  buttonContainer: {
    marginBottom: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
