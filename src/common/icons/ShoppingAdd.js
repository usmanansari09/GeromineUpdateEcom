import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { tailwind } from "../tailwind";

/**
 *
 * @param {{style:StyleProp<ViewStyle>}} props
 */
export default function ShoppingAdd({ style }) {
    const iconStyle = style ? style : tailwind("w-7 h-7 text-black");
    return (
        <Svg
            style={iconStyle}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 27.837 34.779"
        >
            <Path
                fill="currentColor"
                d="M5.22,34.779C2.34,34.779,0,32.7,0,30.148c0-.028.007-.057.007-.085L2,7.638a.953.953,0,0,1,.952-.875h4.1a6.871,6.871,0,0,1,13.741,0h4.1a.958.958,0,0,1,.952.875L27.83,30.064a.336.336,0,0,1,.007.085c0,2.553-2.34,4.631-5.22,4.631Zm-3.3-4.587a3.063,3.063,0,0,0,3.3,2.667h17.4a3.067,3.067,0,0,0,3.3-2.667L24,8.691H20.789v2.916a.96.96,0,0,1-1.921,0V8.691H8.961v2.916a.96.96,0,0,1-1.921,0V8.691H3.826ZM8.969,6.764h9.9a4.951,4.951,0,0,0-9.9,0ZM13.061,27.14v-5.2H8.016V20.276h5.045v-5.2h1.715v5.2h5.044V21.94H14.776v5.2Z"
            />
        </Svg>
    );
}
