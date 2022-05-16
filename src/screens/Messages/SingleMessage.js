import { AppContext } from "@/common/contexts/AppContext";
import { getColor, tailwind } from "@/common/tailwind";
import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    LegacyRef,
} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, useHeaderHeight } from "@react-navigation/stack";
import { StreamChatContext } from "@/common/contexts/StreamChatContext";
import {
    Channel,
    Chat,
    MessageInput,
    MessageList,
    useAttachmentPickerContext,
    DeepPartial,
    Theme,
    MessageContentProps,
    useMessageContext,
    useMessagesContext,
    Attachment,
    Message,
    Gallery,
} from "stream-chat-react-native";
import BaseStackHeader from "@/components/BaseStackHeader";
import { Avatar, Icon } from "react-native-elements";
import GSendButton from "./components/SendButton";
import { format } from "date-fns";
import Swipeable from "react-native-gesture-handler/Swipeable";

/**
 * @type {DeepPartial<Theme>}
 */
const theme = {
    messageSimple: {
        content: {
            textContainer: {
                borderWidth: 0,
            },
            containerInner: { backgroundColor: "blue" },
        },
    },

    messageInput: {
        container: tailwind("bg-black py-4"),
        composerContainer: tailwind("items-center justify-center "),
        attachButtonContainer: tailwind("self-center "),
        inputBoxContainer: {
            borderWidth: 0,
            ...tailwind(" p-0  flex-1"),
        },
    },
};

/**
 *
 * @param {{route:RouteProp<any,any>,navigation:StackNavigationProp<any>}} param0
 * @returns
 */
export default function SingleMessage({ route, navigation }) {
    const { StreamChatClient } = useContext(AppContext);
    const { channel } = useContext(StreamChatContext);
    const headerHeight = useHeaderHeight();
    const { setTopInset } = useAttachmentPickerContext();

    useEffect(() => {
        setTopInset(headerHeight);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headerHeight]);
    useLayoutEffect(() => {
        let { user: inConversationWith } = Object.entries(
            channel.state.members
        ).find(([key, value]) => value.user_id !== StreamChatClient.userID)[1];

        navigation.setOptions({
            header: (props) => (
                <BaseStackHeader {...props}>
                    <View
                        style={tailwind(
                            "flex-row justify-between self-start items-center pl-4"
                        )}
                    >
                        <Avatar
                            source={{
                                uri: inConversationWith?.image || null,
                            }}
                            size="medium"
                            rounded
                        />
                        <View style={tailwind("ml-2")}>
                            <Text
                                style={[
                                    tailwind("text-base font-bold text-white"),
                                    { lineHeight: 16 },
                                ]}
                            >
                                {inConversationWith.name || "Loading"}
                            </Text>
                            {inConversationWith?.online ? (
                                <View style={tailwind("flex-row items-center")}>
                                    <Text
                                        style={tailwind("text-base text-white")}
                                    >
                                        {"Active Now"}
                                    </Text>
                                    <View
                                        style={tailwind(
                                            "w-2 h-2 bg-brand-primary rounded-full ml-1"
                                        )}
                                    />
                                </View>
                            ) : null}
                        </View>
                    </View>
                </BaseStackHeader>
            ),
        });
    }, [navigation, channel, StreamChatClient]);
    return (
        <View style={tailwind("flex-1 bg-gray-100")}>
            <Chat client={StreamChatClient} style={theme}>
                <Channel
                    channel={channel}
                    keyboardVerticalOffset={headerHeight}
                    messageActions={({ copyMessage, deleteMessage }) => {
                        return [copyMessage, deleteMessage];
                    }}
                    MessageContent={GMessageContent}
                    Message={GMessage}
                    hasCommands={false}
                    hasFilePicker={false}
                >
                    <View style={tailwind("flex-1")}>
                        <MessageList
                            additionalFlatListProps={{
                                showsVerticalScrollIndicator: false,
                            }}
                        />
                        <MessageInput
                            numberOfUploads={1}
                            SendButton={GSendButton}
                        />
                    </View>
                </Channel>
            </Chat>
        </View>
    );
}
function GMessage(props) {
    /**
     * @type {LegacyRef<Swipeable>}
     */
    const swipeableRef = useRef();
    const { setQuotedMessageState } = useMessagesContext();
    const onSwipedLeft = () => {
        setQuotedMessageState(props.message);
        swipeableRef.current.close();
    };
    return (
        <Swipeable
            onSwipeableLeftOpen={onSwipedLeft}
            ref={swipeableRef}
            overshootLeft={false}
            overshootRight={false}
            renderLeftActions={(progress) => (
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    translateX: progress.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-100, 0],
                                    }),
                                },
                            ],
                        },
                        tailwind("w-1/6"),
                    ]}
                >
                    <View
                        style={tailwind("h-full items-center justify-center")}
                    >
                        <Icon
                            type="ionicon"
                            name="arrow-undo"
                            size={32}
                            color={getColor("brand-primary")}
                        />
                    </View>
                </Animated.View>
            )}
        >
            <Message {...props} />
        </Swipeable>
    );
}
const contentTheme = {
    reply: {
        container: tailwind("bg-brand-primary bg-opacity-20"),
        name: tailwind("text-brand-primary"),
        time: tailwind("text-brand-primary"),
        text: tailwind("text-brand-primary"),
    },
    message: {
        container: tailwind("bg-gray-500"),
        name: tailwind("text-white"),
        time: tailwind("text-white"),
        text: tailwind("text-white"),
    },
};

/**
 *
 * @param {MessageContentProps} props
 * @returns
 */
function GMessageContent(props) {
    const {
        message,
        onLongPress,
        isMyMessage,
        messageContentOrder,
        otherAttachments,
        preventPress,
    } = useMessageContext();
    return (
        <View
            style={[
                tailwind("rounded-2xl px-3 py-2 mb-1"),
                contentTheme[isMyMessage ? "message" : "reply"].container,
            ]}
        >
            <View style={tailwind("flex-row items-center")}>
                <Text
                    style={[
                        tailwind("text-brand-primary text-sm font-bold"),
                        contentTheme[isMyMessage ? "message" : "reply"].name,
                    ]}
                >
                    {message.user.name}
                </Text>
                <View
                    style={tailwind(
                        "w-1 h-1 rounded-full bg-brand-primary mx-1"
                    )}
                />
                <Text
                    style={[
                        contentTheme[isMyMessage ? "message" : "reply"].time,
                    ]}
                >
                    {format(message.created_at, "p")}
                </Text>
            </View>
            {messageContentOrder.map(
                (messageContentType, messageContentOrderIndex) => {
                    switch (messageContentType) {
                        case "attachments":
                            return otherAttachments.map(
                                (attachment, attachmentIndex) => (
                                    <Attachment
                                        attachment={attachment}
                                        key={`${message.id}-${attachmentIndex}`}
                                    />
                                )
                            );
                        // case 'files':
                        //   return (
                        //     <FileAttachmentGroup
                        //       key={`file_attachment_group_${messageContentOrderIndex}`}
                        //       messageId={message.id}
                        //     />
                        //   );
                        case "gallery":
                            return (
                                <Gallery
                                    key={`gallery_${messageContentOrderIndex}`}
                                    preventPress={preventPress}
                                />
                            );
                        case "text":
                        default:
                            return otherAttachments.length &&
                                otherAttachments[0].actions ? null : (
                                <Text
                                    key={`${message.id}`}
                                    style={[
                                        tailwind("text-brand-primary text-sm"),
                                        contentTheme[
                                            isMyMessage ? "message" : "reply"
                                        ].text,
                                    ]}
                                >
                                    {message?.text || "no message"}
                                </Text>
                            );
                    }
                }
            )}
        </View>
    );
}
