import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {SvgProps} from 'react-native-svg';

interface StatCardProps {
  icon: React.FC<SvgProps>;
  value: string | number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({icon: Icon, value, label}) => {
  return (
    <View style={styles.container}>
      {/* <Icon width={40} height={50} /> */}
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  value: {
    fontSize: 21,
    fontWeight: '600',
    color: colors.text.primary,
  },
  label: {
    fontSize: typography.fontSize.medium,
    color: colors.text.subText,
  },
});

export default StatCard;
