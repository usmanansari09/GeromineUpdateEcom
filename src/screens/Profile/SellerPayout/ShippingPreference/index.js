import React from "react";
import { View, Text, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getColor, tailwind } from "@/common/tailwind";
import { Icon } from "react-native-elements";
import Input from "@/components/Input";
import Switch from "@/components/Switch";
import Button from "@/components/Button";
import Modal from "react-native-modal";
/**
 *
 * @param {{navigation:StackNavigationProp<any,any}} props
 * @returns
 */
export default function ShippingPreference({ navigation }) {
    return (
        <ScrollView contentContainerStyle={tailwind("p-6")}>
            <View
                style={tailwind(
                    "flex-row items-center bg-white rounded-lg p-4 mb-4"
                )}
            >
                <View style={tailwind("flex-1 ")}>
                    <Text style={tailwind("text-base text-black font-bold")}>
                        Steven Antin
                    </Text>
                    <Text
                        style={tailwind("text-base text-black w-2/3")}
                        numberOfLines={3}
                    >
                        2600 Marina Bay Dr E, Fort Lauterdale, FL 33312, United
                        States
                    </Text>
                </View>
                <Icon
                    type="ionicon"
                    name="chevron-forward"
                    onPress={() => {}}
                />
            </View>
            <View style={tailwind("bg-white rounded-lg p-4 mb-4")}>
                <Text style={tailwind("text-base text-black font-bold")}>
                    Package Size
                </Text>
                <View style={tailwind("mt-4")}>
                    <Field title="Weight(kg)*" />
                    <Field title="Width(cm)" />
                    <Field title="Length(cm)*" />
                    <Field title="Height(cm)*" />
                </View>
            </View>
            <View style={tailwind("bg-white rounded-lg p-4 mb-4")}>
                <Text
                    style={tailwind(
                        "text-sm text-black bg-gray-100 rounded-lg px-3 py-2 mb-4"
                    )}
                >
                    Please select the shipping option that you would like to
                    have your shop
                </Text>
                <Text style={tailwind("text-base text-black font-bold mb-4")}>
                    Shipping Fee
                </Text>
                <View style={tailwind("flex-row justify-between")}>
                    <View>
                        <Text>Buyer will pay for the shipping</Text>
                    </View>
                    <Switch />
                </View>
                <View style={tailwind("flex-row justify-between")}>
                    <View>
                        <Text>I will cover the shipping</Text>
                    </View>
                    <Switch />
                </View>
            </View>
            <Button title="Save" theme="primary" size="md" />
            <Modal isVisible={false}>
                <View style={tailwind("bg-white rounded-lg p-6")}>
                    <Text
                        style={tailwind(
                            "text-base text-black font-bold text-center mb-4"
                        )}
                    >
                        Shipping Information Saved!
                    </Text>
                    <Button title="Generate Label" theme="primary" size="md" />
                </View>
            </Modal>
        </ScrollView>
    );
}
function Field({ title = "" }) {
    return (
        <View style={tailwind("flex-row justify-between items-center mb-4 ")}>
            <Text style={tailwind("flex-1 text-base text-gray-400 font-light")}>
                {title}
            </Text>
            <Input
                placeholder="0"
                containerStyle={tailwind("flex-1")}
                clear
                theme="secondary"
                type="outline"
                inputStyle={tailwind("text-center")}
            />
        </View>
    );
}
