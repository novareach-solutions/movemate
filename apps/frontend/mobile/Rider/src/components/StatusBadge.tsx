import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Check from "../assets/icons/checkIcon.svg";
import Cross from "../assets/icons/cross.svg";
import { colors } from "../theme/colors";

interface StatusBadgeProps {
    success: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ success }) => {
    return (
        <View style={[styles.container]}>
            {success ? (
                <>
                    <Text style={[styles.statusText]}>Delivered</Text>
                    <Check width={16} height={16} />
                </>
            ) : (
                <>
                    <Text style={[styles.statusText]}>Cancelled</Text>
                    <Cross width={16} height={16} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 14,
        marginRight: 5,
        color:colors.black
    },
});

export default StatusBadge;
