import React, { useContext, useEffect, useMemo } from "react";
import { tailwind } from "@/common/tailwind";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
    ChannelList,
    Chat,
    ChannelPreviewMessengerProps,
    DeepPartial,
    Theme,
    useChannelsContext,
} from "stream-chat-react-native";
import { AppContext } from "@/common/contexts/AppContext";
import { StreamChatContext } from "@/common/contexts/StreamChatContext";
import { Avatar, Icon } from "react-native-elements";
import { ellipsis } from "@/common/utils";
import { format } from "date-fns";

const sort = { last_message_at: -1 };
/**
 * @type {DeepPartial<Theme>}
 */
const theme = {
    channelListMessenger: {
        flatListContent: tailwind("bg-gray-100"),
    },
};

export default function AllMessage({ navigation }) {
    const { StreamChatClient } = useContext(AppContext);
    const { setChannel } = useContext(StreamChatContext);
    const memoizedFilters = useMemo(
        () => ({
            type: "messaging",
            members: { $in: [StreamChatClient.user.id] },
        }),
        []
    );

    return (
        <View style={tailwind("flex-1 bg-gray-100")}>
            <Chat client={StreamChatClient} style={theme}>
                <View style={tailwind("flex-1 px-6 py-4")}>
                    <ChannelList
                        filters={memoizedFilters}
                        sort={sort}
                        Preview={ChannelPreview}
                        onSelect={(channel) => {
                            setChannel(channel);
                            navigation.navigate("Messages_Conversation");
                        }}
                        numberOfSkeletons={12}
                    />
                </View>
            </Chat>
        </View>
    );
}

/**
 *
 * @param {ChannelPreviewMessengerProps} props
 */
function ChannelPreview(props) {
    const { channel } = props;
    const { StreamChatClient } = useContext(AppContext);
    const { onSelect } = useChannelsContext();
    const hasUnreadMessage = channel.countUnread() !== 0;
    const lastMessage = channel.lastMessage();
    const hasAttachments = channel.lastMessage()?.attachments.length !== 0;
    const { user: userInConversation } = Object.entries(
        channel.state.members
    ).find(([key, value]) => value.user_id !== StreamChatClient.user.id)[1];

    if (!channel.lastMessage()) {
        return null;
    }
    return (
        <TouchableOpacity
            onPress={() => onSelect(channel)}
            style={tailwind("flex-row items-center py-4 bg-gray-100")}
        >
            <Avatar
                source={{ uri: userInConversation?.image }}
                rounded
                size="medium"
            />
            <View
                style={tailwind(
                    "flex-1 items-center flex-row ml-2 justify-between"
                )}
            >
                <View>
                    <Text
                        style={{
                            ...tailwind("text-base text-black"),
                            ...(hasUnreadMessage ? tailwind("font-bold") : {}),
                        }}
                    >
                        {userInConversation.name}
                    </Text>
                    <View style={tailwind("items-center flex-row")}>
                        <Text
                            style={{
                                ...tailwind(
                                    "text-base text-black items-center"
                                ),
                                ...(hasUnreadMessage
                                    ? tailwind("font-bold")
                                    : {}),
                            }}
                        >
                            {lastMessage.user.id === StreamChatClient.user.id &&
                                "You:"}
                        </Text>
                        {hasAttachments ? (
                            <View style={tailwind("flex-row items-center")}>
                                <Icon
                                    type="ionicon"
                                    size={16}
                                    name="image-outline"
                                    containerStyle={tailwind("mr-1")}
                                />
                                <Text>Attachment</Text>
                            </View>
                        ) : (
                            ellipsis(
                                lastMessage.text,
                                lastMessage.user.id === StreamChatClient.user.id
                                    ? 14
                                    : 16
                            )
                        )}
                    </View>
                </View>
                <View style={tailwind("self-end")}>
                    <Text style={tailwind("text-sm text-black flex-shrink-0")}>
                        {format(lastMessage.updated_at, "p")}
                    </Text>
                    {hasUnreadMessage && (
                        <View
                            style={tailwind(
                                "flex-shrink-0 h-6 w-6 p-1 bg-red-500 rounded-full  items-center justify-center "
                            )}
                        >
                            <Text style={tailwind(" text-sm text-white ")}>
                                {channel.countUnread()}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}
