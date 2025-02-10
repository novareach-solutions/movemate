import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

interface IconWithImageProps {
  IconComponent: React.FC<any>;
  margin: boolean;
}

const IconWithImage: React.FC<IconWithImageProps> = ({IconComponent}) => {
  return (
    <View
      style={[
        styles.container,
        {
          marginRight: 10,
        },
      ]}>
      <IconComponent width={50} height={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconWithImage;
