import { useEffect, useRef, EffectCallback, DependencyList } from "react";

/**
 * @returns {Boolean}
 */
export function useFirstMountState() {
    const isFirst = useRef(true);

    if (isFirst.current) {
        isFirst.current = false;

        return true;
    }

    return isFirst.current;
}
/**
 *
 * @param {EffectCallback} effect
 * @param {DependencyList} deps
 */
export default function useUpdateEffect(effect, deps) {
    const isFirstMount = useFirstMountState();

    useEffect(() => {
        if (!isFirstMount) {
            return effect();
        }
    }, deps);
}
