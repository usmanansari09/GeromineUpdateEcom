import React from "react";
import { View, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { tailwind } from "../tailwind";

/**
 *
 * @param {{style:ViewStyle}} props
 */
export default function Camera({ style }) {
    return (
        <View style={{ ...style }}>
            <Svg
                style={tailwind("bg-black")}
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="24.75"
                viewBox="0 0 28 24.75"
            >
                <Path
                    id="cam-pink"
                    d="M26,7.938V22.563A2.438,2.438,0,0,1,23.563,25H2.438A2.438,2.438,0,0,1,0,22.563V7.938A2.438,2.438,0,0,1,2.438,5.5H6.906l.625-1.671A2.434,2.434,0,0,1,9.811,2.25h6.373a2.434,2.434,0,0,1,2.28,1.579l.63,1.671h4.469A2.438,2.438,0,0,1,26,7.938ZM19.094,15.25A6.094,6.094,0,1,0,13,21.344,6.1,6.1,0,0,0,19.094,15.25Zm-1.625,0A4.469,4.469,0,1,1,13,10.781,4.475,4.475,0,0,1,17.469,15.25Z"
                    transform="translate(1 -1.25)"
                    fill="currentColor"
                    stroke="#fff"
                    strokeWidth="2"
                />
            </Svg>
        </View>
    );
}
