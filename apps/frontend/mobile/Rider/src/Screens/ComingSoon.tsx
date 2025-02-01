import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {images} from '../assets/images/images';
import ImageText from '../components/ImageText';
import Header from '../components/Header';

const ComingSoonScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header isBack logo />
      <ImageText image={images.trophy} text="Coming Soon!" />
    </SafeAreaView>
  );
};

export default ComingSoonScreen;
