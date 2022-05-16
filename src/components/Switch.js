import { getColor } from "@/common/tailwind";
import React, { useEffect, useState } from "react";
import { Switch as RNESwitch, SwitchProps } from "react-native-elements";

/**
 *
 * @param {{initialValue:boolean}& SwitchProps} props
 * @returns
 */
export default function Switch({
    initialValue = false,
    onValueChange = () => {},
    ...RNESwitchProps
}) {
    const [enabled, setEnabled] = useState(initialValue);
    useEffect(() => {
        onValueChange(enabled);
    }, [enabled]);
    return (
        <RNESwitch
            trackColor={{
                false: getColor("gray-300"),
                true: getColor("brand-primary"),
            }}
            thumbColor={getColor("white")}
            ios_backgroundColor={getColor("gray-300")}
            {...RNESwitchProps}
            value={enabled}
            onValueChange={setEnabled}
        />
    );
}
