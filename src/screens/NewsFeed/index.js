import { getColor, tailwind } from "@/common/tailwind";
import React, { useContext, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { Avatar, Image } from "react-native-elements";
import { useQuery, UseQueryOptions } from "react-query";
import API from "@/common/services/API";
import { AuthContext } from "@/common/contexts/AuthContext";
import Button from "@/components/Button";

const useNewsFeed =
    /**
     *
     * @param {UseQueryOptions} opts
     * @returns
     */
    (opts) => {
        const { userId, accessToken } = useContext(AuthContext);
        return useQuery(
            ["user", userId, "feed"],
            () => API(accessToken).get("feed/list"),
            opts
        );
    };
export default function NewsFeed() {
    const { data, isLoading, isSuccess, isError, refetch } = useNewsFeed();

    return (
        <View style={tailwind("flex-1 bg-gray-100 px-6 pt-6")}>
            {isLoading ? (
                <View style={tailwind("items-center justify-center flex-1")}>
                    <ActivityIndicator
                        color={getColor("brand-primary")}
                        size="large"
                    />
                </View>
            ) : isError ? (
                <View style={tailwind("items-center justify-center flex-1")}>
                    <Text style={tailwind("text-center text-base text-black")}>
                        Failed to load feed
                    </Text>
                    <Button
                        title="Try Again"
                        theme="primary"
                        onPress={refetch}
                    />
                </View>
            ) : isSuccess ? (
                <FeedList feed={data.data} />
            ) : null}
        </View>
    );
}
function FeedList({ feed = [] }) {
    const renderItem = ({ item, index }) => (
        <View style={tailwind(`${index > 0 ? "mt-4" : ""}`)}>
            <Feed item={item} />
        </View>
    );
    if (feed.length === 0) {
        return (
            <View style={tailwind("flex-1 items-center justify-center")}>
                <Text style={tailwind("text-base text-black")}>
                    No Feed found
                </Text>
            </View>
        );
    }
    return (
        <FlatList
            data={feed}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tailwind("pb-6")}
        />
    );
}
function Feed({ item }) {
    return (
        <View
            style={tailwind("p-3 rounded-lg bg-white flex-row justify-between")}
        >
            <View style={tailwind("flex-1")}>
                <View style={tailwind("flex-row items-center")}>
                    <Avatar rounded source={{ uri: item.avatar }} />
                    <Text style={tailwind("ml-2")}>{item.username}</Text>
                </View>
                <Text
                    style={tailwind(
                        "text-brand-primary text-sm leading-4 font-bold"
                    )}
                >
                    {item.headline}
                </Text>
                <Text style={tailwind("text-xs text-brand-primary ")}>
                    {item.timestamp}
                </Text>
            </View>
            <Image
                style={tailwind("w-16 rounded-lg")}
                source={{ uri: item.product.image }}
            />
        </View>
    );
}
