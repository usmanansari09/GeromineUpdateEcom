import { tailwind } from "@/common/tailwind";
import React, { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "@/components/StackHeader";

import Paypal from "@/common/icons/Paypal";
import Visa from "@/common/icons/Visa";
import MasterCard from "@/common/icons/MasterCard";
import Venmo from "@/common/icons/Venmo";
import Amex from "@/common/icons/AmericanExpress";
import DebitCard from "@/common/icons/DebitCard";
import ApplePay from "@/common/icons/ApplePay";
import GooglePay from "@/common/icons/GooglePay";

const paymentMethods = [
    {
        Component: ({ style }) => <Visa style={style} />,
        name: "Visa",
        style: tailwind("w-20 h-10"),
    },
    {
        Component: ({ style }) => <MasterCard style={style} />,
        name: "MasterCard",
        style: tailwind("w-20 h-10"),
    },
    {
        Component: ({ style }) => <Amex style={style} />,
        name: "Amex",
        style: tailwind("w-20 h-10"),
    },
    {
        Component: ({ style }) => (
            <View>
                <ApplePay style={{ width: 80, height: 25 }} />
                <GooglePay style={{ width: 80, height: 25 }} />
            </View>
        ),
        name: "Apple Pay/Google Pay",
        style: tailwind("w-20 h-10"),
    },
    {
        Component: ({ style }) => <DebitCard style={style} />,
        name: "Debit Card",
        style: tailwind("w-20 h-10"),
    },
    {
        Component: ({ style }) => <Venmo style={style} />,
        name: "Venmo",
        style: tailwind("w-20 h-10"),
    },
    {
        Component: ({ style }) => <Paypal style={style} />,
        name: "Paypal",
        style: tailwind("w-20 h-10"),
    },
];
/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any>}} props
 */
export default function PaymentPlatforms({ navigation, route }) {
    const [selected, setSelected] = useState(null);
    useLayoutEffect(() => {
        navigation.setOptions({
            header: (props) => <Header {...props} />,
            headerTitleStyle: tailwind("text-center flex-1"),
        });
    }, [navigation]);

    return (
        <ScrollView
            style={tailwind("flex-1 bg-black")}
            contentContainerStyle={tailwind("p-6 ")}
        >
            {paymentMethods.map((item, index) => {
                const { Component: PaymentIcon } = item;
                return (
                    <TouchableOpacity
                        onPress={() => setSelected(index)}
                        key={index}
                        style={tailwind(
                            "flex-row justify-between items-center mt-4 bg-white rounded-lg py-3 px-4"
                        )}
                    >
                        {selected === index && (
                            <Icon
                                name="checkmark-circle"
                                size={32}
                                style={tailwind("text-brand-primary mr-2")}
                            />
                        )}
                        <View
                            style={tailwind(
                                "flex-row flex-1 justify-between items-center"
                            )}
                        >
                            <Text
                                style={tailwind(
                                    "text-black font-bold text-base"
                                )}
                            >
                                {item.name}
                            </Text>
                            <PaymentIcon style={item.style} />
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}
