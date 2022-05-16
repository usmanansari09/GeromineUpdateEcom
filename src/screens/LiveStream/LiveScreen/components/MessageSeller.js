import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BottomSheet from "@/components/BottomSheet";
import { tailwind } from "@/common/tailwind";
import Input from "@/components/Input";
import { Avatar } from "react-native-elements";

/**
 *
 * @param {{show:boolean}} props
 */
export default function MessageSeller({ show, onClose }) {
    return (
        <View>
            <BottomSheet
                isVisible={show}
                onBackdropPress={onClose}
                onBackButtonPress={onClose}
                onSwipeComplete={onClose}
                backdropOpacity={0}
                containerStyle={tailwind("bg-black bg-opacity-80 pt-10")}
                propagateSwipe
            >
                <View style={[tailwind("px-4 mb-3"), { height: 300 }]}>
                    <FlatList
                        data={Array.from({ length: 15 })}
                        renderItem={({ item, index }) => (
                            <Bubble type="message" />
                        )}
                        keyExtractor={(item, index) => `${index}`}
                    />
                </View>
                <View
                    style={tailwind(
                        "flex-row  items-center border-t border-gray-500 px-5 pb-2"
                    )}
                >
                    <Icon
                        name="attach-outline"
                        size={32}
                        style={[tailwind("text-white z-10")]}
                    />
                    <Input
                        placeholder="Type a message..."
                        theme="white"
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
                            style={tailwind(
                                "text-lg text-brand-primary font-bold"
                            )}
                        >
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View>
    );
}
/**
 *
 * @param {{type:'message'|'reply'}} props
 */
function Bubble({ type }) {
    const bubblePosition =
        type === "message" ? tailwind("self-start") : tailwind("self-end");
    return (
        <View style={[bubblePosition, tailwind("flex-row mb-3 items-center")]}>
            {type === "message" && (
                <Avatar
                    rounded
                    source={{
                        uri:
                            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                    }}
                    containerStyle={tailwind("mr-3")}
                />
            )}

            <View
                style={tailwind(
                    "px-3 py-2 rounded-xl bg-gray-700 bg-opacity-70"
                )}
            >
                <View style={tailwind("flex-row items-center")}>
                    <Text style={tailwind("text-sm text-white font-bold")}>
                        Jon12345
                    </Text>
                    <View
                        style={tailwind(
                            "w-1 mx-1 h-1 bg-brand-primary rounded-full"
                        )}
                    />
                    <Text style={tailwind("text-sm text-white")}>0:22</Text>
                </View>
                <Text style={tailwind("text-sm text-white")}>
                    Hi Jane Smith!
                </Text>
            </View>
        </View>
    );
}
