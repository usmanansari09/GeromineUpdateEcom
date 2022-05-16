import { tailwind } from "@/common/tailwind";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";

import Paypal from "@/common/icons/Paypal";
import Visa from "@/common/icons/Visa";
import MasterCard from "@/common/icons/MasterCard";
import Venmo from "@/common/icons/Venmo";
import Amex from "@/common/icons/AmericanExpress";
import DebitCard from "@/common/icons/DebitCard";
import ApplePay from "@/common/icons/ApplePay";
import GooglePay from "@/common/icons/GooglePay";
import Toast from "react-native-toast-message";

const paymentMethods = [
    {
        Component: ({ style }) => <Paypal style={style} />,
        name: "Paypal",
        style: tailwind("w-5 h-5 mr-1"),
    },
    {
        Component: ({ style }) => <Venmo style={style} />,
        name: "Venmo",
        style: tailwind("w-5 h-5 mr-1"),
    },
    {
        Component: ({ style }) => <Visa style={style} />,
        name: "Visa",
        style: tailwind("w-8 h-8"),
    },
    {
        Component: ({ style }) => <MasterCard style={style} />,
        name: "MasterCard",
        style: tailwind("w-6 h-6 mr-1"),
    },
    {
        Component: ({ style }) => <Amex style={style} />,
        name: "Amex",
        style: tailwind("w-6 h-6  mr-1"),
    },
    {
        Component: ({ style }) => <ApplePay style={style} />,
        name: "Apple Pay",
        style: tailwind("w-8 h-8  mr-1"),
    },
    {
        Component: ({ style }) => <GooglePay style={style} />,
        name: "Google Pay",
        style: tailwind("w-8 h-8"),
    },
];
const routeTo = {
    "chips/payment-info": "chips/payment-info/shipping-address",
};
export default function PaymentInfo({ navigation, route }) {
    return (
        <View style={tailwind("p-6 flex-1 bg-black")}>
            <TouchableOpacity
                onPress={() => navigation.navigate(routeTo[route?.name])}
                style={tailwind(
                    "flex-row justify-between items-center bg-white rounded-lg px-4 py-5"
                )}
            >
                <View style={tailwind("flex-row items-center")}>
                    <IonIcon
                        name="map"
                        size={32}
                        style={tailwind("text-black")}
                    />
                    <View style={tailwind("ml-2")}>
                        <Text
                            style={tailwind("text-black font-bold text-base")}
                        >
                            Shipping Address
                        </Text>
                        <Text style={tailwind("text-black text-xs")}>
                            Add your Address
                        </Text>
                    </View>
                </View>
                <IonIcon name="chevron-forward-outline" size={32} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    Toast.show({
                        type: "info",
                        text1: "No route yet",
                    });
                    // navigation.navigate("Cart_PaymentPlatforms")
                }}
                style={tailwind(
                    "flex-row justify-between items-center mt-4 bg-white rounded-lg px-4 py-5"
                )}
            >
                <View style={tailwind("flex-row items-center")}>
                    <IonIcon
                        name="card"
                        size={32}
                        style={tailwind("text-black")}
                    />
                    <View style={tailwind("ml-2")}>
                        <Text
                            style={tailwind("text-black font-bold text-base")}
                        >
                            Payment Type
                        </Text>
                        <View style={tailwind("flex-row items-center")}>
                            {paymentMethods.map((item, index) => {
                                const { Component: IconComponent } = item;
                                return (
                                    <IconComponent
                                        style={item.style}
                                        key={index}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </View>
                <IonIcon name="chevron-forward-outline" size={32} />
            </TouchableOpacity>
        </View>
    );
}
