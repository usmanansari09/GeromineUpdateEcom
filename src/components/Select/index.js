import { getColor, tailwind } from "@/common/tailwind";
import React, { useRef, LegacyRef, useState } from "react";
import { View, StyleProp, TextStyle, TextProps, ViewStyle } from "react-native";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";
import Icon from "react-native-vector-icons/Ionicons";
import { Text } from "@/components/index";

const sizes = {
    sm: tailwind("py-2 text-lg"),
    md: tailwind("py-4 text-2xl"),
    lg: tailwind("py-6 text-3xl"),
};

const selectLabelStyle = {
    sm: tailwind("text-lg"),
    md: tailwind("text-2xl"),
    lg: tailwind("text-3xl"),
};

const inputTheme = {
    secondary: tailwind("text-black"),
    primary: tailwind("text-white "),
    white: tailwind("text-black bg-gray-100"),
};
const inputType = {
    solid: tailwind("rounded-lg overflow-hidden bg-red-600"),
    outline: tailwind("border border-black rounded-lg overflow-hidden px-3"),
    underline: tailwind("border-b border-black"),
};

const placeholderStyle = {
    size: {
        sm: { lineHeight: 18 },
        md: { lineHeight: 16 },
        lg: { lineHeight: 30 },
    },
};
const labelType = {
    primary: tailwind("text-gray-400"),
    secondary: tailwind("text-black"),
};
/**
 * @typedef {Object} GBaseSelectProps
 * @property {'primary'|'secondary'} theme
 * @property {'sm'|'md'|'lg'} size
 * @property {"solid"|"outline"|"underline"} type
 * @property {string} label
 * @property {StyleProp<TextStyle>} labelStyle
 * @property {TextProps} labelProps
 * @property {StyleProp<ViewStyle>} containerStyle
 * @property {string} errorMessage
 * 
 * @typedef {GBaseSelectProps & PickerSelectProps}  GSelectProps
 *
/

/**
 * @param {GSelectProps} props
 */
export default function Select({
    theme = "primary",
    size = "md",
    type = "outline",
    label = "",
    labelStyle = {},
    labelProps = {},
    containerStyle = {},
    errorMessage = "",
    ...RNNProps
}) {
    /**
     * @type {LegacyRef<RNPickerSelect>}
     */
    const selectRef = useRef();
    return (
        <View style={{ ...containerStyle, ...tailwind("mb-4") }}>
            {label.length !== 0 && (
                <Text
                    style={{
                        ...tailwind("font-bold text-base"),
                        ...labelType[theme],
                        ...selectLabelStyle[size],
                        ...labelStyle,
                    }}
                    {...labelProps}
                >
                    {label}
                </Text>
            )}
            <RNPickerSelect
                Icon={Chevron}
                useNativeAndroidPickerStyle={false}
                {...RNNProps}
                ref={selectRef}
                style={{
                    inputAndroid: {
                        ...sizes[size],
                        ...inputTheme[theme],
                        ...inputType[type],
                        ...(RNNProps?.style?.inputAndroid || {}),
                    },
                    iconContainer: {
                        ...tailwind("bottom-0 top-0 justify-center pr-3"),
                    },
                    placeholder: {
                        ...tailwind("text-base"),
                        ...placeholderStyle.size[size],
                    },
                    inputIOS: {
                        ...sizes[size],
                        ...inputTheme[theme],
                        ...inputType[type],
                        ...(RNNProps?.style?.inputIOS || {}),
                    },
                }}
            />

            {!!errorMessage && (
                <Text style={tailwind("text-sm text-red-500")}>
                    {errorMessage}
                </Text>
            )}
        </View>
    );
}
function Chevron() {
    return (
        <View>
            <Icon
                name="chevron-down-outline"
                color={getColor("black")}
                size={24}
            />
        </View>
    );
}
