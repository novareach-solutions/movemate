import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";

interface EarningRowProps {
  label: string;
  value: string;
  isBold?: boolean;
  isGreen?: boolean;
  isRed?: boolean;
  isDashed?: boolean;
}

const EarningRow: React.FC<EarningRowProps> = ({
  label,
  value,
  isBold = false,
  isGreen = false,
  isRed = false,
  isDashed = false,
}) => {
  return (
    <View style={[styles.row, isDashed && styles.dashedBorder]}>
      <Text style={[styles.label, isBold && styles.boldText, isGreen && styles.greenText]}>
        {label}
      </Text>
      <Text style={[styles.value, isBold && styles.boldText, isGreen && styles.greenText, isRed && styles.redText]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  label: {
    fontSize: typography.fontSize.small,
    color: colors.text.subText,
  },
  value: {
    fontSize: typography.fontSize.small,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  boldText: {
    fontWeight: "bold",
  },
  greenText: {
    color: colors.green,
  },
  redText: {
    color: colors.error,
  },
  dashedBorder: {
    borderTopWidth: 1,
    borderTopColor: "#D3D3D3",
    borderStyle: "dashed",
    paddingTop: 4,
    marginTop: 4,
  },
});

export default EarningRow;
