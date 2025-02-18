// components/AutoCompleteInput.tsx
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';

interface AutoCompleteInputProps {
  label: string;
  placeholder: string;
  suggestions: string[];
  value: string;
  onValueChange: (value: string) => void;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  label,
  placeholder,
  suggestions,
  value,
  onValueChange,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (value) {
      const filtered = suggestions.filter(sugg =>
        sugg.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(suggestions);
    }
  }, [value, suggestions]);

  const handleSelect = (selection: string) => {
    onValueChange(selection);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={text => {
          onValueChange(text);
          setShowSuggestions(true);
        }}
        placeholderTextColor={colors.text.subText}
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={filteredSuggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => handleSelect(item)}>
                <Text style={styles.suggestionText}>{item}</Text>
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
    marginTop: 20,
    position: 'relative',
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
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: colors.white,
    maxHeight: 150,
    zIndex: 999,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: colors.border.primary,
  },
  suggestionText: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
  },
});

export default AutoCompleteInput;
