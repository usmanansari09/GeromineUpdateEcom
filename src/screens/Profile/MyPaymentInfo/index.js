import { getColor, tailwind } from "@/common/tailwind";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import VisaLogo from "@/common/icons/Visa";
import Venmo from "@/common/icons/Venmo";
export default function PaymentInfo({ route }) {
    return (
        <ScrollView
            contentContainerStyle={tailwind("p-6 bg-gray-100")}
            style={tailwind("flex-1 ")}
        >
            <InfoCard IsSelected={false} />
            <InfoCard />
            <OtherPaymentOptions />
        </ScrollView>
    );
}
function OtherPaymentOptions() {
    return (
        <TouchableOpacity
            style={tailwind("bg-red-400 rounded-xl py-4 px-6 mb-4 h-40")}
        >
            <View style={tailwind("flex-row justify-between")}>
                <Text style={tailwind("text-black text-sm")}>
                    Other Payment
                </Text>
            </View>
            <View style={tailwind(" flex-1")}>
                <Venmo />
            </View>
        </TouchableOpacity>
    );
}
function InfoCard({ IsSelected = true }) {
    return (
        <TouchableOpacity
            style={tailwind("bg-black rounded-xl py-4 px-6 mb-4")}
        >
            <View style={tailwind("flex-row justify-between items-center")}>
                <VisaLogo style={tailwind("text-white w-16 h-10")} />
                {IsSelected && (
                    <Icon
                        type="ionicon"
                        name="checkmark-circle-outline"
                        size={24}
                        color={getColor("brand-primary")}
                        containerStyle={tailwind("absolute right-0 top-0 ")}
                    />
                )}
            </View>
            <View
                style={tailwind("flex-row mt-8 items-center justify-between")}
            >
                {/* Dots */}
                {Array.from({ length: 3 }, (_, rootIndex) => (
                    <View style={tailwind("flex-row")} key={rootIndex}>
                        {Array.from({ length: 4 }, (_, index) => (
                            <View
                                key={index}
                                style={[
                                    tailwind(
                                        "h-3 w-3 rounded-full flex-shrink-0 bg-white"
                                    ),
                                    index > 0 ? tailwind("ml-1") : {},
                                ]}
                            />
                        ))}
                    </View>
                ))}

                <Text style={tailwind("text-white text-base")}>1234</Text>
            </View>
            <View style={tailwind("flex-row justify-between mt-6")}>
                <Text style={tailwind("text-white text-sm")}>
                    Valid Thru 12/21
                </Text>
                <Text style={tailwind("text-gray-200 text-sm")}>
                    Debit Card
                </Text>
            </View>
        </TouchableOpacity>
    );
}
