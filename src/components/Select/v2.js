import DropDownPicker, {
    DropDownPickerProps,
} from "react-native-dropdown-picker";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { tailwind } from "@/common/tailwind";
import Icon from "react-native-vector-icons/Ionicons";

const sizes = {
    container: {
        sm: tailwind("py-2"),
        md: tailwind("py-4"),
        lg: tailwind("py-6"),
    },
    placeholder: {
        sm: tailwind("text-lg text-gray-400 "),
        md: tailwind("text-base text-gray-400 "),
        lg: tailwind("text-3xl text-gray-400 "),
    },
};
const titleStyles = {
    sm: tailwind("text-sm"),
    md: tailwind("text-base"),
    lg: tailwind("text-2xl"),
};
const inputTheme = {
    primary: tailwind("text-black"),
    secondary: tailwind("text-white bg-black"),
    white: tailwind("text-black bg-gray-100"),
};
const inputType = {
    solid: tailwind("rounded-lg overflow-hidden  px-4 py-2"),
    outline: tailwind(
        "border border-black rounded-lg overflow-hidden px-4 py-2"
    ),
    secondary: tailwind("border-b border-gray-400"),
};
const labelType = {
    primary: tailwind("text-gray-400"),
    secondary: tailwind("text-gray-400"),
    white: tailwind("text-black"),
};
const placeholderStyle = {
    size: {
        sm: { lineHeight: 18 },
        md: { lineHeight: 16 },
        lg: { lineHeight: 30 },
    },
};

/**
 *
 * @param {{theme:'primary'|'secondary'|'white',size:'sm'|'md'|'lg',type:"solid"|"outline"|"secondary",label:string,labelStyle:StyleProp<TextStyle>,labelProps:TextProps,containerStyle:StyleProp<ViewStyle>,errorMessage:string}& DropDownPickerProps} props
 */
export default function SelectDropdown({
    theme = "primary",
    size = "md",
    type = "outline",
    label = "",
    labelStyle = {},
    labelProps,
    containerStyle = {},
    errorMessage,
    ...RNDropdownProps
}) {
    return (
        <View style={{ ...tailwind("mb-4"), ...containerStyle }}>
            {label.length !== 0 && (
                <Text
                    style={{
                        ...tailwind("text-black font-bold"),
                        ...titleStyles[size],
                        ...labelStyle,
                    }}
                    {...labelProps}
                >
                    {label}
                </Text>
            )}
            <DropDownPicker
                arrowSize={24}
                {...RNDropdownProps}
                selectedLabelStyle={{
                    ...sizes.placeholder[size],
                    ...tailwind("text-black"),
                }}
                containerStyle={tailwind("p-0")}
                style={{
                    ...tailwind(
                        "border-0 border-b border-gray-400 bg-gray-100 m-0 rounded-none py-2 px-0"
                    ),
                    ...tailwind(
                        `${errorMessage !== undefined ? "border-red-500" : ""}`
                    ),
                }}
                itemStyle={{
                    justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa", minHeight: 150 }}
                placeholderStyle={{
                    ...sizes.placeholder[size],
                    ...(RNDropdownProps?.placeholderStyle || {}),
                }}
                dropDownMaxHeight={150}
            />
            {errorMessage !== undefined && (
                <Text style={tailwind("text-sm text-red-500 mt-1 pl-1")}>
                    {errorMessage}
                </Text>
            )}
        </View>
    );
}
