import React from "react";
import { View, ViewStyle } from "react-native";
import Svg, { Path, G, Defs } from "react-native-svg";
import { tailwind } from "../tailwind";

/**
 *
 * @param {{style:ViewStyle}} props
 */
export default function PayPal({ style = {} }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="37.64px"
            height="33.05px"
            viewBox="0 0 37.64 33.05"
        >
            <Defs></Defs>
            <G id="live-chat_1_" transform="translate(313.5 658.076)">
                <Path
                    fill="currentColor"
                    id="Path_343_1_"
                    d="M-279.17-649.29h-2.31c-3.07-7.3-11.48-10.73-18.78-7.66c-3.46,1.45-6.21,4.21-7.66,7.66
		h-2.27c-1.83,0-3.31,1.48-3.31,3.31v4.41c0,1.83,1.48,3.31,3.31,3.31h4.53l-0.47-1.45c-2.24-6.32,1.07-13.27,7.39-15.51
		s13.27,1.07,15.51,7.39l0.01,0.02c0.25,0.65,0.42,1.33,0.52,2.01c0.33,2.03,0.15,4.11-0.54,6.04v0.01
		c-1.7,4.84-6.27,8.07-11.4,8.08c-1.83-0.01-3.32,1.46-3.33,3.29c-0.01,1.83,1.46,3.32,3.29,3.33c1.83,0.01,3.32-1.46,3.33-3.29
		c0-0.01,0-0.01,0-0.02v-1.49c4.45-1.07,8.12-4.21,9.88-8.43h2.32c1.83,0,3.31-1.48,3.31-3.31v-4.41
		C-275.86-647.81-277.34-649.29-279.17-649.29z"
                />
                <Path
                    fill="currentColor"
                    id="Path_344_1_"
                    class="st0"
                    d="M-304.61-636.06v2.21h9.92c5.48,0,9.92-4.44,9.92-9.92c0-5.48-4.44-9.92-9.92-9.92
		c-5.48,0-9.92,4.44-9.92,9.92c0,2.22,0.75,4.38,2.12,6.13C-302.76-636.7-303.62-636.05-304.61-636.06z M-291.37-644.88h2.21v2.21
		h-2.21V-644.88z M-295.78-644.88h2.2v2.21h-2.2V-644.88z M-300.19-644.88h2.2v2.21h-2.2V-644.88z"
                />
            </G>
        </Svg>
    );
}