import React, { useContext, useState } from "react";
import { View, Text, Image } from "react-native";

import Input from "@/components/Input";
import { tailwind } from "@/common/tailwind";
import Button from "@/components/Button";
import Banner from "@/assets/contact-banner.png";
import { useForm, Controller } from "react-hook-form";
import { Icon } from "react-native-elements";
import schema from "./contactShcema";
import { yupResolver } from "@hookform/resolvers/yup";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { useMutation, UseMutationOptions } from "react-query";
import API from "@/common/services/API";
import { AuthContext } from "@/common/contexts/AuthContext";
import Modal from "react-native-modal";
const useSendInquiry =
    /**
 * 
 * @param {UseMutationOptions} opts 
  
 */
    (opts) => {
        const { accessToken } = useContext(AuthContext);
        return useMutation(
            (inquiry) => API(accessToken).post("/contact", inquiry),
            { ...opts }
        );
    };
/**
 *
 * @param {{navigation:StackNavigationProp<any>}} props
 * @returns
 */
export default function ContactUs({ navigation }) {
    const { errors, handleSubmit, control } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const { mutate, data, isLoading, isSuccess, reset } = useSendInquiry({
        onMutate: () => {
            setErrorMessage(null);
        },
        onSuccess: (res) => {
            console.log(" contact us response; :>> ", res);
        },
        onError: (err) => {
            console.log("contact us error :>> ", err.response);
            setErrorMessage(err?.data?.error?.[0] || "Error Encountered");
        },
    });
    function submitInquiry(values) {
        if (isLoading) return;
        mutate(values);
    }
    return (
        <View style={tailwind("bg-black flex-1")}>
            <Image source={Banner} resizeMode={"contain"} />
            <Modal isVisible={isSuccess}>
                <View
                    style={tailwind(
                        "bg-white rounded-lg p-4 items-center justify-center"
                    )}
                >
                    <View>
                        <Text style={tailwind("text-black text-lg mb-4")}>
                            {data?.data?.message}
                        </Text>
                        <Button
                            title="Ok, got it"
                            size="sm"
                            theme="primary"
                            containerStyle={tailwind("mb-4")}
                            onPress={() => navigation.goBack()}
                        />
                        <Button
                            title="Contact again"
                            size="sm"
                            theme="white"
                            onPress={reset}
                        />
                    </View>
                </View>
            </Modal>
            <View style={tailwind("mt-10 px-6 flex-1 justify-between pb-10")}>
                {errorMessage ? (
                    <View style={tailwind("bg-red-500 rounded-lg p-3 mb-4")}>
                        <Text style={tailwind("text-white text-sm")}>
                            {errorMessage}
                        </Text>
                    </View>
                ) : null}

                <View>
                    <Controller
                        control={control}
                        name="name"
                        defaultValue="Geronimo User"
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                errorMessage={errors?.name?.message}
                                placeholder="Your Name*"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        defaultValue="temp@gmail.com"
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                errorMessage={errors?.email?.message}
                                placeholder="Your Email*"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="subject"
                        defaultValue="Sample Contact Test Subject"
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                errorMessage={errors?.subject?.message}
                                placeholder="Subject Line*"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="message"
                        defaultValue="Sample message for contact form"
                        render={({ onChange, onBlur, value }) => (
                            <Input
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                errorMessage={errors?.message?.message}
                                placeholder="I would like to talk about"
                            />
                        )}
                    />
                </View>
                <Button
                    title="Send"
                    theme={"primary"}
                    size="md"
                    loading={isLoading}
                    onPress={handleSubmit(submitInquiry)}
                />
                <TouchableOpacity
                    style={tailwind("flex-row items-center self-center")}
                    onPress={() => navigation.navigate("SupportCenter")}
                >
                    <Icon
                        type="ionicon"
                        name="chatbox-outline"
                        color="white"
                        size={32}
                    />
                    <Text
                        style={tailwind(
                            "text-white text-lg uppercase font-bold ml-4"
                        )}
                    >
                        Contact Live Support
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
