import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { tailwind } from "@/common/tailwind";
import Icon from "react-native-vector-icons/Ionicons";

import Modal from "react-native-modal";
import Button from "@/components/Button";

const MENU_ITEMS = [
    {
        title: "Dashboard",
        route: "Seller Dashboard",
        requiresAuth: true,
    },
    {
        title: "My Profile",
        route: "Seller Profile",
        requiresAuth: true,
    },
    {
        title: "My Messages",
        route: "Seller Messages",
        requiresAuth: true,
    },
    {
        title: "How it Works",
        route: "Seller HowItWorks",
        requiresAuth: false,
    },
    {
        title: "Contact Us",
        route: "Seller ContactUs",
        requiresAuth: true,
    },
    {
        title: "Sign In",
        route: "Seller Login",
        requiresAuth: false,
    },
    {
        title: "Register",
        route: "Seller Register",
        requiresAuth: false,
    },
    {
        title: "Logout",
        route: "Account Logout",
        requiresAuth: true,
    },
];

export default function Header({ scene, previous, navigation }) {
    const { options } = scene.descriptor;
    const title =
        options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
            ? options.title
            : scene.route.name;
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <View
            style={tailwind(
                "bg-black py-4 px-3 flex-row justify-between items-center "
            )}
        >
            <View style={tailwind("flex-row items-center")}>
                <TouchableOpacity onPress={() => setMenuOpen((prev) => !prev)}>
                    <Icon
                        name="menu-outline"
                        style={tailwind("text-white text-4xl")}
                    />
                </TouchableOpacity>
                <Menu show={menuOpen} onClose={() => setMenuOpen(false)} />
                <Text
                    style={tailwind("text-white text-2xl uppercase font-bold")}
                >
                    {title}
                </Text>
            </View>
            <View style={tailwind("flex-row items-center")}>
                <TouchableOpacity
                    style={tailwind(
                        "border border-brand-primary rounded-lg p-1"
                    )}
                >
                    <Text
                        style={{
                            ...tailwind(
                                "text-base leading-4 text-brand-primary text-center uppercase font-bold"
                            ),
                        }}
                    >
                        Buy
                    </Text>
                    <Text
                        style={tailwind(
                            "text-base leading-4 text-brand-primary text-center uppercase font-bold"
                        )}
                    >
                        Chips
                    </Text>
                </TouchableOpacity>
                <View style={tailwind("flex-row")}>
                    <Icon
                        onPress={() => {}}
                        name="cart-outline"
                        style={tailwind("text-brand-primary ml-2 text-3xl")}
                    />
                    <Icon
                        name="search-outline"
                        style={tailwind("text-brand-primary ml-2 text-3xl")}
                    />
                </View>
            </View>
        </View>
    );
}
/**
 *
 * @param {{isLoggedIn:Boolean,show:Boolean,onClose:Function}} props
 */
function Menu({ isLoggedIn = true, show = false, onClose }) {
    return (
        <Modal
            isVisible={show}
            onBackdropPress={onClose}
            style={tailwind("m-0")}
            onBackButtonPress={onClose}
        >
            <View style={tailwind("flex-1 bg-black px-5 py-12")}>
                <Icon
                    onPress={onClose}
                    name="close-outline"
                    style={tailwind("text-white text-4xl")}
                />
                <View style={tailwind("justify-between flex-1")}>
                    <View>
                        {MENU_ITEMS.filter((item) => {
                            return isLoggedIn ? true : !item.requiresAuth;
                        }).map((item, index) => (
                            <TouchableOpacity
                                onPress={() => console.log("hey")}
                                key={index}
                            >
                                <Text
                                    style={{
                                        ...tailwind(
                                            "text-white text-3xl uppercase font-bold text-center py-1"
                                        ),
                                    }}
                                >
                                    {item.title}
                                </Text>
                                <View
                                    style={tailwind("border-b border-gray-700")}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Button
                        title={"Start Stream"}
                        theme="primary"
                        size="md"
                        titleStyle={tailwind("normal-case")}
                        containerStyle={tailwind("mt-8")}
                    />
                    <View>
                        <TouchableOpacity onPress={() => {}}>
                            <Text
                                style={tailwind(
                                    "text-white text-lg text-center"
                                )}
                            >
                                Privacy Policy
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}}>
                            <Text
                                style={tailwind(
                                    "text-white text-lg text-center"
                                )}
                            >
                                Terms and Conditions
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
