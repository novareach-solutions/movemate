import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { typography } from '../theme/typography';
import { colors } from '../theme/colors';
import { SvgProps } from 'react-native-svg';

const ImageText: React.FC<{ icon: React.FC<SvgProps>; text: string }> = ({ icon:Icon, text }) => {
  return (
    <View style={styles.container}>
      <Icon style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightButtonBackground,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.black,
  },
});

export default ImageText;
