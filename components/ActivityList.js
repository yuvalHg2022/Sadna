import { View, StyleSheet, FlatList, Text, Dimensions } from "react-native";
import React, { useCallback } from "react";
import MyTittle from "./MyTittle";
import { COLORS } from "../utils/StyleGuide";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const ActivityList = (props) => {
  const renderItem = useCallback(
    ({ item, index }) => (
      <TouchableOpacity
        style={styles.eventItem}
        onPress={() => {
          alert(item.details);
        }}
      >
        <View style={styles.dateCube}>
          <Text style={styles.eventItemText}>{item.date}</Text>
          <Text style={styles.eventItemText}>{item.hour}</Text>
        </View>
        <View style={styles.eventDetails}>
          <Text style={styles.eventItemText}>{item.subject}</Text>
          <Text style={[styles.eventItemText, { fontWeight: "300" }]}>
            {item.place}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    []
  );

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
          keyExtractor={(item, index) => item?.subject?.toString()}
        />
      </View>
    </View>
  );
};

export default ActivityList;

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
    height:'128%',
  },
  eventItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'left',
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
    textAlign: 'left',
    
  },
  dateCube: {
    borderRightWidth: 3,
    borderRightColor: COLORS.light_blue,
    alignItems: 'right',
    width:"35%",
    paddingRight:10,

  },
  eventDetails: {
    alignItems: 'flex-start',
    
  },
});