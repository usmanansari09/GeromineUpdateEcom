import React from "react";
import { View, Text } from "react-native";

export default function PaymentInfo({ route }) {
    return (
        <View>
            <Text>{route.name}</Text>
        </View>
    );
}
