import { tailwind } from "@/common/tailwind";
import Input from "@/components/Input";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Image } from "react-native-elements";
import Button from "@/components/Button";

export default function SearchProduct({ navigation }) {
    return (
        <View style={tailwind("p-6 flex-1 bg-black")}>
            <Icon
                onPress={navigation.goBack}
                name="close-outline"
                size={40}
                style={tailwind("text-white self-end")}
            />
            <Text style={tailwind("  text-white text-2xl text-center mt-5")}>
                Your item has been found and is available for you to sell
            </Text>
            <View
                style={tailwind("flex-row justify-between items-center mt-5")}
            >
                <Text
                    style={tailwind(
                        "text-2xl text-white uppercase w-1/2 font-bold"
                    )}
                >
                    Gucci Mens T-shirt
                </Text>
                <Image
                    source={require("@/assets/gucci-shirt.png")}
                    style={tailwind("w-20 h-20")}
                    resizeMode="contain"
                    containerStyle={tailwind(
                        "bg-white w-20 h-20 rounded-lg overflow-hidden"
                    )}
                />
            </View>
            <View style={tailwind("mt-8")}>
                <Text style={tailwind("text-base text-white")}>
                    GUCCI MENS T-SHIRT
                </Text>
                <Text style={tailwind("text-base text-white")}>
                    100% cotton
                </Text>
                <Text style={tailwind("text-base text-white")}>
                    Sizes: XS-XXXL
                </Text>
                <Text style={tailwind("text-base text-white")}>
                    Made in Italy Price: $49.95
                </Text>
            </View>
            <Button
                theme="primary"
                size="md"
                title="Download to my store"
                containerStyle={tailwind("mt-8")}
            />
        </View>
    );
}
