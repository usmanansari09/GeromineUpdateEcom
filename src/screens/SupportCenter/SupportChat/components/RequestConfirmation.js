import { tailwind } from "@/common/tailwind";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import BottomSheet from "@/components/BottomSheet";
import Button from "@/components/Button";
export default function RequestConfirmation({
    show: showConfirmation = false,
    onFeedbackConfirmed = () => {},
    onFeedBackDenied = () => {},
}) {
    const [show, setShow] = useState(show);
    useEffect(() => {
        console.log("showConfirmation :>> ", showConfirmation);
        setShow(showConfirmation);
    }, [showConfirmation]);
    return (
        <View>
            <BottomSheet animationOut="slideOutDown" isVisible={show}>
                <View style={tailwind("rounded-t-xl bg-white p-4")}>
                    <View
                        style={tailwind(
                            "h-1 bg-gray-300 rounded-full w-1/5 self-center"
                        )}
                    />
                    <Text
                        style={tailwind(
                            "text-lg text-black font-bold text-center"
                        )}
                    >
                        Has your issue been resolved?
                    </Text>
                    <View style={tailwind("flex-row mt-4")}>
                        <Button
                            onPress={onFeedBackDenied}
                            title="Not yet"
                            theme="primary"
                            size="sm"
                            containerStyle={tailwind("flex-1  mr-3")}
                        />
                        <Button
                            onPress={onFeedbackConfirmed}
                            title="Yes"
                            theme="primary"
                            size="sm"
                            containerStyle={tailwind("flex-1 ")}
                        />
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}
