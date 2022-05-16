import { tailwind, getColor } from "@/common/tailwind";
import format from "date-fns/format";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Avatar, Image, Icon } from "react-native-elements";
import { MessageResponse, Attachment } from "stream-chat";
import { AppContext } from "@/common/contexts/AppContext";
import GeroChip from "@/assets/gero-chip.png";
const themeStyle = {
    primary: {
        user: tailwind("text-brand-primary"),
        time: tailwind("text-brand-primary"),
        message: tailwind("text-brand-primary"),
        background: tailwind("bg-brand-primary bg-opacity-20"),
    },
    secondary: {
        user: tailwind("text-white"),
        time: tailwind("text-gray-200"),
        message: tailwind("text-white"),
        background: tailwind("bg-gray-500"),
    },
    tertiary: {
        user: tailwind("text-white"),
        time: tailwind("text-gray-200"),
        message: tailwind("text-white"),
        background: tailwind("bg-gray-700"),
    },
};
/**
 *
 * @param {{type:'message'|'reply',replyTheme:"primary"|"secondary"|"tertiary",messageTheme:"primary"|"secondary"|"tertiary",message:MessageResponse,sameSender:Boolean}} props
 */
export default function Bubble({
    type,
    replyTheme = "primary",
    messageTheme = "primary",
    message,
    sameSender = false,
}) {
    const { StreamChatClient } = useContext(AppContext);
    const messageType =
        StreamChatClient.userID === message.user.id ? "message" : "reply";
    const bubblePosition =
        messageType === "reply" ? tailwind("self-start") : tailwind("self-end");
    const selectedTheme =
        messageType === "message"
            ? themeStyle[messageTheme]
            : themeStyle[replyTheme];

    return (
        <View
            style={[
                bubblePosition,
                tailwind("w-full"),
                !sameSender ? tailwind("mb-3") : tailwind("mb-1"),
                // { width: "50%" },
            ]}
        >
            <View style={[bubblePosition, tailwind("flex-row ")]}>
                {/* {message.status == "sending" && (
                    <ActivityIndicator
                        size="small"
                        color={getColor("brand-primary")}
                        style={tailwind("self-end mr-2")}
                    />
                )} */}
                <View
                    style={[
                        tailwind("flex-row "),
                        { maxWidth: "75%", width: "100%" },
                    ]}
                >
                    {messageType === "reply" && !sameSender && (
                        <Avatar
                            rounded
                            source={
                                message?.user?.image
                                    ? {
                                          uri: message?.user?.image,
                                      }
                                    : GeroChip
                            }
                            containerStyle={tailwind("mr-1 self-end")}
                        />
                    )}
                    {messageType === "reply" && sameSender && (
                        <View style={tailwind("mr-9")} />
                    )}

                    <View
                        style={[
                            tailwind("px-3 py-2 rounded-xl flex-1"),
                            selectedTheme.background,
                        ]}
                    >
                        <View style={tailwind("flex-row items-center")}>
                            <Text
                                style={[
                                    tailwind("text-sm font-bold"),
                                    selectedTheme.user,
                                ]}
                            >
                                {message.user.name}
                            </Text>
                            <View
                                style={tailwind(
                                    "w-1 mx-1 h-1 bg-brand-primary rounded-full"
                                )}
                            />
                            <Text
                                style={[
                                    tailwind("text-sm"),
                                    selectedTheme.time,
                                ]}
                            >
                                {format(new Date(message.created_at), "p")}
                            </Text>
                        </View>
                        {message.attachments.length !== 0 && (
                            <FileMessageAttachment
                                attachements={message.attachments}
                            />
                        )}
                        {message.text.length !== 0 && (
                            <Text
                                style={[
                                    tailwind("text-sm"),
                                    selectedTheme.message,
                                ]}
                            >
                                {message.text}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

/**
 *
 * @param {{attachements:Attachment[]}} props
 * @returns
 */
function FileMessageAttachment({ attachements }) {
    const file = attachements[0];

    const IMAGE_MAX_SIZE = 240;
    const DEFAULT_IMAGE_WIDTH = 240;
    const DEFAULT_IMAGE_HEIGHT = 160;
    const [width, setWidth] = useState(DEFAULT_IMAGE_WIDTH);
    const [height, setHeight] = useState(DEFAULT_IMAGE_HEIGHT);
    useEffect(() => {
        if (!file.image_url) return;
        Image.getSize(file.image_url, (measureWidth, measureHeight) => {
            const scaleWidth = IMAGE_MAX_SIZE / measureWidth;
            const scaleHeight = IMAGE_MAX_SIZE / measureHeight;
            const scale = Math.min(
                scaleWidth <= scaleHeight ? scaleWidth : scaleHeight,
                1
            );
            setWidth(measureWidth * scale);
            setHeight(measureHeight * scale);
        });
    }, [file]);
    return (
        <View>
            {file.image_url ? (
                <Image
                    source={{ uri: file.image_url }}
                    
                    style={{ ...tailwind("rounded-lg"), width, height }}
                />
            ) : (
                <View style={tailwind("flex-row items-center")}>
                    <Icon
                        name="image"
                        type="ionicons"
                        color={getColor("white")}
                    />
                    <Text style={tailwind("text-white")}>
                        Sending Attachemnt
                    </Text>
                </View>
            )}
        </View>
    );
}
