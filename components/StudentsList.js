import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import React, { useCallback } from "react";
import MyTittle from "./MyTittle";
import { COLORS } from "../utils/StyleGuide";
import { FontAwesome } from "@expo/vector-icons";
import StudentListData from '../assets/mocks/studentList.json';
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SCREEN_WIDTH = Dimensions.get("screen").width

const Studentlist = () => {
  const navigation = useNavigation();

  const renderItem = useCallback(({ item, index }) => (
    <TouchableOpacity style={styles.eventItem} onPress={() => {
      navigation.navigate("StudentDetails", { student: item });}}>
          <View style={styles.arrowContainer}>
        <FontAwesome name="arrow-left" size={20} color={COLORS.light_blue} />
      </View>
      <View style={styles.dateCube}>
        <Text style={styles.eventItemText}>{index + 1}</Text>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventItemText}>{item.Name}</Text>
      </View>
    </TouchableOpacity>
  ), [navigation])


  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <FontAwesome name="user" size={24} color={COLORS.black} />
        <MyTittle text="רשימת חניכים" />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={StudentListData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </View>
  );
};

export default Studentlist;

const styles = StyleSheet.create({
  container: {
    flex: .4,
    paddingTop: 40,
    alignItems: 'flex-end',
    right: 28,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    writingDirection: 'rtl'
  },
  listContainer: {
    backgroundColor: COLORS.dark_gray,
    borderWidth: 1,
    borderRadius: 25,
    width: SCREEN_WIDTH - (25 * 2),
    height: 480,
    justifyContent: 'center',

  },
  eventItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.light_gray,
    height: 75,
    position: 'relative',
  },
  arrowContainer: {
    position: 'absolute',
    left: 320,
    top: 25,
  },
  eventItemText: {
    color: COLORS.white,
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "700",
    marginHorizontal: 5,
  },
  dateCube: {
    borderRightWidth: 3,
    borderRightColor: COLORS.light_blue,
    alignItems: 'center'
  },
  eventDetails: {
    alignItems: 'flex-end'
  },
});
