import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Students4 from "./screens/Students4";
import RecentActivities from "./screens/RecentActivities";
import CloseActivity from "./screens/CloseActivity";
import Home from "./screens/Home";
import Activitiy from "./screens/Activitiy";
import NewTask from "./screens/NewTask";
import StudentDetails from './components/StudentDetails';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
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

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
