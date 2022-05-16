import React, { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";

import API from "@/common/services/API";
import { tailwind } from "@/common/tailwind";
import { AuthContext } from "@/common/contexts/AuthContext";
import Button, { GButtonProps } from ".";

/**
 *
 * @typedef {{productId:number,productSize:'S'|'M'|'L'|'XL',onError:(error:string)=>void,onSuccess:(message:string)=>void}& GButtonProps} AddToCartButtonProps
 */

/**
 *
 * @param {AddToCartButtonProps} props
 * @returns
 */
export default function AddToCartButton({
    productId = 0,
    productSize = "",
    onError: onAddError = () => {},
    onSuccess: onAddSuccess = () => {},
    ...buttonProps
}) {
    const { userId, accessToken } = useContext(AuthContext);

    const { mutate, isLoading, isSuccess, isError, reset } = useMutation(
        (formData) => {
            return API(accessToken)
                .post("cart/add", formData)
                .then((res) => res.data);
        }
    );

    const queryClient = useQueryClient();
    const handlePress = () => {
        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("product_id", productId);
        mutate(formData, {
            onError: (error) => {
                console.log(
                    "Add to cart error :>> ",
                    error?.response?.data?.error
                );
                let message =
                    error?.response?.data?.error || "Error, try again.";
                onAddError(message);
            },
            onSuccess: () => {
                queryClient.setQueryData(["cart", "count"], (old) => {
                    if (!old) {
                        return 1;
                    } else {
                        return old + 1;
                    }
                });
                queryClient.invalidateQueries("cart", { exact: true });
                onAddSuccess("Item successfully added to cart");
            },
        });
    };
    return (
        <Button
            title="Add to Cart"
            theme="primary"
            loading={isLoading}
            size="md"
            containerStyle={tailwind("flex-1")}
            onPress={handlePress}
            {...buttonProps}
        />
    );
}
