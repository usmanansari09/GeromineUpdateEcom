import React, {
    useContext,
    useEffect,
    useState,
    Dispatch,
    useCallback,
} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    AppState,
    RefreshControl,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { getColor, tailwind } from "@/common/tailwind";
import { format } from "date-fns";
import { Avatar, Icon } from "react-native-elements";

import { AppContext } from "@/common/contexts/AppContext";
import Button from "@/components/Button";
import { ellipsis } from "@/common/utils";
import { Channel } from "stream-chat";
import { useQuery, UseQueryOptions } from "react-query";
import { AuthContext } from "@/common/contexts/AuthContext";

const useConversations =
    /**
     *
     * @param {UseQueryOptions} opts
     */
    (opts) => {
        // TODO: Pagination
        const { userId } = useContext(AuthContext);
        const { StreamChatClient } = useContext(AppContext);
        return useQuery(
            ["user", userId, "conversations"],
            async () => {
                try {
                    const filter = {
                        type: "messaging",
                        members: { $in: [StreamChatClient.user.id] },
                    };
                    const sort = [{ last_message_at: -1 }];
                    const allChannels = await StreamChatClient.queryChannels(
                        filter,
                        sort
                    );
                    console.log("allChannels :>> ", allChannels);
                    return allChannels.filter((c) => c.state.last_message_at);
                } catch (error) {
                    throw error;
                }
            },
            opts
        );
    };
/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any>}} props
 */
export default function Messages({ route, navigation }) {
    const { StreamChatClient } = useContext(AppContext);

    // const [channels, setChannels] = useState([]);
    // /**
    //  * @type {{channels:Channel[]}}
    //  */
    const {
        isLoading,
        data: channels,
        isSuccess,
        isError,
        refetch,
    } = useConversations();

    /**
     *
     * @param {GroupChannel} channel
     */
    // function updateChannelList(channel) {
    //     setChannels((prev) => {
    //         let pluckedChannels;
    //         const isChannelVisible =
    //             prev.find((c) => c.url === channel.url) !== undefined;
    //         if (isChannelVisible) {
    //             pluckedChannels = prev.reduce((prevValue, currentChannel) => {
    //                 if (currentChannel.url != channel.url) {
    //                     prevValue.push(currentChannel);
    //                 }
    //                 return prevValue;
    //             }, []);
    //             return [channel, ...pluckedChannels];
    //         } else {
    //             return [channel, ...prev];
    //         }
    //     });
    // }

    if (isError) {
        return (
            <View style={tailwind("flex-1 bg-white")}>
                <View style={tailwind("items-center justify-center h-full ")}>
                    <Text style={tailwind("text-lg text-red-500")}>Error</Text>
                    <Text style={tailwind("text-base w-3/4 text-center")}>
                        Something went wrong. Please try again.
                    </Text>
                    <Button
                        title={"Try again"}
                        buttonStyle={tailwind("bg-red-700")}
                        containerStyle={tailwind("mt-10")}
                        size="sm"
                        // onPress={refresh}
                    />
                </View>
            </View>
        );
    }
    return (
        <View style={tailwind("flex-1 bg-white")}>
            {isLoading ? (
                <View style={tailwind("justify-center items-center flex-1")}>
                    <ActivityIndicator
                        size="large"
                        color={getColor("brand-primary")}
                    />
                </View>
            ) : isSuccess ? (
                <ConversationList
                    conversations={channels}
                    isLoading={isLoading}
                    onRefresh={refetch}
                />
            ) : null}
        </View>
    );
}
function ConversationList({
    conversations = [],
    onRefresh = () => {},
    isLoading,
}) {
    const { StreamChatClient } = useContext(AppContext);
    const { navigate } = useNavigation();
    /**
     *
     * @param {{item:Channel}} args
     * @returns
     */
    const renderItem = ({ item: channel, index }) => {
        const hasUnreadMessage = channel.countUnread() !== 0;
        const lastMessage = channel.lastMessage();
        const hasAttachments = channel.lastMessage().attachments.length !== 0;
        const { user: userInConversation } = Object.entries(
            channel.state.members
        ).find(([key, value]) => value.user_id !== StreamChatClient.user.id)[1];

        return (
            <TouchableOpacity
                onPress={() => {
                    navigate("Messages_Conversation", {
                        channel,
                        sender_id: userInConversation.id,
                    });
                }}
                style={tailwind("flex-row items-center py-4 ")}
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
                                ...(hasUnreadMessage
                                    ? tailwind("font-bold")
                                    : {}),
                            }}
                        >
                            {userInConversation.name}
                        </Text>
                        <Text
                            style={{
                                ...tailwind("text-base text-black"),
                                ...(hasUnreadMessage
                                    ? tailwind("font-bold")
                                    : {}),
                            }}
                        >
                            {lastMessage.user.id === StreamChatClient.user.id &&
                                "You:"}
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
                                    lastMessage.user.id ===
                                        StreamChatClient.user.id
                                        ? 14
                                        : 16
                                )
                            )}
                        </Text>
                    </View>

                    <Text style={tailwind("text-sm text-black flex-shrink-0")}>
                        {format(lastMessage.updated_at, "p")}
                    </Text>
                    {channel.countUnread() !== 0 && (
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
            </TouchableOpacity>
        );
    };
    if (conversations.length === 0) {
        return (
            <View style={tailwind("items-center justify-center h-full ")}>
                <Text style={tailwind("text-lg font-semibold text-gray-500")}>
                    No Messages Found
                </Text>

                <Text
                    style={tailwind("text-sm text-center w-3/4 text-gray-500")}
                >
                    When a buyer has messages you, they will appear here
                </Text>
            </View>
        );
    }
    return (
        <FlatList
            contentContainerStyle={tailwind("px-6 pb-6 pt-1 flex-1")}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    colors={[getColor("brand-primary")]}
                    tintColor={"#742ddd"}
                    onRefresh={onRefresh}
                />
            }
            data={conversations}
            keyExtractor={(item) => `${item.cid}`}
            renderItem={renderItem}
            ItemSeparatorComponent={({ highlighted }) => (
                <View style={tailwind("border-b border-gray-300")} />
            )}
            // onEndReached={() => next()}
        />
    );
}
