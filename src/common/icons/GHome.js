import React from "react";
import { View, ViewStyle } from "react-native";
import Svg, { Image, Path } from "react-native-svg";

/**
 *
 * @param {{style:ViewStyle}} props
 */
export default function Camera({ style }) {
    return (
        <View style={{ ...style }}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                width="87.803"
                height="79.659"
                viewBox="0 0 87.803 79.659"
            >
                <Path
                    id="Icon_metro-home"
                    data-name="Icon metro-home"
                    d="M90.374,50.833l-43.9-34.077L2.571,50.833V36.939l43.9-34.077,43.9,34.078ZM79.4,49.594V82.52H57.448V60.57H35.5V82.52H13.546V49.594L46.472,24.9Z"
                    transform="translate(-2.571 -2.861)"
                />
                <Image
                    id="Image_24"
                    data-name="Image 24"
                    width="10"
                    height="18"
                    transform="translate(38.543 32.637)"
                />
            </Svg>
        </View>
    );
}
