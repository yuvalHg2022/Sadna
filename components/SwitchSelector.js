import React from 'react';
import SwitchSelector from 'react-native-switch-selector';
import { StyleSheet, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../core/theme';

const FancySwitchSelector = ({ value, onChange }) => {
  const options = [
    {
      label: 'חניך/ה',
      value: false,
      customIcon: (
        <Ionicons name="ios-people" size={18} color={theme.colors.primary} />
      ),

    },
    {
      label: 'מדריך/ה',
      value: true,
      customIcon: (
        <Ionicons name="ios-person" size={18} color={theme.colors.primary} />
      ),

    },
  ];

  const renderOption = (option, selected) => {
    const borderStyle = selected ? {borderLeftWidth: 1, borderRightWidth: 1} : null;
    return (
      <View style={[styles.buttonContainer, borderStyle]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {option.customIcon}
          <Text style={styles.optionLabel}>{option.label}</Text>
        </View>
      </View>
    );
  };

  const customButton = (option, isSelected) => {
    const borderStyle = isSelected ? {borderLeftWidth: 1, borderRightWidth: 1} : null;
    return (
      <View style={[styles.buttonContainer, isSelected ? styles.selectedButtonContainer : null, borderStyle]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name={option.value ? 'ios-people' : 'ios-person'}
            size={18}
            color={isSelected ? '#FFFFFF' : theme.colors.primary}
          />
          <Text
            style={{
              marginLeft: 5,
              marginRight: 5,
              color: isSelected ? '#FFFFFF' : theme.colors.primary,
            }}
          >
            {option.label}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SwitchSelector
        options={options}
        initial={value ? 1 : 0}
        onPress={(val) => onChange(val)}
        hasPadding
        height={40}
        fontSize={14}
        borderRadius={20}
        buttonColor={theme.colors.primary}
        backgroundColor={theme.colors.surface}
        textColor={theme.colors.primary}
        selectedColor={'#FFFFFF'}
        renderOption={renderOption}
        customButton={customButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  optionLabel: {
    marginLeft: 10,
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingRight: 8, // added padding
  },
  selectedButtonContainer: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});

export default FancySwitchSelector;