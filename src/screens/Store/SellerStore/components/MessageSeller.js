import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import BottomSheet from "@/components/BottomSheet";
import { getColor, tailwind } from "@/common/tailwind";
import Input from "@/components/Input";

/**
 *
 * @param {{show:boolean}} props
 */
export default function MessageSeller({ show, onClose }) {
    return (
        <BottomSheet
            isVisible={show}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            onSwipeComplete={onClose}
            backdropOpacity={0}
            containerStyle={tailwind("bg-black bg-opacity-80 pt-10")}
            propagateSwipe
        >
            <View style={[tailwind("px-4 mb-3"), { height: 300 }]}></View>
            <View
                style={tailwind(
                    "flex-row  items-center border-t border-gray-500 px-5 pb-2"
                )}
            >
                <View
                    style={{
                        transform: [{ rotateY: "45deg" }],
                    }}
                >
                    <Icon
                        type="ionicon"
                        name="attach-outline"
                        size={32}
                        color={getColor("white")}
                    />
                </View>
                <Input
                    placeholder="Type a message..."
                    placeholderTextColor="white"
                    size="sm"
                    containerStyle={{
                        ...tailwind("self-center flex-1 mb-0 ml-3"),
                    }}
                    inputStyle={{
                        ...tailwind("border-0 bg-transparent text-white"),
                    }}
                    inputContainerStyle={tailwind("border-0")}
                />
                <TouchableOpacity style={tailwind("")}>
                    <Text
                        style={tailwind("text-lg text-brand-primary font-bold")}
                    >
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
        </BottomSheet>
    );
}
