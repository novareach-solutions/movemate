import React from 'react';
import {View, Text, StyleSheet, Image, TextStyle} from 'react-native';
import {typography} from '../theme/typography';
import {colors} from '../theme/colors';

const ImageText: React.FC<{image: any; text: string}> = ({image, text}) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
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
