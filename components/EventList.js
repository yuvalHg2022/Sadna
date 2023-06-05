import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import React, { useCallback } from "react";
import MyTittle from "./MyTittle";
import { COLORS } from "../utils/StyleGuide";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width

const EventList = (props) => {

  const renderItem = useCallback(({ item, index }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => {
        const eventDetails = `פרטי האירוע:\nיום: ${item.day}\nחודש: ${item.month}\nכותרת: ${item.title}\nמיקום: ${item.location}`;
        alert(eventDetails);
      }}
    >
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
  ), []);

  return (
    <View style={[styles.container, props.containerStyle]}>
      <View style={styles.title}>
        <FontAwesome name="calendar" size={24} color={COLORS.black} />
        <MyTittle text={props.title} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={props.list}
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
    alignItems: 'flex-start',
    right: -25,
  },
  title: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    writingDirection: 'rtl',
    marginBottom: 2,
  },
  listContainer: {
    backgroundColor: COLORS.dark_gray,
    padding: 10,
    borderWidth: 1,
    borderRadius: 25,
    width: SCREEN_WIDTH - (25 * 2),
  },
  eventItem: {
    flexDirection: 'row',
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
    textAlign: 'right',
  },
  dateCube: {
    borderRightWidth: 3,
    borderRightColor: COLORS.light_blue,
    alignItems: 'right',
    width:"30%",
    paddingRight:10,

  },
  eventDetails: {
    alignItems: 'flex-end',
  },
});
