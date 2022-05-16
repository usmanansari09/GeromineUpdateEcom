import React, { useLayoutEffect } from "react";
import { View, ImageBackground, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import WelcomeImage from "@/assets/Welcome-Screen.png";
import { tailwind } from "@/common/tailwind";
const { height, width } = Dimensions.get("screen");

/**
 *
 * @param {{route:RouteProp<,'Welcome'>,navigation:StackNavigationProp<,'Welcome'>}} props
 */
export default function Welcome({ route, navigation }) {
  // useLayoutEffect(() => {
  //     setTimeout(() => {
  //         navigation.navigate("HomeScreen");
  //     }, 2000);
  // }, [navigation]);
  return (
    <View>
      <ImageBackground
    source={WelcomeImage}
    style={{
        height: height,
        width: width,
        resizeMode: "cover",
        ...tailwind("justify-center"),
    }}
    />
    </View>
  );
}
