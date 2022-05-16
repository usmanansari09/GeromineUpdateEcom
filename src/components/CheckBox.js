import { getColor, tailwind } from "@/common/tailwind";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { CheckBox as RNECheckBox, CheckBoxProps } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
/**
 *
 * @param {{theme:"primary"|"secondary"}& CheckBoxProps} props
 */
export default function CheckBox({
    theme,
    defaultChecked = false,
    ...RNECheckboxProps
}) {
    const [isChecked, setIsChecked] = useState(defaultChecked);
    const toggleCheck = () => setIsChecked((prev) => !prev);
    return (
        <RNECheckBox
            {...RNECheckboxProps}
            checked={isChecked}
            onPress={toggleCheck}
            checkedIcon="check-square"
            checkedColor={getColor("brand-primary")}
            containerStyle={{
                ...tailwind("p-0 m-0 bg-transparent"),
                ...(RNECheckboxProps.containerStyle || {}),
            }}
        />
    );
}
