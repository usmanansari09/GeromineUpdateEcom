import { tailwind } from "@/common/tailwind";
import Input from "@/components/Input";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any,any}} props
 */
export default function BankAccounts({ route, navigation }) {
    return (
        <View style={tailwind("flex-1 bg-gray-100 p-6")}>
            <View>
                <Text
                    style={tailwind(
                        "text-lg text-black font-bold text-center mb-4"
                    )}
                >
                    Select your Bank
                </Text>
                <Input placeholder="Search" theme="secondary" mode="search" />
            </View>
            <View style={tailwind("items-center justify-center flex-1")}>
                <Text style={tailwind("text-black text-lg")}>
                    Await API Endpoint
                </Text>
                <Pressable
                    onPress={() => navigation.navigate("bank-accounts/bank")}
                >
                    <Text>Hello</Text>
                </Pressable>
            </View>
        </View>
    );
}
