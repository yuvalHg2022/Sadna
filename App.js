import { View, Text, StyleSheet, Button,I18nManager  } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Students4 from "./screens/Students4";
import RecentActivities from "./screens/RecentActivities";
import CloseActivity from "./screens/CloseActivity";
import Home from "./screens/Home";
import Activitiy from "./screens/Activitiy";
import NewTask from "./screens/NewTask";
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import Dashboard from "./screens/Dashboard";
import StudentDetails from "./components/StudentDetails";
import PersonalDetailsScreen from "./screens/PersonalDetailsScreen";
import PersonalDetailsScreen2 from "./screens/PersonalDetailsScreen2";
import HomePupil from "./screens/HomePupil";
import ContactUs from "./screens/ContactUs";
import ChatbotScreen from './screens/ChatbotScreen';
import InstructorMessageScreen from './screens/InstructorMessageScreen';
import CloseActivityPupil from "./screens/CloseActivityPupil";
import Messages from "./components/PupilMessages";
import GroupSelectionScreenCenter from "./screens/GroupSelectionScreenCenter";
import GroupSelectionScreenNorth from "./screens/GroupSelectionScreenNorth";
import GroupSelectionScreenSharon from "./screens/GroupSelectionScreenSharon";
import GroupSelectionScreenShfelaAndJerusalem from "./screens/GroupSelectionScreenShfelaAndJerusalem";
import GroupSelectionScreenSouth from "./screens/GroupSelectionScreenSouth";
import PupilMessages from "./components/PupilMessages";
import InstructorMessagesReceived from "./screens/InstructorMessagesReceived";
import InstructorMessagesToStudents from "./screens/InstructorMessagesToStudents";
import StudentMessagesReceived from "./screens/StudentMessagesReceived";

I18nManager.forceRTL(true);

import { Provider } from 'react-native-paper'
import { theme } from './core/theme'

const App = () => {
  const Stack = createStackNavigator();

    return (
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="PersonalDetailsScreen" component={PersonalDetailsScreen} />
            <Stack.Screen name="PersonalDetailsScreen2" component={PersonalDetailsScreen2} />
            <Stack.Screen name="GroupSelectionScreenCenter" component={GroupSelectionScreenCenter} />
            <Stack.Screen name="GroupSelectionScreenNorth" component={GroupSelectionScreenNorth} />
            <Stack.Screen name="GroupSelectionScreenSharon" component={GroupSelectionScreenSharon} />
            <Stack.Screen name="GroupSelectionScreenShfelaAndJerusalem" component={GroupSelectionScreenShfelaAndJerusalem} />
            <Stack.Screen name="GroupSelectionScreenSouth" component={GroupSelectionScreenSouth} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen
          name="Activitiy"
          component={Activitiy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewTask"
          component={NewTask}
          options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Students4"
        component={Students4}
        options={{ title: "חניכים" }}
      />
         <Stack.Screen
        name="CloseActivity"
        component={CloseActivity}
        options={{ headerShown: false }}
        />
         <Stack.Screen
        name="RecentActivities"
        component={RecentActivities}
        options={{ headerShown: false }}
        />

      <Stack.Screen
        name="StudentDetails"
        component={StudentDetails}
        options={{ headerShown: false }}
      />
            <Stack.Screen name="HomePupil" component={HomePupil} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
            <Stack.Screen name="CloseActivityPupil" component={CloseActivityPupil} />
            <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
            <Stack.Screen name="InstructorMessageScreen" component={InstructorMessageScreen} />
            <Stack.Screen name="Messages" component={Messages}/>
            <Stack.Screen name="PupilMessages" component={PupilMessages} />
            <Stack.Screen name="InstructorMessagesReceived" component={InstructorMessagesReceived} />
            <Stack.Screen name="InstructorMessagesToStudents" component={InstructorMessagesToStudents} />
            <Stack.Screen name="StudentMessagesReceived" component={StudentMessagesReceived} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
  
export default App;