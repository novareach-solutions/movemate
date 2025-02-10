import React from 'react';
import {View} from 'react-native';
import {images} from '../assets/images/images';
import ImageText from '../components/ImageText';

const ComingSoonScreen: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <ImageText image={images.trophy} text="Coming Soon!" />
    </View>
  );
};

export default ComingSoonScreen;
