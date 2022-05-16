import { tailwind } from "@/common/tailwind";
import React, { useEffect, useState, useRef } from "react";
import { View, Text, Dimensions } from "react-native";
import { NodePlayerView } from "react-native-nodemediaclient";
const { width, height } = Dimensions.get("window");
import Button from "@/components/Button";

const statusCodes = {
    1000: {
        color: tailwind("bg-yellow-300"),
        description: "Connecting",
    },
    1001: {
        color: tailwind("bg-green-500"),
        description: "Streaming",
    },
    1101: {
        color: tailwind("bg-yellow-500"),
        description: "Buffering",
    },
    1100: {
        color: tailwind("bg-yellow-500"),
        description: "Buffering",
    },
    1102: {
        color: tailwind("bg-green-500"),
        description: "Playing",
    },
    1104: {
        color: tailwind("bg-green-500"),
        description: "Playing",
    },
    1004: {
        color: tailwind("bg-red-500"),
        description: "Stopped",
    },
    1234: {
        color: tailwind("bg-yellow-500"),
        description: "Paused",
    },
};

export default function LiveStreamVideo() {
    const playerViewRef = useRef(null);
    const [streamStatus, setStreamStatus] = useState(2004);
    // useEffect(() => {
    //     if (playerViewRef?.current) {
    //         console.log("object :>> ", playerViewRef?.current);
    //     }
    // }, []);
    useEffect(() => {
        return () => {
            playerViewRef?.current?.stop();
        };
    }, []);
    function handleStatus(code, msg) {
        console.log(`statusCode:${code} message=${msg}`);
        setStreamStatus(code);
    }

    return (
        <View style={{ flex: 1 }}>
            <NodePlayerView
                style={{ height, width }}
                ref={playerViewRef}
                inputUrl={
                    "https://5b44cf20b0388.streamlock.net:8443/live/ngrp:live_all/playlist.m3u8"
                }
                scaleMode={"ScaleAspectFill"}
                renderType={"SURFACEVIEW"}
                bufferTime={300}
                maxBufferTime={1000}
                onStatus={handleStatus}
            />
            <View
                style={tailwind(
                    "absolute inset-0 flex py-24 px-4 justify-end "
                )}
            >
                <View style={tailwind(" border-2 border-red-500 p-2")}>
                    <Text style={tailwind("text-red-500 font-bold mb-4")}>
                        For Development Purposes Only
                    </Text>
                    <View
                        style={tailwind(
                            "flex-row bg-white rounded-full  px-2 items-center self-start"
                        )}
                    >
                        <View
                            style={{
                                ...tailwind("h-2 w-2 rounded-full"),
                                ...(statusCodes[streamStatus]?.color ||
                                    tailwind("bg-yellow-300")),
                            }}
                        />
                        <Text
                            style={tailwind("text-sm font-bold ml-2 uppercase")}
                        >
                            {statusCodes[streamStatus]?.description ||
                                "Loading"}
                        </Text>
                    </View>
                    <View style={tailwind("flex-row")}>
                        <Button
                            title={"Pause"}
                            onPress={() => {
                                playerViewRef.current.pause();
                                setStreamStatus(1234);
                            }}
                        />
                        <Button
                            title={"Play"}
                            onPress={() => {
                                playerViewRef.current.start();
                                setStreamStatus(1104);
                            }}
                        />
                        <Button
                            title={"Stop"}
                            onPress={() => playerViewRef.current.stop()}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
