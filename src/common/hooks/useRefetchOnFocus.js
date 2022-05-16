import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef } from "react";
import { UseQueryResult } from "react-query";

/**
 *
 * @param {UseQueryResult<any,any>} query
 */
export default function useRefetchOnFocus(query) {
    const isMountedRef = useRef(false);

    useFocusEffect(
        useCallback(() => {
            // do not refetch when query is initially mounted
            if (isMountedRef.current) {
                query.refetch();
            }
        }, [query.refetch])
    );

    useEffect(() => {
        isMountedRef.current = true;
    }, []);
}
