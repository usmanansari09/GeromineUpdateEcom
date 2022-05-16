import { tailwind } from "@/common/tailwind";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "react-native-elements";

const CHIP_SPECS = [
    {
        title: "Compatibility",
        description:
            "Supported ios 7.0+,android 4.3+, apple iBeacon standard,bluetooth 5.0 (BLE) devices",
    },
    {
        title: "Battery Lifetime",
        description: "12 months, real time battery level notification",
    },
    {
        title: "OTA and J-Link",
        description:
            "Supported OTA, reserved, and J-Link port on the board for programming",
    },
    {
        title: "Configurable Parameters",
        description:
            "UUID, major, minor, device name, password etc., special configuration APP",
    },
    {
        title: "Transmission Power Levels",
        description: "8 adjustable levels, range from O to 7",
    },
    {
        title: "Operation Voltage",
        description: "1.8-3.6V",
    },
    {
        title: "Transmission Circuit",
        description: "10.5mA (Max.)",
    },
    {
        title: "Antenna",
        description: "50ohm, on board/PCB Antenna",
    },
    {
        title: "Accessories",
        description: "None",
    },
    {
        title: "Net Weight",
        description: "7.0g, with battery",
    },
    {
        title: "Size",
        description: "Ø 35 x 8.2 mm",
    },
];
export default function ChipDetails({ route }) {
    return (
        <ScrollView
            contentContainerStyle={tailwind("p-6  ")}
            style={tailwind(" bg-gray-100 flex-1")}
        >
            <View>
                <Text
                    style={tailwind(
                        "text-center text-black font-bold uppercase text-lg"
                    )}
                >
                    Geronimo!
                </Text>
                <Text
                    style={tailwind(
                        "text-center text-black font-bold uppercase text-lg"
                    )}
                >
                    5.0 Bluetooth Enabled Chip
                </Text>
            </View>

            <View
                style={tailwind("flex-row bg-white rounded-lg py-4 px-3 mb-4")}
            >
                <Text style={[tailwind("text-black"), { width: "28%" }]}>
                    Features
                </Text>
                <View style={tailwind("border-l mx-2 border-black")} />
                <Text style={tailwind("flex-1 text-black")}>
                    Programmed MiniBeacon standard firmware included 1pc CR2025
                    coin battery The max, 90 meters advertising distance
                    Ultra-low power consumption chipset nRF52 series with ARM
                    core.
                </Text>
            </View>
            <View
                style={tailwind("flex-row bg-white rounded-lg py-4 px-3 mb-4")}
            >
                <Text style={[tailwind("text-black "), { width: "29%" }]}>
                    Specification
                </Text>
                <View style={tailwind("border-l mx-2 border-black")} />
                <View style={tailwind("flex-1")}>
                    {CHIP_SPECS.map((b, i) => (
                        <InfoBlock
                            key={i}
                            title={b.title}
                            description={b.description}
                        />
                    ))}
                </View>
            </View>
            <View style={tailwind("flex-row bg-white rounded-lg py-4 px-3")}>
                <Text style={[tailwind("text-black "), { width: "29%" }]}>
                    Product Display
                </Text>
                <View style={tailwind("border-l mx-2 border-black")} />
                <View style={tailwind("flex-1")}>
                    <Image
                        source={require("@/assets/gero-3d.png")}
                        resizeMode="contain"
                        style={tailwind("w-full h-20 flex-grow-0 ")}
                    />
                </View>
            </View>
        </ScrollView>
    );
}
function InfoBlock({ title, description }) {
    return (
        <View style={tailwind("flex-row mb-2")}>
            <Text style={tailwind("text-black w-2/5 text-xs")}>{title}</Text>
            <Text style={tailwind("flex-1 text-black ml-1 text-xs")}>
                {description}
            </Text>
        </View>
    );
}
