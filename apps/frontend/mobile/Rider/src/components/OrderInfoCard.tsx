import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {typography} from '../theme/typography';
import {colors} from '../theme/colors';

interface OrderInfoCardProps {
  title: string;
  subtitle: string;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  LeftIcon?: React.FC<any>;
  RightIcon?: React.FC<any>;
}

const OrderInfoCard: React.FC<OrderInfoCardProps> = ({
  title,
  subtitle,
  onPressLeftIcon,
  onPressRightIcon,
  LeftIcon,
  RightIcon,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.iconContainer}>
        {LeftIcon && (
          <TouchableOpacity onPress={onPressLeftIcon}>
            <LeftIcon />
          </TouchableOpacity>
        )}
        {RightIcon && (
          <TouchableOpacity onPress={onPressRightIcon}>
            <RightIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
  },
  textContainer: {
    flexDirection: 'column',
    gap: 5,
  },
  title: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
  },
  subtitle: {
    fontSize: typography.fontSize.medium,
    color: colors.text.primary,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});

export default OrderInfoCard;
