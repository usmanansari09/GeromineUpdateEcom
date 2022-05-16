import React from "react";
import { View, ViewStyle } from "react-native";
import Svg, {
    Path,
    G,
    Defs,
    LinearGradient,
    Stop,
    Rect,
} from "react-native-svg";

/**
 *
 * @param {{style:ViewStyle}} props
 */
export default function Venmo({ style = {} }) {
    return (
        <Svg
            style={[{ width: 110, height: 64, color: "black" }, style]}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
        >
            <Path
                fill="currentColor"
                d="M32,376a56,56,0,0,0,56,56H424a56,56,0,0,0,56-56V222H32Zm66-76a30,30,0,0,1,30-30h48a30,30,0,0,1,30,30v20a30,30,0,0,1-30,30H128a30,30,0,0,1-30-30Z"
            />
            <Path
                fill="currentColor"
                d="M424,80H88a56,56,0,0,0-56,56v26H480V136A56,56,0,0,0,424,80Z"
            />
        </Svg>
    );
}
