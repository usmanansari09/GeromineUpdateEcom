import React from "react";
import { View, ViewStyle } from "react-native";
import Svg, { Path, G, Defs, LinearGradient, Stop } from "react-native-svg";

/**
 *
 * @param {{style:ViewStyle}} props
 */
export default function Visa({ style = {} }) {
    return (
        <Svg
            style={[{ width: 110, height: 64 }, style]}
            viewBox="0 0 110 64"
            version="1.1"
        >
            <Defs>
                <LinearGradient
                    x1="-1.64477485e-15%"
                    y1="50.0001434%"
                    x2="100%"
                    y2="50.0001434%"
                    id="linearGradient-1"
                >
                    <Stop stop-color="#231E5D" offset="0%"></Stop>
                    <Stop stop-color="#074EA2" offset="100%"></Stop>
                </LinearGradient>
            </Defs>
            <G
                id="Creditcards"
                stroke="none"
                stroke-width="1"
                fill="currentColor"
                fill-rule="evenodd"
            >
                <G id="visa" fill="currentColor">
                    <G transform="translate(5.000000, 16.000000)" id="Shape">
                        <G>
                            <Path d="M50.0085602,0.695828571 L43.2597963,32.5026429 L35.0975,32.5026429 L41.8486019,0.695828571 L50.0085602,0.695828571 L50.0085602,0.695828571 Z M84.3448194,21.2331429 L88.6410602,9.29044286 L91.1141574,21.2331429 L84.3448194,21.2331429 L84.3448194,21.2331429 Z M93.4516528,32.5026429 L101,32.5026429 L94.4111528,0.695828571 L87.4454259,0.695828571 C85.8785231,0.695828571 84.5575741,1.6137 83.971213,3.02845714 L71.7254306,32.5026429 L80.2931296,32.5026429 L81.9956343,27.7511143 L92.4655,27.7511143 L93.4516528,32.5026429 Z M72.149537,22.1175429 C72.1860093,13.7237571 60.6360046,13.2598714 60.715963,9.50965714 C60.7407454,8.36927143 61.8185463,7.15675714 64.1775509,6.84608571 C65.3451296,6.6924 68.5701157,6.57312857 72.2234167,8.26838571 L73.6575231,1.5246 C71.6922315,0.8052 69.1667639,0.114085714 66.0217361,0.114085714 C57.9557639,0.114085714 52.2773194,4.43802857 52.231963,10.6278857 C52.1781898,15.2087571 56.2841204,17.7615429 59.377713,19.2847286 C62.5559398,20.8432714 63.6220509,21.8436429 63.6103611,23.2371857 C63.5865139,25.3722857 61.0741389,26.3132571 58.7254213,26.3505 C54.6222963,26.4146143 52.2408472,25.2322714 50.3433565,24.3408 L48.8657639,31.3108714 C50.7707361,32.1929143 54.2907731,32.9622857 57.9412685,33 C66.5155139,33 72.1228843,28.7316857 72.149537,22.1175429 L72.149537,22.1175429 Z M38.3463333,0.695828571 L25.12375,32.5026429 L16.4971343,32.5026429 L9.98964815,7.11857143 C9.59453241,5.55578571 9.25225463,4.98205714 8.05100926,4.32488571 C6.08899074,3.2505 2.84950926,2.24352857 0,1.61841429 L0.192180556,0.695828571 L14.0796806,0.695828571 C15.8490509,0.695828571 17.4412037,1.88241429 17.8433333,3.93831429 L21.2801389,22.3447714 L29.7739583,0.695828571 L38.3463333,0.695828571 L38.3463333,0.695828571 Z"></Path>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    );
}
