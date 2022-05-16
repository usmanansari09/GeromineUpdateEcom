import { tailwind } from "@/common/tailwind";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import Paypal from "@/common/icons/Paypal";

export default function SellerPayout({ navigation }) {
    return (
        <View style={tailwind("p-6 flex-1 bg-black")}>
            <TouchableOpacity
                onPress={() => navigation.navigate("ShippingAddress")}
                style={tailwind(
                    "flex-row justify-between items-center bg-white rounded-lg px-4 py-5"
                )}
            >
                <View style={tailwind("flex-row items-center")}>
                    <Paypal style={{ width: 32, height: 32 }} />
                    <View style={tailwind("ml-2")}>
                        <Text
                            style={tailwind("text-black font-bold text-base")}
                        >
                            Enter Paypal
                        </Text>
                        <Text style={tailwind("text-black text-xs")}>
                            Account Info
                        </Text>
                    </View>
                </View>
                <IonIcon name="chevron-forward-outline" size={32} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("bank-accounts")}
                style={tailwind(
                    "flex-row justify-between items-center mt-4 bg-white rounded-lg px-4 py-5"
                )}
            >
                <View style={tailwind("flex-row items-center")}>
                    <Icon
                        name="university"
                        type="font-awesome"
                        size={32}
                        style={tailwind("text-black")}
                    />
                    <View style={tailwind("ml-2")}>
                        <Text
                            style={tailwind("text-black font-bold text-base")}
                        >
                            Enter Bank Account
                        </Text>
                        <Text style={tailwind("text-black text-xs")}>
                            Account Info
                        </Text>
                    </View>
                </View>
                <IonIcon name="chevron-forward-outline" size={32} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("ShippingAddress")}
                style={tailwind(
                    "flex-row justify-between items-center mt-4 bg-white rounded-lg px-4 py-5"
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
                            Shipping
                        </Text>
                        <Text style={tailwind("text-black text-xs")}>
                            Add Seller Address
                        </Text>
                    </View>
                </View>
                <IonIcon name="chevron-forward-outline" size={32} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("shipping-preference")}
                style={tailwind(
                    "flex-row justify-between items-center mt-4 bg-white rounded-lg px-4 py-5"
                )}
            >
                <View style={tailwind("flex-row items-center")}>
                    <Icon
                        name="list"
                        type="font-awesome"
                        size={32}
                        style={tailwind("text-black")}
                    />
                    <View style={tailwind("ml-2")}>
                        <Text
                            style={tailwind("text-black font-bold text-base")}
                        >
                            Shipping
                        </Text>
                        <Text style={tailwind("text-black text-xs")}>
                            Choose Shopping Preference
                        </Text>
                    </View>
                </View>
                <IonIcon name="chevron-forward-outline" size={32} />
            </TouchableOpacity>
        </View>
    );
}
