import React, { ReactChildren } from "react";
import { View, StatusBar, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { StackHeaderProps } from "@react-navigation/stack";
import { tailwind } from "@/common/tailwind";

const DEFAULT_HEADER_ACTIONS = { hasCart: false, hasSearch: false };
/**
 *
 * @param {{children:ReactChildren}& StackHeaderProps} props
 */
export default function BaseHeader({ children, ...headerProps }) {
    const { scene, navigation, previous } = headerProps;
    const insets = useSafeAreaInsets();
    const { options } = scene.descriptor;

    return (
        <View
            style={{
                ...tailwind("bg-black"),
            }}
        >
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <View
                style={tailwind(
                    "py-5 px-3 flex-row items-center justify-between"
                )}
            >
                <TouchableOpacity onPress={navigation.goBack}>
                    <Icon
                        name="arrow-back-outline"
                        style={tailwind("text-2xl text-white")}
                    />
                </TouchableOpacity>
                <View style={tailwind("flex-1")}>{children}</View>
            </View>
        </View>
    );
}
