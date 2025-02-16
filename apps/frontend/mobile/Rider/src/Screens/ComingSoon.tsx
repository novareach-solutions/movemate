import React from 'react';
import {SafeAreaView, View} from 'react-native';
import ImageText from '../components/ImageText';
import Header from '../components/Header';
import ComingSoon from '../assets/icons/comingSoon.svg';
import { colors } from '../theme/colors';

const ComingSoonScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1,backgroundColor: colors.white}}>
      <Header isBack logo />
      <ImageText icon={ComingSoon} text="Coming Soon!" />
    </SafeAreaView>
  );
};

export default ComingSoonScreen;
