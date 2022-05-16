import React from "react";
import { View, ViewStyle } from "react-native";
import Svg, { Path, G, Rect, SvgCssUri } from "react-native-svg";
import { tailwind } from "../tailwind";

/**
 *
 * @param {{style:ViewStyle}} props
 */
export default function Venmo({ style = {} }) {
    return (
        <View style={tailwind("flex-row flex-1")}>
            <Svg
                style={[{ width: 110, height: 64 }, style]}
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Venmo"
                role="img"
                viewBox="0 0 512 512"
            >
                <Rect width="512" height="512" rx="15%" fill="#3396cd" />
                <Path
                    d="m381.4 105.3c11 18.1 15.9 36.7 15.9 60.3 0 75.1-64.1 172.7-116.2 241.2h-118.8l-47.6-285 104.1-9.9 25.3 202.8c23.5-38.4 52.6-98.7 52.6-139.7 0-22.5-3.9-37.8-9.9-50.4z"
                    fill="#fff"
                />
            </Svg>
            <VenmoText />
        </View>
    );
}
function VenmoText() {
    return (
        <SvgCssUri
            width="100%"
            height="50%"
            uri="https://cdn1.venmo.com/marketing/images/branding/downloads/venmo_logo_blue.svg"
        />
    );
}
