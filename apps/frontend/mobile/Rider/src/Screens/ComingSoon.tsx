import React from 'react';
import {SafeAreaView, View} from 'react-native';
import ImageText from '../components/ImageText';
import Header from '../components/Header';
import ComingSoon from "../assets/icons/comingSoon.svg"

const ComingSoonScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header isBack logo />
      <ImageText icon={ComingSoon} text="Coming Soon!" />
    </SafeAreaView>
  );
};

export default ComingSoonScreen;
