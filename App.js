import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home3 from "./screens/Home3";
import Activitiy4 from "./screens/Activitiy4";
import Register4 from "./screens/Register4";
import Students4 from "./screens/Students4";
import RecentActivities from "./screens/RecentActivities";
import CloseActivity from "./screens/CloseActivity";

const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home3"
          component={Home3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Activitiy4"
          component={Activitiy4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register4"
          component={Register4}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
