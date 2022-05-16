import { tailwind } from "@/common/tailwind";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { StackNavigationProp } from "@react-navigation/stack";
import Input from "@/components/Input";
import SupportChatIcon from "@/common/icons/SupportChat";
/**
 *
 * @param {{navigation:StackNavigationProp<any>}} props
 * @returns
 */
export default function SupportCenter({ navigation }) {
    const [expandedItem, setExpandedItem] = useState(-1);
    useEffect(() => {
        console.log("expandedItem :>> ", expandedItem);
    }, [expandedItem]);
    return (
        <View style={tailwind("flex-1 bg-gray-100")}>
            <View style={tailwind("p-6")}>
                <Input
                    theme="white"
                    rightIcon={{
                        name: "search",
                        size: 24,
                        type: "ionicon",
                        color: "black",
                    }}
                    inputContainerStyle={tailwind(
                        "border-0 bg-white px-4 rounded-lg"
                    )}
                    inputStyle={tailwind("bg-white")}
                    placeholder="Search for questions"
                    size="sm"
                />
                <View>
                    <Text style={tailwind("text-black font-bold text-lg mb-3")}>
                        Frequently Asked Questions
                    </Text>
                    <FlatList
                        data={Array.from({ length: 12 })}
                        renderItem={({ index }) => (
                            <Question
                                style={index >= 0 && tailwind("mb-4")}
                                isExpanded={expandedItem == index}
                                onPress={() => {
                                    if (expandedItem == index)
                                        setExpandedItem(-1);
                                    else setExpandedItem(index);
                                }}
                            />
                        )}
                        keyExtractor={(_, index) => `${index}`}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
            <View style={tailwind("absolute bottom-0 right-0 p-4")}>
                <TouchableOpacity
                    style={[
                        tailwind(
                            "bg-brand-primary p-1 rounded-full w-16 h-16 items-center justify-center flex-shrink-0"
                        ),
                        { elevation: 5 },
                    ]}
                    onPress={() => navigation.navigate("SupportCenterChat")}
                >
                    {/* <Icon
                        type="ionicon"
                        name="chatbox"
                        size={32}
                        color="white"
                    /> */}
                    <SupportChatIcon />
                    <Text
                        style={[
                            tailwind(" text-white font-bold"),
                            { fontSize: 9 },
                        ]}
                    >
                        Live Chat
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
function Question({ isExpanded = false, onPress, style }) {
    return (
        <View style={[tailwind("bg-white rounded-lg p-3"), style || {}]}>
            <View style={tailwind("flex-row items-center justify-between")}>
                <Text style={tailwind("text-black font-bold text-sm ")}>
                    Lorem ipsum dolor
                </Text>
                <Icon
                    onPress={onPress}
                    type="ionicon"
                    name="chevron-down-outline"
                    color="black"
                    size={20}
                    containerStyle={tailwind("rounded-full")}
                    style={isExpanded && { transform: [{ rotate: "180deg" }] }}
                />
            </View>
            {isExpanded && (
                <Text style={tailwind(" text-gray-400")}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    sapiente suscipit ducimus alias dolorum possimus dignissimos
                    accusamus natus cupiditate quis? Vel at provident ad libero
                    sunt, saepe repellendus magnam illum.
                </Text>
            )}
        </View>
    );
}
