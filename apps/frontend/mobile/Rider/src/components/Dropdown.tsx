import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface DropdownProps {
  label: string;
  placeholder: string;
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  options,
  selectedValue,
  onValueChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      
      {/* Main Dropdown Selection */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsOpen(!isOpen)}>
        <Text style={{ color: selectedValue ? colors.text.primary : colors.text.subText }}>
          {selectedValue || placeholder}
        </Text>
      </TouchableOpacity>

      {/* Expandable Dropdown Options (No Modal) */}
      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    marginBottom: 7,
    color: colors.text.primaryGrey,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: 8,
    padding: 12,
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: colors.white,
    maxHeight: 150, // Keeps dropdown from overflowing too much
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: colors.border.primary,
  },
  optionText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
  },
});

export default Dropdown;
