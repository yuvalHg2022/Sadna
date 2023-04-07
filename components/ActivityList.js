import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import React, { useCallback } from "react";
import MyTittle from "./MyTittle";
import { COLORS } from "../utils/StyleGuide";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width

const ActivityList = (props) => {

  const renderItem = useCallback(({ item, index }) => (
    <TouchableOpacity style={styles.eventItem} onPress={() => { alert(item.details) }}>
      <View style={styles.dateCube}>
        <Text style={styles.eventItemText}>{item.date}</Text>
        <Text style={styles.eventItemText}>{item.hour}</Text>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventItemText}>{item.subject}</Text>
        <Text style={[styles.eventItemText, { fontWeight: "300" }]}>{item.place}</Text>
      </View>
    </TouchableOpacity>
  ), [])

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

export default ActivityList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'flex-start',
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
    alignItems: 'flex-end',
    paddingRight: 30,
  },
});
