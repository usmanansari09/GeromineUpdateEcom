import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import AllVideos from "@/screens/Profile/MyVideos";
import SingleVideo from "@/screens/Profile/MyVideos/ViewVideo";
export default function UserVideosNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            detachInactiveScreens={false}
        >
            <Stack.Screen name="All Videos" component={AllVideos} />
            <Stack.Screen name="View Single Video" component={SingleVideo} />
        </Stack.Navigator>
    );
}
