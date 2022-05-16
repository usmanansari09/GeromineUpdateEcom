import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { tailwind } from "../tailwind";

/**
 *
 * @param {{style:StyleProp<ViewStyle>}} props
 */
export default function TwoBags({ style }) {
    const iconStyle = style ? style : tailwind("w-7 h-7 text-black");
    return (
        <Svg
            style={iconStyle}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 31.586 34.779"
        >
            <Path
                fill="currentColor"
                d="M35.32,34.776V11.913H29.026V6.354H22.954V0H9.806V6.354H3.734V28.812a5.754,5.754,0,0,0,5.5,5.967ZM23.03,13.95H28.67v4.092a2.829,2.829,0,1,1-5.639,0ZM11.684,2.038h9.391V6.354H11.684ZM27.148,8.392v3.521H16.38V26.991H5.612V8.392ZM5.618,29.029H16.38v3.712H9.233A3.769,3.769,0,0,1,5.618,29.029Zm27.824,3.709H18.258V13.95h2.894v4.092a4.915,4.915,0,0,0,4.7,5.1,4.915,4.915,0,0,0,4.7-5.1V13.95h2.894Z"
                transform="translate(-3.734)"
            />
        </Svg>
    );
}
