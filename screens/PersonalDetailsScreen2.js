import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, RadioButton, TextInput } from 'react-native-paper';
import Background from '../components/Background';
import CustomBackButton from '../components/CustomBackButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { theme } from '../core/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { collection, addDoc } from 'firebase/firestore';
import db from '../config';

const items = [
  { label: 'מרכז', value: 'מרכז' },
  { label: 'צפון', value: 'צפון' },
  { label: 'שרון', value: 'שרון' },
  { label: 'שפלה וירושלים', value: 'שפלה וירושלים' },
  { label: 'דרום', value: 'דרום' },
  ];

  export default function PersonalDetailsScreen2({ navigation, route }) {
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [groupDistrict, setGroupDistrict] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);

  const validateForm = () => {
    if (!city) {
      alert('אנא הזן את העיר מגורים שלך');
      return false;
    }
    if (!phone.match(/^[0-9]{10}$/)) {
      alert('אנא הזן מספר טלפון חוקי (10 ספרות)');
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
    try {
    switch (groupDistrict) {
    case "מרכז":
    navigation.navigate('GroupSelectionScreenCenter', {
      name: route.params.name,
      email: route.params.email,
      password: route.params.password,
      role: route.params.role,
      Address: city,
      Phone: phone,
      Grade : '',
      Gender : '',
      Region : groupDistrict,
      Group : '',
    });
    break;
    case "צפון":
    navigation.navigate('GroupSelectionScreenNorth', {
      name: route.params.name,
      email: route.params.email,
      password: route.params.password,
      role: route.params.role,
      Address: city,
      Phone: phone,
      Grade : '',
      Gender : '',
      Region : groupDistrict,
      Group : '',
    });
    break;
    case "שרון":
    navigation.navigate('GroupSelectionScreenSharon', {
      name: route.params.name,
      email: route.params.email,
      password: route.params.password,
      role: route.params.role,
      Address: city,
      Phone: phone,
      Grade : '',
      Gender : '',
      Region : groupDistrict,
      Group : '',
    });
    break;
    case "שפלה וירושלים":
    navigation.navigate('GroupSelectionScreenShfelaAndJerusalem', {
      name: route.params.name,
      email: route.params.email,
      password: route.params.password,
      role: route.params.role,
      Address: city,
      Phone: phone,
      Grade : '',
      Gender : '',
      Region : groupDistrict,
      Group : '',
    });
    break;
    case "דרום":
    navigation.navigate('GroupSelectionScreenSouth', {
      name: route.params.name,
      email: route.params.email,
      password: route.params.password,
      role: route.params.role,
      Address: city,
      Phone: phone,
      Grade : '',
      Gender : '',
      Region : groupDistrict,
      Group : '',
    });
    break;
    }
    } catch (error) {
    console.error(error);
    alert("An error occurred while navigating to the group selection screen.");
    }
    }
    };

    return (
      <Background>
      <CustomBackButton goBack={navigation.goBack} />
      <View style={styles.form}>
      <Header style={styles.header}>פרטים אישיים מדריך</Header>
      <Text style={[styles.label, styles.highlight]}>עיר מגורים:</Text>
      <TextInput
      style={styles.input}
      mode="outlined"
      value={city}
      onChangeText={setCity}
      />
      <Text style={[styles.label, styles.highlight]}>טלפון:</Text>
      <TextInput
      style={styles.input}
      mode="outlined"
      value={phone}
      onChangeText={setPhone}
      />
      <Text style={[styles.label, styles.highlight]}>בחירת מחוז הקבוצה:</Text>
      <View style={styles.dropdown}>
      <TouchableOpacity onPress={() => setPickerVisible(!pickerVisible)}>
      <View style={[styles.dropdownHeader, pickerVisible && styles.dropdownHeaderActive]}>
      <Text>{groupDistrict || "לחץ כאן לבחירה"}</Text>
      <MaterialIcons name={pickerVisible ? "arrow-drop-up" : "arrow-drop-down"} size={32} />
          </View>
        </TouchableOpacity>
        {pickerVisible && (
          <View style={styles.pickerContainer}>
            <ScrollView style={styles.picker}>
              {items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setGroupDistrict(item.value);
                    setPickerVisible(false);
                  }}
                >
                  <Text style={[styles.pickerOption, groupDistrict === item.value && styles.pickerOptionActive]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
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
      borderColor: theme.colors.primary,
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
      dropdown: {
      marginTop: 8,
      },
      dropdownHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 8,
      borderColor: theme.colors.secondary,
      borderWidth: 1,
      borderRadius: 4,
      },
      dropdownHeaderText: {
      flex: 1,
      color: theme.colors.primary,
      },
      dropdownHeaderActive: {
      borderWidth: 2,
      borderColor: theme.colors.primary,
      },
      pickerContainer: {
      maxHeight: 150,
      marginTop: 4,
      borderColor: theme.colors.secondary,
      borderWidth: 1,
      borderRadius: 4,
      },
      picker: {
      paddingHorizontal: 0,
      },
      pickerOption: {
      paddingVertical: 9,
      fontSize: 16,
      textAlign: "center",
      },
      pickerOptionActive: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.surface,
      },
      });