import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import React, { useCallback } from "react";
import MyTittle from "./MyTittle";
import { COLORS } from "../utils/StyleGuide";
import { FontAwesome } from "@expo/vector-icons";
import eventListData from '../assets/mocks/eventList.json'
import { TouchableOpacity } from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width

const EventList = () => {

  const renderItem = useCallback(({ item, index }) => (
    <TouchableOpacity style={styles.eventItem} onPress={() => { console.log('item pressed:', item) }}>
      <View style={styles.dateCube}>
        <Text style={styles.eventItemText}>{item.day}</Text>
        <Text style={styles.eventItemText}>{item.month}</Text>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventItemText}>{item.title}</Text>
        <Text style={[styles.eventItemText, { fontWeight: "300" }]}>{item.location}</Text>
      </View>
      {item.url ? <FontAwesome name="arrow-left" size={18} color={COLORS.light_gray} /> : <View />}
    </TouchableOpacity>
  ), [])

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <FontAwesome name="calendar" size={24} color={COLORS.black} />
        <MyTittle text="לוח אירועים" />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={eventListData}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </View>
  );
};

export default EventList;

const styles = StyleSheet.create({
  container: {
    flex: .4,
    alignItems: 'flex-end',
    right: 28,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    writingDirection: 'rtl'
  },
  listContainer: {
    backgroundColor: COLORS.dark_gray,
    padding: 10,
    borderWidth: 1,
    borderRadius: 25,
    width: SCREEN_WIDTH - (25 * 2),
  },
  eventItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginHorizontal: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.light_gray,

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
