import React from 'react';
import {View, Text, Image, StyleSheet, TextStyle} from 'react-native';
import {colors} from '../theme/colors';
import {typography} from '../theme/typography';
import {SvgProps} from 'react-native-svg';

interface DetailRowProps {
  label: string;
  value: string | number;
  icon?: React.FC<SvgProps>;
}

const DetailRow: React.FC<DetailRowProps> = ({icon: Icon, label, value}) => {
  return (
    <View style={styles.detailRow}>
      {Icon && <Icon style={styles.icon} />}
      <Text
        style={[
          styles.detailText,
          Icon
            ? {
                fontWeight: typography.fontWeight
                  .regular as TextStyle['fontWeight'],
              }
            : {
                fontWeight: typography.fontWeight
                  .bold as TextStyle['fontWeight'],
              },
        ]}>
        {label}
      </Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: colors.text.primaryGrey,
    marginRight: 10,
  },
  detailText: {
    flex: 1,
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
  },
  detailValue: {
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    color: colors.text.primary,
  },
});

export default DetailRow;
